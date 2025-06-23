import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { r as removeBase, i as isRemotePath, p as prependForwardSlash } from './path_Cvt6sEOY.mjs';
import { V as VALID_INPUT_FORMATS } from './consts_BmVDRGlB.mjs';
import { A as AstroError, q as RenderUndefinedEntryError, b as createComponent, u as unescapeHTML, d as renderTemplate, U as UnknownContentCollectionError, t as renderUniqueStylesheet, v as renderScriptElement, w as createHeadAndContent, r as renderComponent } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_B_3_ReiT.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://www.mediaplanningtool.com", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  maxAge: z.number().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames,
  liveCollections
}) {
  return async function getEntry(collectionOrLookupObject, lookup) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!lookup)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = lookup;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
      });
    }
    if (typeof lookupId === "object") {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `The entry identifier must be a string. Received object.`
      });
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      if (entry2.legacyId) {
        return emulateLegacyEntry({ ...entry2, collection });
      }
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(
        `The collection ${JSON.stringify(collection)} does not exist. Please ensure it is defined in your content config.`
      );
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets_B1BPz9R9.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_BzWvMHRB.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
	liveCollections,
});

const layoutSchema = z.object({
  sidebar: z.boolean().default(false),
  emoji: z.boolean().default(false)
});
const generalSchema = z.object({
  title: z.string(),
  logo: z.string(),
  iconLogo: z.string(),
  seo: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url()
  })
});
const headerSchema = z.object({
  banner: z.object({
    show: z.boolean(),
    text: z.string(),
    link: z.string().url(),
    brandText: z.string()
  }),
  navbar: z.object({
    colorModeSelector: z.boolean().optional().default(false),
    links: z.array(
      z.object({
        name: z.string(),
        href: z.string(),
        target: z.string().optional()
      })
    )
  }),
  actionButton: z.object({
    text: z.string(),
    href: z.string().url()
  })
});
const footerSchema = z.object({
  description: z.string(),
  socials: z.object({
    github: z.object({ link: z.string() }).optional(),
    facebook: z.object({ link: z.string() }).optional(),
    instagram: z.object({ link: z.string() }).optional(),
    x: z.object({ link: z.string() }).optional(),
    youtube: z.object({ link: z.string() }).optional()
  })
});
const uiSchema = z.object({
  icons: z.object({
    dark: z.string(),
    light: z.string(),
    instagram: z.string(),
    youtube: z.string(),
    facebook: z.string(),
    x: z.string()
  })
});
const directoryData = z.object({
  source: z.object({
    name: z.string(),
    linksOutbound: z.boolean().default(false),
    sheets: z.object({
      key: z.string()
    }).optional(),
    airtable: z.object({
      base: z.string(),
      name: z.string()
    }).optional(),
    notion: z.object({
      databaseId: z.string()
    }).optional()
  }),
  tagPages: z.object({
    title: z.string()
  }),
  search: z.object({
    placeholder: z.string()
  }),
  tags: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
      color: z.string().optional(),
      emoji: z.string().optional(),
      description: z.string().optional()
    })
  )
});
const directoryUI = z.object({
  grid: z.object({
    type: z.enum(["icon-list", "rectangle-card-grid", "small-card-grid"]),
    emptyState: z.object({
      text: z.string(),
      type: z.enum(["button", "simple", "link"]),
      icon: z.string()
    }),
    card: z.object({
      image: z.boolean()
    }),
    submit: z.object({
      show: z.boolean(),
      first: z.boolean(),
      title: z.string(),
      description: z.string(),
      hideable: z.boolean()
    })
  }),
  search: z.object({
    showCount: z.boolean(),
    icon: z.string(),
    tags: z.object({
      display: z.enum(["none", "select", "show-all"]),
      intersection: z.boolean()
    })
  }),
  featured: z.object({
    showOnAllPages: z.boolean(),
    showOnSide: z.boolean(),
    icon: z.string(),
    labelForCard: z.string()
  })
});
const listingsSchema = z.object({
  pageHeader: z.enum(["none", "title"])
});
const themeSettingsSchema = z.object({
  theme: z.string(),
  general: generalSchema,
  header: headerSchema,
  directoryData,
  footer: footerSchema
});
const themeSchema = z.object({
  listings: listingsSchema,
  directoryUI,
  ui: uiSchema,
  layout: layoutSchema
});
const settingsSchema = z.object({
  general: generalSchema,
  listings: listingsSchema,
  directoryData,
  directoryUI,
  header: headerSchema,
  footer: footerSchema,
  ui: uiSchema,
  layout: layoutSchema
});

const configData = {
  theme: "spearmint",
  general: {
    title: "Media Planning Tools",
    logo: "",
    iconLogo: "tabler:chart-line",
    seo: {
      name: "Media Planning Tools Directory",
      description: "The Best Media Planning Software - 2025 report. A comprehensive comparison of software to help agencies and marketers build effective media plans.",
      url: "https://www.mediaplanningtool.com"
    }
  },
  listings: {
    pageHeader: "title"
  },
  directoryData: {
    source: {
      name: "default",
      linksOutbound: false
    },
    tagPages: {
      title: "{0} Tools"
    },
    search: {
      placeholder: "Search among {0} media planning tools :)"
    },
    tags: [
      {
        key: "media-planning",
        name: "Media Planning",
        color: "blue",
        emoji: "📊",
        description: "Core media planning and strategy tools for campaign development."
      },
      {
        key: "budget-planning",
        name: "Budget Planning",
        color: "green",
        emoji: "💰",
        description: "Tools focused on budget allocation and financial planning for media campaigns."
      },
      {
        key: "multi-channel",
        name: "Multi-Channel",
        color: "purple",
        emoji: "🔄",
        description: "Platforms that support planning across multiple media channels and touchpoints."
      },
      {
        key: "audience-analytics",
        name: "Audience Analytics",
        color: "orange",
        emoji: "👥",
        description: "Tools providing audience insights and targeting capabilities."
      },
      {
        key: "media-buying",
        name: "Media Buying",
        color: "red",
        emoji: "🛒",
        description: "Platforms for purchasing and managing media inventory."
      },
      {
        key: "mmm",
        name: "Marketing Mix Modeling",
        color: "indigo",
        emoji: "🧮",
        description: "Advanced analytics tools for measuring marketing effectiveness and ROI."
      },
      {
        key: "fast",
        name: "Fast & Efficient",
        color: "green",
        emoji: "⚡",
        description: "Tools designed for speed and efficiency in media planning workflows."
      },
      {
        key: "featured",
        name: "Featured",
        color: "yellow",
        emoji: "⭐",
        description: "Top-rated and recommended media planning tools."
      },
      {
        key: "audience-research",
        name: "Audience Research",
        color: "cyan",
        emoji: "🔍",
        description: "Tools for building audience personas and demographic research."
      },
      {
        key: "reach-frequency",
        name: "Reach & Frequency",
        color: "violet",
        emoji: "📡",
        description: "Tools for cross-channel reach and frequency planning and optimization."
      },
      {
        key: "media-consumption",
        name: "Media Consumption Analytics",
        color: "teal",
        emoji: "📺",
        description: "Platforms for estimating and analyzing audience media consumption patterns."
      },
      {
        key: "cmos",
        name: "👤 CMOs",
        color: "slate",
        emoji: "👤",
        description: "Chief Marketing Officers and senior marketing executives."
      },
      {
        key: "media-planners",
        name: "👤 Media Planners",
        color: "slate",
        emoji: "👤",
        description: "Media planning specialists and strategists."
      },
      {
        key: "marketing-directors",
        name: "👤 Marketing Directors",
        color: "slate",
        emoji: "👤",
        description: "Marketing directors and campaign managers."
      },
      {
        key: "agencies",
        name: "👤 Agencies",
        color: "slate",
        emoji: "👤",
        description: "Media agencies, full-service agencies, and independent agencies."
      },
      {
        key: "in-house-teams",
        name: "👤 In-House Teams",
        color: "slate",
        emoji: "👤",
        description: "Brand direct and in-house marketing teams."
      },
      {
        key: "data-analysts",
        name: "👤 Data Analysts",
        color: "slate",
        emoji: "👤",
        description: "Data analysts and performance marketers."
      },
      {
        key: "budget-managers",
        name: "👤 Budget Managers",
        color: "slate",
        emoji: "👤",
        description: "Budget managers and financial planners."
      }
    ]
  },
  directoryUI: {
    grid: {
      type: "rectangle-card-grid",
      emptyState: {
        text: "No tools found",
        type: "simple",
        icon: "tabler:search-off"
      },
      card: {
        image: true
      },
      submit: {
        show: false,
        first: true,
        title: "Submit a Tool",
        description: "Add your media planning tool to our directory",
        hideable: true
      }
    },
    search: {
      showCount: true,
      icon: "tabler:search",
      tags: {
        display: "show-all",
        intersection: false
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured"
    }
  },
  header: {
    banner: {
      show: false,
      text: "",
      link: "https://www.mediaplanningtool.com",
      brandText: ""
    },
    navbar: {
      colorModeSelector: true,
      links: [
        {
          name: "Blog",
          href: "/blog"
        },
        {
          name: "2025 Guide",
          href: "/2025-guide"
        }
      ]
    },
    actionButton: {
      text: "",
      href: "https://www.mediaplanningtool.com"
    }
  },
  footer: {
    description: "The comprehensive directory for media planning software and tools.",
    socials: {
      x: {
        link: ""
      },
      youtube: {
        link: ""
      }
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun",
      instagram: "tabler:brand-instagram",
      youtube: "tabler:brand-youtube",
      facebook: "tabler:brand-facebook",
      x: "tabler:brand-x"
    }
  },
  layout: {
    sidebar: false,
    emoji: true
  }
};

const peppermint = {
  layout: {
    sidebar: false,
    emoji: false
  },
  listings: {
    pageHeader: "title"
  },
  directoryUI: {
    search: {
      placeholder: "Search among {0} agent frameworks",
      showCount: true,
      icon: "tabler:bow",
      tags: {
        display: "select",
        intersection: false
      }
    },
    grid: {
      list: false,
      type: "rectangle-card-grid",
      emptyState: {
        text: "Seems that this entry is missing from the archives.",
        type: "button",
        icon: "tabler:exclamation-mark"
      },
      card: {
        image: true
      },
      submit: {
        show: true,
        first: false,
        title: "Submit a template",
        description: "Submit a template to show off a good project to other people.",
        hideable: true
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured ✨"
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun",
      youtube: "tabler:brand-youtube",
      x: "tabler:brand-twitter",
      instagram: "tabler:brand-instagram",
      facebook: "tabler:brand-facebook",
      github: "tabler:brand-github"
    }
  }
};

const spearmint = {
  layout: {
    sidebar: false,
    emoji: false
  },
  listings: {
    pageHeader: "none"
  },
  directoryUI: {
    search: {
      placeholder: "Search among {0} agent frameworks",
      showCount: true,
      icon: "tabler:bow",
      tags: {
        display: "show-all",
        intersection: false
      }
    },
    grid: {
      list: false,
      type: "small-card-grid",
      emptyState: {
        text: "Seems that this entry is missing from the archives.",
        type: "button",
        icon: "tabler:exclamation-mark"
      },
      card: {
        image: true
      },
      submit: {
        show: true,
        first: false,
        title: "Submit a template",
        description: "Submit a template to show off a good project to other people.",
        hideable: true
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured ✨"
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun",
      youtube: "tabler:brand-youtube",
      x: "tabler:brand-twitter",
      instagram: "tabler:brand-instagram",
      facebook: "tabler:brand-facebook",
      github: "tabler:brand-github"
    }
  }
};

const brookmint = {
  layout: {
    sidebar: true,
    emoji: true
  },
  listings: {
    pageHeader: "title"
  },
  directoryUI: {
    search: {
      placeholder: "Search among {0} agent frameworks",
      showCount: true,
      icon: "tabler:search",
      tags: {
        display: "show-all",
        intersection: false
      }
    },
    grid: {
      list: false,
      type: "small-card-grid",
      emptyState: {
        text: "Seems that this entry is missing from the archives.",
        type: "button",
        icon: "tabler:exclamation-mark"
      },
      card: {
        image: true
      },
      submit: {
        show: true,
        first: false,
        title: "Submit a template",
        description: "Submit a template to show off a good project to other people.",
        hideable: true
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured ✨"
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun",
      youtube: "tabler:brand-youtube",
      x: "tabler:brand-twitter",
      instagram: "tabler:brand-instagram",
      facebook: "tabler:brand-facebook",
      github: "tabler:brand-github"
    }
  }
};

const hemingway = {
  layout: {
    sidebar: false,
    emoji: false
  },
  listings: {
    pageHeader: "title"
  },
  directoryUI: {
    search: {
      placeholder: "Search among {0} agent frameworks",
      showCount: true,
      icon: "tabler:bow",
      tags: {
        display: "select",
        intersection: false
      }
    },
    grid: {
      list: false,
      type: "icon-list",
      emptyState: {
        text: "Seems that this entry is missing from the archives.",
        type: "button",
        icon: "tabler:exclamation-mark"
      },
      card: {
        image: true
      },
      submit: {
        show: true,
        first: false,
        title: "Submit a template",
        description: "Submit a template to show off a good project to other people.",
        hideable: true
      }
    },
    featured: {
      showOnAllPages: true,
      showOnSide: true,
      icon: "tabler:star",
      labelForCard: "Featured ✨"
    }
  },
  ui: {
    icons: {
      dark: "tabler:moon",
      light: "tabler:sun",
      youtube: "tabler:brand-youtube",
      x: "tabler:brand-twitter",
      instagram: "tabler:brand-instagram",
      facebook: "tabler:brand-facebook",
      github: "tabler:brand-github"
    }
  }
};

function getConfig(data2) {
  try {
    return themeSettingsSchema.parse(data2);
  } catch (error) {
    return null;
  }
}
const themes = {
  peppermint: themeSchema.parse(peppermint),
  spearmint: themeSchema.parse(spearmint),
  brookmint: themeSchema.parse(brookmint),
  hemingway: themeSchema.parse(hemingway)
};
const data = getConfig(configData);
let settings;
if (data) {
  const selectedTheme = configData.theme || "peppermint";
  const themeConfig = themes[selectedTheme];
  settings = {
    ...themeConfig,
    ...data
  };
} else {
  settings = settingsSchema.parse(configData);
}
const config = settings;

export { getEntry as a, config as c, getCollection as g, renderEntry as r };
