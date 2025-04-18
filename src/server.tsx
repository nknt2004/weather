// src/server.tsx
import React from "react";
import App from "../src/react-app/App";
import { renderToString } from "react-dom/server";

export function render(url: string) {
  const html = renderToString(
    <html>
      <head><title>My App</title></head>
      <body>
        <div id="root">Hello from SSR: {url}</div>
        <App/>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  );
  return `<!DOCTYPE html>${html}`;
}