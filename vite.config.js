import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        laserove: resolve(__dirname, "laserove-cistenie.html"),
        youtube: resolve(__dirname, "youtube_API_gallery.html"),
      },
    },
  },
});
