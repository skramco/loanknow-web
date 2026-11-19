export type OwenAskSuccess = {
  status: "ok";
  answer: string;
};

export type OwenAskUnavailable = {
  status: "unavailable";
  code: OwenUnavailableCode;
  message: string;
  missingEnv?: string[];
};

export type OwenAskResult = OwenAskSuccess | OwenAskUnavailable;

export type OwenUnavailableCode =
  | "not_configured"
  | "not_implemented"
  | "upstream_error";

export type OwenAskRequest = {
  question: string;
};