import css from '@eslint/css'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jsdoc from 'eslint-plugin-jsdoc'
import json from 'eslint-plugin-json'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist/**', '.parcel-cache/**', 'node_modules/**']),
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    rules: {
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-ex-assign': 'error',
      'no-magic-numbers': 'error',
      'no-self-compare': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-unreachable': 'error',
      'no-useless-assignment': 'error',
      'no-var': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: 'error'
    }
  },
  {
    extends: ['css/recommended'],
    files: ['**/*.css'],
    language: 'css/css',
    languageOptions: {
      // @ts-ignore
      customSyntax: (defaultSyntax) => ({
        ...defaultSyntax,
        atRules: {
          ...defaultSyntax.atRules,
          'custom-media': {
            prelude: '<media-query-list>' // what comes after the name
          }
        }
      })
    },
    plugins: { css },
    rules: {
      'css/prefer-logical-properties': 'error'
    }
  },
  {
    files: ['**/*.json'],
    // @ts-ignore
    plugins: { json },
    processor: 'json/json'
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
      'jsdoc/valid-types': ['error'] // Recommend
    }
  },
  perfectionist.configs['recommended-natural'],
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
])
