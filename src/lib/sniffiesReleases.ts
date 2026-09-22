export interface SniffiesRelease {
  version: string;
  userscriptHref: string;
  chromeHref: string;
}

function compareVersions(a: string, b: string): number {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  const len = Math.max(partsA.length, partsB.length);
  for (let i = 0; i < len; i++) {
    const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

let cached: Promise<SniffiesRelease> | undefined;

/** Latest published userscript/chrome build versions, fetched from GitHub releases at build time. */
export function getLatestSniffiesRelease(): Promise<SniffiesRelease> {
  if (!cached) cached = fetchLatest();
  return cached;
}

async function fetchLatest(): Promise<SniffiesRelease> {
  const res = await fetch(
    "https://api.github.com/repos/deckmasterbeam/SniffiesProjects/releases?per_page=30",
  );
  if (!res.ok) {
    throw new Error(
      `getLatestSniffiesRelease: failed to fetch releases (${res.status})`,
    );
  }
  const releases: { tag_name: string }[] = await res.json();

  let version = "";
  for (const { tag_name } of releases) {
    const match = /^(?:userscript|chrome)-(.+)$/.exec(tag_name);
    if (match && (!version || compareVersions(match[1], version) > 0)) {
      version = match[1];
    }
  }

  if (!version) {
    throw new Error(
      "getLatestSniffiesRelease: no userscript-*/chrome-* release tags found",
    );
  }

  return {
    version,
    userscriptHref: `https://raw.githubusercontent.com/deckmasterbeam/SniffiesProjects/userscript-${version}/dist/sniffies-tools.user.js`,
    chromeHref: `https://github.com/deckmasterbeam/SniffiesProjects/releases/download/chrome-${version}/sniffies-chrome.zip`,
  };
}
