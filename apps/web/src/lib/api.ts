/**
 * Minimal typed API client. Will be replaced by a client generated from
 * core-api's OpenAPI spec once real endpoints exist — the Java/TS contract
 * should be generated, never hand-maintained.
 */
const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

export interface HealthStatus {
  status: "UP" | "DOWN" | "UNKNOWN";
}

export async function getApiHealth(): Promise<HealthStatus> {
  try {
    const res = await fetch(`${API_BASE_URL}/actuator/health`, {
      cache: "no-store",
    });
    if (!res.ok) return { status: "DOWN" };
    return (await res.json()) as HealthStatus;
  } catch {
    return { status: "UNKNOWN" };
  }
}
