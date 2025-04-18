import React from "react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document.getElementById("root")!, <div>Hello from Client!</div>);