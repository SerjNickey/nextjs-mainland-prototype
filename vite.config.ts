import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const mediaOrigin = (env.VITE_MEDIA_ORIGIN ?? "https://pp.ppdlme.xyz").replace(
    /\/$/,
    ""
  );

  return {
  plugins: [
    react(),
    {
      name: "svg-inline-dev-proxy",
      configureServer(server) {
        server.middlewares.use("/api/svg-inline-proxy", async (req, res) => {
          try {
            const reqUrl = new URL(req.url ?? "", "http://localhost");
            const target = reqUrl.searchParams.get("url");

            if (!target) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "text/plain; charset=utf-8");
              res.end("Missing `url` query param");
              return;
            }

            const parsedTarget = new URL(target);
            if (!/^https?:$/.test(parsedTarget.protocol)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "text/plain; charset=utf-8");
              res.end("Only http/https urls are allowed");
              return;
            }

            const response = await fetch(parsedTarget.toString(), {
              redirect: "follow",
            });

            if (!response.ok) {
              res.statusCode = response.status;
              res.setHeader("Content-Type", "text/plain; charset=utf-8");
              res.end(`Failed to fetch svg: ${response.status}`);
              return;
            }

            const body = await response.text();
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
            // Для dev-кэша браузера, чтобы не дёргать каждый рендер.
            res.setHeader("Cache-Control", "public, max-age=300");
            res.end(body);
          } catch {
            res.statusCode = 502;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("SVG proxy request failed");
          }
        });
      },
    },
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          ui: [
            "styled-components",
            "react-fast-marquee",
            "embla-carousel-react",
          ],
          i18n: ["i18next", "react-i18next"],
          utils: ["react-helmet-async"],
        },
      },
    },
    // Enable minification and compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: mediaOrigin,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  };
});
