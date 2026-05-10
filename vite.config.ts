import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

const isTauri = process.env.TAURI_ENV_PLATFORM !== undefined;

export default defineConfig({
  plugins: [react(), ...(!isTauri ? [cloudflare()] : [])],
});
