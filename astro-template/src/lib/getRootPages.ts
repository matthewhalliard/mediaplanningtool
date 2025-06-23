import type { AllContent } from "../types/content";
import { getCollection } from "astro:content";

export async function getBlogPages() {
  const allPosts = await getCollection("blog");
  return allPosts.map((entry) => ({params: {slug: entry.id }, props: { entry }}));
}

export async function getRootPages(remapIndex: boolean = true) {
  const allListings = await getCollection("directory");
  const allPages = await getCollection("pages");

  // Combine listings and pages, but exclude index since it has its own route
  const combinedEntries: Array<AllContent> = allListings.concat(
    allPages.filter((page) => page.id !== "index") as never
  );

  // Return paths based on slugs
  return combinedEntries.map((entry) => {
    return {
      params: { slug: entry.id },
      props: { entry },
    };
  });
}
