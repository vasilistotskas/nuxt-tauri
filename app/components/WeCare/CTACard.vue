<template>
  <UCard
    class="mx-4"
    variant="soft"
    :ui="{
      root: `
        overflow-hidden rounded-2xl bg-[#d7d7d7]
        dark:bg-[#242424]
      `,
      body: 'flex items-center gap-4 p-4',
    }"
  >
    <div class="relative flex size-16 shrink-0 items-center justify-center">
      <!-- Sign-in illustration with user icon and decorative elements -->
      <div class="relative">
        <UIcon
          name="lucide:user-round" class="
            size-12 text-[#0d0d0d]
            dark:text-white
          "
        />
        <div class="absolute -top-1 -right-1 size-3.5 rounded-full bg-[#a56dc1]" />
        <div
          class="absolute -bottom-1 -left-1 size-2.5 rounded-full bg-[#1887aa]"
        />
      </div>
    </div>
    <div class="flex-1">
      <h3
        class="
          mb-1 text-base leading-tight font-semibold text-[#0d0d0d]
          dark:text-white
        "
      >
        Personalize your APP
      </h3>
      <p
        class="
          text-sm leading-snug text-[#0d0d0d]
          dark:text-white
        "
      >
        Sign in or create an account for a faster, easier experience and collect care points.
      </p>
    </div>
  </UCard>
</template>
