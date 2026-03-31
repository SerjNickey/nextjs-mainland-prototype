import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const mediaOrigin = (env.VITE_MEDIA_ORIGIN ?? "https://pokerplanets.pavva.org").replace(
    /\/$/,
    ""
  );

  return {
  plugins: [
    react(),
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
