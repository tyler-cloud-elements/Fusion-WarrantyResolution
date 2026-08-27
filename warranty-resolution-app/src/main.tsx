import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { router } from "./router";

// Providers (query client, theme, UiPath auth, persona) live on the router's
// root route so every route — including the shell layout itself — sits inside
// them. main.tsx only mounts.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
