import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
// import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
function plugins() {
  const plugins: PluginOption[] = [];

  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    const {
      SENTRY_AUTH_TOKEN: authToken = '', // 授权 Token，缺少时不上传
      VITE_SENTRY_RELEASE: release, // 发布版本，必须和上报版本一致
      VITE_SENTRY_DIST: dist, // 发布版本，必须和上报版本一致
    } = process.env;

    // 注入 vite 插件
    plugins.push(
      sentryVitePlugin({
        org: "influx",
        project: "purchasex-oapage",
        url: "",
        telemetry: false,
        authToken,
        release: { name: release, dist },
      })
    );
  }
  return plugins;
}

export default defineConfig({
  plugins: [react(), ...plugins()],
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
  build: {
    sourcemap: true,
    manifest: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
