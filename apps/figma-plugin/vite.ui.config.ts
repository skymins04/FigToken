import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import eslint from "vite-plugin-eslint";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), viteSingleFile()],
  root: resolve(__dirname, "src", "ui"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      input: {
        ui: resolve(__dirname, "src", "ui", "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  resolve: {
    alias: {
      "@common": resolve(__dirname, "./src/common"),
      "@controller": resolve(__dirname, "./src/controller"),
      "@ui": resolve(__dirname, "./src/ui"),
    },
  },
});
