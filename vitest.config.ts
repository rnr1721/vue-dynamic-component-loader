import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    alias: {
      'vue-dynamic-component-loader': '/path/to/your/module',
    },
  },
});
