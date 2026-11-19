import type { OwenAskResult, OwenUnavailableCode } from "./types";

const REQUIRED_ENV = ["OWEN_API_URL", "OWEN_API_KEY"] as const;
const OPTIONAL_ENV = ["OWEN_API_SECRET", "OWEN_ORG_ID"] as const;

export function getOwenEnvStatus(): {
  configured: boolean;
  missing: string[];
  optionalPresent: string[];
} {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
  const optionalPresent = OPTIONAL_ENV.filter((name) =>
    Boolean(process.env[name]?.trim()),
  );
  return {
    configured: missing.length === 0,
    missing: [...missing],
    optionalPresent,
  };
}

function unavailable(
  code: OwenUnavailableCode,
  message: string,
  missingEnv?: string[],
): OwenAskResult {
  return { status: "unavailable", code, message, missingEnv };
}

/**
 * Server-side boundary for Owen AI. No alternate LLM substitutes.
 * Live answers require a documented Owen API contract and credentials.
 */
export async function askOwen(question: string): Promise<OwenAskResult> {
  const trimmed = question.trim();
  if (!trimmed) {
    return unavailable("not_configured", "A question is required.");
  }

  const env = getOwenEnvStatus();
  if (!env.configured) {
    return unavailable(
      "not_configured",
      "Owen AI is not connected for this site yet. Answers will appear here once the Owen API endpoint and credentials are configured.",
      env.missing,
    );
  }

  // Credentials may be set in Netlify, but we do not call an undocumented endpoint.
  return unavailable(
    "not_implemented",
    "Owen API environment variables are present, but the LoanKnow Owen client is not wired to a published API contract yet. Configure OWEN_API_URL, OWEN_API_KEY, and provide the request/response schema to complete integration.",
    env.missing.length ? env.missing : undefined,
  );
}

export const OWEN_INTEGRATION_NOTES = {
  requiredEnv: [...REQUIRED_ENV],
  optionalEnv: [...OPTIONAL_ENV],
  missingContract:
    "HTTP method, path, auth header format, request body (question + context), streaming vs JSON response, and error codes for Owen AI.",
} as const;