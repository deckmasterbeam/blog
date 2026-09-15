export type ReportType = {
  dbType: string;
  title: string;
  subtitle: string;
  summaryLabel: string;
};

export const reportTypes: Record<string, ReportType> = {
  "install-issue": {
    dbType: "user submitted install issue",
    title: "Report an install issue",
    subtitle:
      "Include your OS and browser, whether you're using the Chrome extension or the userscript, and what went wrong.",
    summaryLabel: "What happened?",
  },
} as const;

export type ReportTypeKey = keyof typeof reportTypes;
