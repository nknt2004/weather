import { Hono } from "hono";
import { render } from "../server";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/weather", (c) => {
  const html = render(c.req.url);
  return c.html(html);
});

export default app;
