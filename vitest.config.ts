/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // Test files pattern (includes both unit tests and type tests)
    include: ['tests/*.test.ts', 'tests/*.test-types.ts'],
    exclude: ['node_modules/**', 'dist/**'],
    
    // TypeScript support with type checking
    environment: 'node',
    typecheck: {
      enabled: true,
      include: ['tests/**/*.test-types.ts']
    },
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['tests/**', 'node_modules/**', 'dist/**']
    }
  }
})