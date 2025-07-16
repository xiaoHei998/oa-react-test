import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8082,
    proxy: {
      "/api": {
        target: "http://localhost:5089/oa/", // dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
