import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import * as Sentry from "@sentry/react";

const isProduction = import.meta.env.PROD;
if (isProduction) {
  const {
    VITE_SENTRY_RELEASE: release = "unknown",
    VITE_SENTRY_DIST: dist = "unknown-dist",
  } = import.meta.env;
  Sentry.init({
    // // Vue APP 设置
    // app: appInstance,

    // DSN 地址，直接写在代码中
    dsn: "",

    // 一些版本配置
    environment: "development",
    // 当前使用的版本
    release, // 必须和 sourcemaps 一样
    dist, // 必须和 sourcemaps 一样

    // 采样率和采样逻辑
    sampleRate: 1,
    tracesSampleRate: 1,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/oa\.intercartx\.com\/api/,
    ],
    replaysSessionSampleRate: 1,
    replaysOnErrorSampleRate: 1,

    // 插件
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
