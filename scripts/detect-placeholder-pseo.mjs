#!/usr/bin/env node
// Detect pSEO resource files with placeholder content and flag them noindex.
// A file is placeholder if >=2 items across sections have titles matching
// patterns like "X checklist item N" / "X tip N" / generic numbered items.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "src/data/pseo/resources";
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

const placeholderRegex = /\b(checklist item|tip|planning item|audience item|item)\s+\d+\b/i;

let placeholder = [];
let real = [];
let errors = [];

for (const f of files) {
  const path = join(dir, f);
  let data;
  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push({ file: f, error: e.message });
    continue;
  }
  const sections = data?.content?.sections || [];
  let placeholderHits = 0;
  let totalItems = 0;
  for (const s of sections) {
    for (const it of s.items || []) {
      totalItems++;
      if (placeholderRegex.test(it.title || "")) placeholderHits++;
    }
  }
  // Also check if pro_tips are duplicated (placeholder pattern)
  const proTips = data?.content?.pro_tips || [];
  const uniqueTips = new Set(proTips);
  const tipsDuplicated = proTips.length >= 3 && uniqueTips.size <= proTips.length / 2;

  const isPlaceholder = placeholderHits >= 2 || tipsDuplicated;
  if (isPlaceholder) {
    // Add noindex flag to seo block
    data.seo = { ...data.seo, noindex: true };
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    placeholder.push({ file: f, placeholderHits, totalItems, tipsDuplicated });
  } else {
    // Ensure noindex is NOT set (clear any stale flag)
    if (data.seo && "noindex" in data.seo) {
      delete data.seo.noindex;
      writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    }
    real.push(f);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Placeholder (noindexed): ${placeholder.length}`);
console.log(`Real content (kept indexed): ${real.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`\n=== PLACEHOLDER FILES (noindexed) ===`);
placeholder.forEach((p) => console.log(`  ${p.file} (${p.placeholderHits}/${p.totalItems} placeholder items${p.tipsDuplicated ? ", duplicated tips" : ""})`));
console.log(`\n=== REAL CONTENT FILES (kept indexed) ===`);
real.forEach((f) => console.log(`  ${f}`));
if (errors.length) {
  console.log(`\n=== ERRORS ===`);
  errors.forEach((e) => console.log(`  ${e.file}: ${e.error}`));
}
