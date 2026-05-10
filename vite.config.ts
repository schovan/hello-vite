import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "TAURI_ENV");
  const isTauri = env.TAURI_ENV_PLATFORM !== undefined;
  return {
    plugins: [react(), ...(!isTauri ? [cloudflare()] : [])],
  };
});
