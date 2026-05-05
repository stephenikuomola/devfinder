import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jsdoc from 'eslint-plugin-jsdoc';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser }
  },
  jsdoc.configs['flat/recommended'],
  jsdoc.configs['flat/recommended-error'],
  {
    files: ['**/*.js'],
    rules: {
      'jsdoc/check-access': ['error'],
      'jsdoc/check-alignment': ['error'],
      'jsdoc/check-param-names': ['error'], // Recommended
      'jsdoc/check-property-names': ['error'], // Recommended
      'jsdoc/check-tag-names': ['error'], // Recommended
      'jsdoc/check-types': ['error'], // Recommended
      'jsdoc/check-values': ['error'],
      'jsdoc/empty-tags': ['error'], // Recommended
      'jsdoc/implements-on-classes': ['error'], // Recommended
      'jsdoc/multiline-blocks': ['error'], // Recommended
      'jsdoc/no-multi-asterisks': ['error'], // Recommended
      'jsdoc/no-undefined-types': ['error'], // Recommended
      'jsdoc/require-asterisk-prefix': ['error'],
      'jsdoc/require-description': ['error'],
      'jsdoc/require-jsdoc': ['error'], // Recommended
      'jsdoc/require-param': ['error'], // Recommended
      'jsdoc/require-param-description': ['error'], // Recommended
      'jsdoc/require-param-name': ['error'], // Recommended
      'jsdoc/require-param-type': ['error'], // Recommended
      'jsdoc/require-property': ['error'], // Recommended
      'jsdoc/require-property-description': ['error'], // Recommended
      'jsdoc/require-property-name': ['error'], // Recommended
      'jsdoc/require-property-type': ['error'], // Recommended
      'jsdoc/require-returns': ['error'], // Recommended
      'jsdoc/require-returns-check': ['error'], // Recommended
      'jsdoc/require-returns-description': ['error'], // Recommended
      'jsdoc/require-returns-type': ['error'], // Recommended
      'jsdoc/require-yields': ['error'], // Recommended
      'jsdoc/require-yields-check': ['error'], // Recommended
      'jsdoc/tag-lines': ['error'], // Recommended
      'jsdoc/valid-types': ['error'], // Recommend
    }
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
])
