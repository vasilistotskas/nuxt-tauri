import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Provide Nuxt auto-imports that stores depend on
Object.assign(globalThis, {
  defineStore,
  ref,
  computed,
})
