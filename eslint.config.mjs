import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/tests/',
      '**/src-tauri/**',
      '**/.claude/**',
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
          // NuxtUI semantic colors
          'text-primary*',
          'bg-primary*',
          'border-primary*',
          'ring-primary*',
          'text-secondary*',
          'bg-secondary*',
          'border-secondary*',
          'ring-secondary*',
          'text-success*',
          'text-info*',
          'text-warning*',
          'text-error*',
          // NuxtUI text tokens
          'text-dimmed*',
          'text-muted*',
          'text-toned*',
          'text-default*',
          'text-highlighted*',
          'text-inverted*',
          // NuxtUI background tokens
          'bg-default*',
          'bg-muted*',
          'bg-elevated*',
          'bg-accented*',
          'bg-inverted*',
          'bg-dimmed*',
          // NuxtUI border tokens
          'border-default*',
          'border-muted*',
          'border-accented*',
          'border-inverted*',
          // NuxtUI ring tokens
          'ring-default*',
          'ring-elevated*',
          // Splashscreen scoped CSS classes
          'splashscreen',
          'splashscreen-content',
          'particles',
          'particle',
          'glow',
          'logo-container',
          'logo-text',
          'letter',
          'accent',
          'plus',
          'tagline',
          'tagline-char',
          'loader-container',
          'pulse-ring',
          'delay-*',
          'loader-dot',
        ],
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'vue/no-watch-after-await': 'warn',
      'vue/no-lifecycle-after-await': 'warn',
      'vue/attribute-hyphenation': 'off',
      'ts/no-explicit-any': 'error',
      'ts/ban-ts-comment': 'error',
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
