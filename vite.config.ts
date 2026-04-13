import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    readableClassnames(),
    sassDts({
      enabledMode: ['development'],
      esmExport: true,
    }),
    tsconfigPaths(),
  ],
  base: '',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@api': '/src/api',
      '@components': '/src/components',
      '@modals': '/src/components/modals',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@services': '/src/services',
      '@common-services': '/src/services/common',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'color-functions'],
      },
    },
  },
});
