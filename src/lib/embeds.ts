export type EmbedInfo =
  | { kind: "linkedin"; src: string }
  | { kind: "link"; url: string };

export function resolveEmbed(url: string): EmbedInfo {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { kind: "link", url };
  }
  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "linkedin.com") {
    const urnMatch = url.match(/urn:li:(?:activity|share|ugcPost):\d+/);
    if (urnMatch) {
      return {
        kind: "linkedin",
        src: `https://www.linkedin.com/embed/feed/update/${urnMatch[0]}`,
      };
    }
  }

  return { kind: "link", url };
}
