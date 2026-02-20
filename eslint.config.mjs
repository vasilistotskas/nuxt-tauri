import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/tests/',
      '**/src-tauri/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
  },
  {
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      'better-tailwindcss/no-unknown-classes': ['warn', {
        detectComponentClasses: true,
        ignore: [
          'safe-area-padding',
          'blob',
          'absolute-center-h',
          'safe-area-bottom',
          'scrollbar-hide',
          // NuxtUI
          'text-elevated*',
          'bg-elevated*',
          'border-elevated*',
          'ring-elevated*',
          'text-default*',
          'bg-default*',
          'border-default*',
          'ring-default*',
          'text-primary*',
          'bg-primary*',
          'border-primary*',
          'ring-primary*',
          'text-secondary*',
          'bg-secondary*',
          'border-secondary*',
          'ring-secondary*',
        ],
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'vue/no-watch-after-await': 'warn',
      'vue/no-lifecycle-after-await': 'warn',
      'vue/attribute-hyphenation': 'off',
      'ts/no-explicit-any': 'off',
      'ts/ban-ts-comment': 'off',
      'node/prefer-global/process': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    },
  },
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'packages/core/assets/css/main.css',
        variables: [],
        attributes: [
          ['^v-bind:ui$', [
            { match: 'objectValues' },
          ]],
          ['^(?:v-bind:)?(class|activeClass|inactiveClass)$', [
            { match: 'strings' },
            { match: 'objectKeys' },
            { match: 'objectValues' },
          ]],
        ],
      },
    },
  },
)
