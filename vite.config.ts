import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Keep authenticated progress flows usable while developing the Vite UI.
    proxy: {
      "/api": "http://127.0.0.1:8788",
    },
  },
});
