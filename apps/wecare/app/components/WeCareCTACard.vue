<template>
  <UCard
    class="
      mx-4
      md:mx-0
    "
    variant="soft"
    :ui="{
      root: `overflow-hidden rounded-2xl bg-muted`,
      body: `
        flex items-center gap-4 p-4
        md:p-6
        lg:p-8
      `,
    }"
  >
    <div
      class="
        relative flex size-16 shrink-0 items-center justify-center
        md:size-20
        lg:size-24
      "
    >
      <!-- Sign-in illustration with user icon and decorative elements -->
      <div class="relative">
        <UIcon
          name="lucide:user-round" class="
            size-12 text-default
            md:size-16
            lg:size-20
          "
        />
        <div
          class="
            absolute -top-1 -right-1 size-3.5 rounded-full bg-secondary
            md:size-4
            lg:size-5
          "
        />
        <div
          class="
            absolute -bottom-1 -left-1 size-2.5 rounded-full bg-brand
            md:size-3
            lg:size-4
          "
        />
      </div>
    </div>
    <div class="flex-1">
      <h3
        class="
          mb-1 text-base/tight font-semibold text-default
          md:text-lg
          lg:text-xl
        "
      >
        Personalize your APP
      </h3>
      <p
        class="
          text-sm/snug text-default
          md:text-base
          lg:text-lg
        "
      >
        Sign in or create an account for a faster, easier experience and collect care points.
      </p>
    </div>
    <!-- Desktop: Sign in button -->
    <div
      class="
        hidden shrink-0
        md:block
      "
    >
      <UButton
        label="Sign In"
        color="neutral"
        variant="solid"
        size="lg"
      />
    </div>
  </UCard>
</template>
