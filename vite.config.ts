
import { defineConfig, } from "vite";
import { configDefaults } from 'vitest/config'
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: 'setupTests.js',
    exclude: [...configDefaults.exclude],
    typecheck: {
      enabled: false,
    }
  },
  plugins: [react(), tsconfigPaths()],
});