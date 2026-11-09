
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const aliases = {
  '@/public': path.resolve(__dirname, './public'),
  '@/pages': path.resolve(__dirname, './src/pages'),
  '@/components': path.resolve(__dirname, './src/components'),
  '@/styles': path.resolve(__dirname, './src/styles'),
  '@/types': path.resolve(__dirname, './src/types'),
  '@/hooks': path.resolve(__dirname, './src/hooks'),
  '@/utils': path.resolve(__dirname, './src/components/utils'),
  '@/svgs': path.resolve(__dirname, './src/components/svgs'),
  '@/module': path.resolve(__dirname, './src/components/module'),
  '@/templates': path.resolve(__dirname, './src/components/templates'),
  '@/layout': path.resolve(__dirname, './src/components/layout'),
  '@/context': path.resolve(__dirname, './src/components/context'),
};

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: aliases,
  },

  test: {
    environment: 'jsdom',
    globals: true,
    silent: true,
    setupFiles: ['./src/test/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      'node_modules',
      '.next',
      'tests/e2e/**',
    ],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      // Phase 1 scope only: measure the MSW handler implementation used to
      // mock the 44 inventoried Go API contracts. Do not include application
      // source files; this report is intentionally not whole-project coverage.
      include: ['src/test/mocks/handlers.ts'],
      exclude: [],
    },
  },
});
