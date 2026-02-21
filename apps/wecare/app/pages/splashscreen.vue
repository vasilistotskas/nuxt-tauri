<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'tauri-only',
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
      }
      catch (e) {
        console.error('Failed to signal Tauri:', e)
      }
    }
  }

  // Mobile or browser: navigate to home
  await router.replace('/')
})
</script>

<template>
  <div class="splashscreen">
    <!-- Animated background particles -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" />
    </div>

    <!-- Glow effect -->
    <div class="glow" />

    <div class="splashscreen-content">
      <!-- Animated logo text -->
      <div class="logo-container">
        <h1 class="logo-text">
          <span class="letter" style="--delay: 0">w</span>
          <span class="letter" style="--delay: 1">e</span>
          <span class="letter accent" style="--delay: 2">c</span>
          <span class="letter accent" style="--delay: 3">a</span>
          <span class="letter accent" style="--delay: 4">r</span>
          <span class="letter accent" style="--delay: 5">e</span>
          <span class="plus" style="--delay: 6">+</span>
        </h1>
      </div>

      <p class="tagline">
        <span
          v-for="(char, i) in 'ONLINE PHARMACY'.split('')" :key="i" class="
            tagline-char
          " :style="`--char-delay: ${i}`"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </p>

      <!-- Pulse loader -->
      <div class="loader-container">
        <div class="pulse-ring" />
        <div class="pulse-ring delay-1" />
        <div class="pulse-ring delay-2" />
        <div class="loader-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.splashscreen {
  --splash-bg: #000000;
  --splash-fg: #ffffff;
  --splash-fg-dim: rgba(255, 255, 255, 0.5);

  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--splash-bg);
  overflow: hidden;
}

/* Floating particles - white/gray */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3); /* particle effect — intentionally raw */
  border-radius: 50%;
  animation: float 20s infinite ease-in-out;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 1s; }
.particle:nth-child(3) { left: 30%; top: 40%; animation-delay: 2s; }
.particle:nth-child(4) { left: 40%; top: 60%; animation-delay: 3s; }
.particle:nth-child(5) { left: 50%; top: 30%; animation-delay: 4s; }
.particle:nth-child(6) { left: 60%; top: 70%; animation-delay: 5s; }
.particle:nth-child(7) { left: 70%; top: 50%; animation-delay: 6s; }
.particle:nth-child(8) { left: 80%; top: 20%; animation-delay: 7s; }
.particle:nth-child(9) { left: 90%; top: 90%; animation-delay: 8s; }
.particle:nth-child(10) { left: 15%; top: 50%; animation-delay: 9s; }
.particle:nth-child(11) { left: 25%; top: 10%; animation-delay: 0.5s; }
.particle:nth-child(12) { left: 35%; top: 90%; animation-delay: 1.5s; }
.particle:nth-child(13) { left: 45%; top: 15%; animation-delay: 2.5s; }
.particle:nth-child(14) { left: 55%; top: 85%; animation-delay: 3.5s; }
.particle:nth-child(15) { left: 65%; top: 25%; animation-delay: 4.5s; }
.particle:nth-child(16) { left: 75%; top: 75%; animation-delay: 5.5s; }
.particle:nth-child(17) { left: 85%; top: 35%; animation-delay: 6.5s; }
.particle:nth-child(18) { left: 5%; top: 65%; animation-delay: 7.5s; }
.particle:nth-child(19) { left: 95%; top: 45%; animation-delay: 8.5s; }
.particle:nth-child(20) { left: 50%; top: 50%; animation-delay: 9.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(-80px) scale(1.2); opacity: 0.5; }
}

/* Subtle white glow */
.glow {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
  border-radius: 50%;
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

.splashscreen-content {
  text-align: center;
  z-index: 1;
}

/* Logo text animation */
.logo-container {
  margin-bottom: 1.5rem;
}

.logo-text {
  font-size: 5rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-family: system-ui, -apple-system, sans-serif;
}

/* All letters - solid white */
.letter {
  display: inline-block;
  color: var(--splash-fg);
  animation: letterReveal 0.6s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.1s);
  opacity: 0;
  transform: translateY(40px);
}

.letter.accent {
  color: var(--splash-fg);
}

/* Only the plus sign gets the blue accent */
.plus {
  display: inline-block;
  color: var(--brand-primary);
  font-size: 3rem;
  font-weight: 700;
  margin-left: 2px;
  animation: plusPop 0.5s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.1s + 0.2s);
  opacity: 0;
  transform: scale(0);
}

@keyframes letterReveal {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes plusPop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Tagline animation */
.tagline {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: var(--splash-fg-dim);
  margin: 0 0 3rem;
  display: flex;
  justify-content: center;
}

.tagline-char {
  display: inline-block;
  animation: charFade 0.3s ease-out forwards;
  animation-delay: calc(0.8s + var(--char-delay) * 0.03s);
  opacity: 0;
  color: var(--splash-fg);
}

@keyframes charFade {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Minimal loader - white rings with blue dot */
.loader-container {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: pulse-ring 2.5s ease-out infinite;
}

.pulse-ring.delay-1 { animation-delay: 0.5s; }
.pulse-ring.delay-2 { animation-delay: 1s; }

@keyframes pulse-ring {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}

/* Blue accent on loader dot only */
.loader-dot {
  width: 8px;
  height: 8px;
  background: var(--brand-primary);
  border-radius: 50%;
  animation: dot-pulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(var(--brand-primary-rgb), 0.6);
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
}
</style>
