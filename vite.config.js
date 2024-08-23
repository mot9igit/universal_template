import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import HandlebarUpdate from "./hbaTrigger";

const partDirs = [
  'src/partials',
  'src/partials/headers',
  'src/partials/footers',
  'src/partials/sidebars',
];

export default defineConfig({
  plugins: [handlebars({
      partialDirectory: partDirs,
      reloadOnPartialChange: true,
  }),HandlebarUpdate()],
  server: {

  },
  build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/js/main.js"),
          style: resolve(__dirname, "src/styles/global.scss"),
          index: resolve(__dirname, "index.html"),
          home: resolve(__dirname, "pages/home.html"),
          category: resolve(__dirname, "pages/category.html"),
          product_card: resolve(__dirname, "pages/product_card.html"),
        },
        output: {
          entryFileNames: `js/[name].js`,
          chunkFileNames: `js/[name].js`,
          assetFileNames: `css/[name].[ext]`,
        }
      }
  },
});