import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import eslint from "vite-plugin-eslint";
import generateFile from "vite-plugin-generate-file";
import { resolve } from "path";
import figmaManifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSingleFile(),
    generateFile({
      type: "json",
      output: "./manifest.json",
      data: figmaManifest,
    }),
    eslint(),
  ],
  build: {
    lib: {
      name: figmaManifest.name,
      entry: resolve(__dirname, "src", "controller", "main.ts"),
      fileName: "controller",
      formats: ["es"],
    },
    emptyOutDir: false,
    outDir: resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@common": resolve(__dirname, "./src/common"),
      "@controller": resolve(__dirname, "./src/controller"),
      "@ui": resolve(__dirname, "./src/ui"),
    },
  },
});
