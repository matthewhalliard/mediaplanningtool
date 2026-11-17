/**
 * The pSEO JSON content uses **bold** for formulas and key figures. These turn
 * it into safe HTML (everything else is escaped) or into plain text for
 * structured data, where markup is not allowed.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function inlineMarkdownToHtml(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function stripInlineMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

/** "tools/cpm-calculator" -> "CPM Calculator", "the-trade-desk" -> "The Trade Desk". */
export function slugToTitle(slug: string): string {
  const last = slug.split("/").filter(Boolean).pop() ?? slug;
  const acronyms = new Set(["cpm", "cpc", "cpv", "ctr", "cac", "roas", "roi", "grp", "trp", "dsp", "ctv", "mmm", "ooh"]);
  return last
    .split("-")
    .map((w) => (acronyms.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}
