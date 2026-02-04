import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default defineConfig([
  eslintPluginPrettier,
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    plugins: {
      js,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
    },
  },
])
