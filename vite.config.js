import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 生产环境同源代理见 api/（Vercel）、functions/（Cloudflare Pages / EdgeOne）；
  // 此处仅服务 dev/preview
  server: {
    proxy: {
      "/netease-search": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-search/, "/api/search/get/web"),
      },
      "/netease-album": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-album/, "/api/v1/album"),
      },
      "/netease-songs": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-songs/, "/api/song/detail/"),
      },
    },
  },
  preview: {
    proxy: {
      "/netease-search": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-search/, "/api/search/get/web"),
      },
      "/netease-album": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-album/, "/api/v1/album"),
      },
      "/netease-songs": {
        target: "https://music.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease-songs/, "/api/song/detail/"),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
