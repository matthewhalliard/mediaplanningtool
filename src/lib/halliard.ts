// Every link from this directory to Halliard goes through here, so each one
// lands on a real page and carries a source tag Halliard's analytics can read.
const BASE = "https://www.halliardmedia.com";

export type HalliardPage = "/plan" | "/media-planning-templates" | "/buying-desk" | "/";

export function halliardUrl(page: HalliardPage, placement: string): string {
  const params = new URLSearchParams({
    utm_source: "mediaplanningtool",
    utm_medium: "referral",
    utm_campaign: "directory",
    utm_content: placement,
  });
  return `${BASE}${page === "/" ? "/" : page}?${params.toString()}`;
}
