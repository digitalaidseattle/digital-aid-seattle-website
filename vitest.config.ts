import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      hooks: path.resolve(__dirname, 'hooks'),
      lib: path.resolve(__dirname, 'lib'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
})
