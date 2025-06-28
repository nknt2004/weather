import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/location", (c) => {
  const lat = c.req.raw.cf?.latitude || "Unknown";
  const lon = c.req.raw.cf?.longitude || "Unknown";
  return c.json({ lat, lon });
});

// Serve static assets (e.g., Vite-built JS/CSS) for all other routes
app.get("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
