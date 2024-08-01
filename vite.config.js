import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const partDirs = [
  'src/partials',
  'src/partials/headers',
  'src/partials/footers',
  'src/partials/sidebars',
];

export default defineConfig({
  root: 'src',
  base: '',
  plugins: [handlebars({
      partialDirectory: partDirs,
      reloadOnPartialChange: true,
  })],
  build: {
      outDir: 'dist',
      emptyOutDir: true,
      input: {
				main: resolve(__dirname, "index.html"),
			},
			output: {
				entryFileNames: `src/[name].js`,
				chunkFileNames: `src/[name].js`,
				assetFileNames: `src/[name].[ext]`,
			},
  },
});