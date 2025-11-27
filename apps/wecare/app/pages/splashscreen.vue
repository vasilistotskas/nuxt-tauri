<script setup lang="ts">
definePageMeta({
  layout: false,
})

const isTauri = useTauriAvailable()
const router = useRouter()

onMounted(async () => {
  console.log('Performing frontend setup...')
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log('Frontend setup complete!')

  if (isTauri) {
    // Check platform using OS plugin
    const { platform } = await import('@tauri-apps/plugin-os')
    const currentPlatform = platform()
    const isDesktop = ['windows', 'macos', 'linux'].includes(currentPlatform)

    console.log('Platform:', currentPlatform, 'isDesktop:', isDesktop)

    if (isDesktop) {
      // Desktop: signal Tauri to close splash and show main window
      try {
        const { invoke } = await import('@tauri-apps/api/core')
        await invoke('set_complete', { task: 'frontend' })
        return
      }
      catch (e) {
        console.error('Failed to signal Tauri:', e)
      }
    }
  }

  // Mobile or browser: navigate to home
  router.replace('/')
})
</script>

<template>
  <div class="splashscreen">
    <div class="splashscreen-content">
      <img
        src="/images/wecare-logo.png"
        alt="WeCare"
        class="logo"
      >
      <p class="tagline">
        ONLINE PHARMACY
      </p>
      <div class="loader">
        <div class="loader-bar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.splashscreen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.splashscreen-content {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.logo {
  width: 180px;
  height: auto;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #1887AA;
  margin: 0 0 3rem;
}

.loader {
  width: 120px;
  height: 3px;
  background: rgba(24, 135, 170, 0.2);
  border-radius: 2px;
  margin: 0 auto;
  overflow: hidden;
}

.loader-bar {
  width: 40%;
  height: 100%;
  background: #1887AA;
  border-radius: 2px;
  animation: loading 1.2s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
</style>
