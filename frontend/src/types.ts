export type AnalysisLevel = "danger" | "safe" | "neutral" | "uncertain";

export type Analysis = {
  level: AnalysisLevel;
  result: string;
};

export type AnalysisWithMessage = Analysis & {
  message: string;
};

export type Example = {
  text: string;
  level: AnalysisLevel;
};
