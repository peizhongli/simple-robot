import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@service": "/src/service",
      "@api": "/src/api",
    },
  },
  server: {
    proxy: {
      "/tuling": {
        target: "http://openapi.turingapi.com/openapi/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/tuling/, ""),
      },
      "/qingyunke": {
        target: "http://api.qingyunke.com/api.php",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/qingyunke/, ""),
      },
    },
  },
});
