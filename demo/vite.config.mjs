import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    target: "esnext",
    minify: true,
  },
  plugins: [tailwindcss()],
  base: "",
});
