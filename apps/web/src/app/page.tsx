import { getApiHealth } from "@/lib/api";

export default async function Home() {
  const health = await getApiHealth();

  return (
    <main style={{ maxWidth: 640, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>CareerOS</h1>
      <p>Foundation is live.</p>
      <p>
        core-api: <strong>{health.status}</strong>
      </p>
    </main>
  );
}
