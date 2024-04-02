import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import eslint from "vite-plugin-eslint";
import generateFile from "vite-plugin-generate-file";
import { resolve } from "path";
import figmaManifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    generateFile({
      type: "json",
      output: "./manifest.json",
      data: figmaManifest,
    }),
    eslint(),
    viteSingleFile(),
  ],
  build: {
    target: "es2017",
    lib: {
      name: figmaManifest.name,
      entry: resolve(__dirname, "src", "code", "main.ts"),
      fileName: "code",
      formats: ["es"],
    },
    emptyOutDir: false,
    minify: true,
    outDir: resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@common": resolve(__dirname, "./src/common"),
      "@code": resolve(__dirname, "./src/code"),
      "@ui": resolve(__dirname, "./src/ui"),
    },
  },
});
