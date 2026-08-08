export const contentWarnings = {
  sniffies: {
    title: "Content warning",
    message: [
      "Sniffies is a map-based hookup app for gay, bisexual, and bi-curious men.",
      "This site covers a project that builds extra features on top of Sniffies.",
      "This site only discusses technical detail. No nudity or sexual content will appear here.",
      "This is a one-time opt-in. You won't see this again on this device.",
    ],
  },
} as const;

export type ContentWarningKey = keyof typeof contentWarnings;
