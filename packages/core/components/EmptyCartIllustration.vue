<template>
  <div class="flex flex-col items-center justify-center py-8">
    <slot>
      <UIcon
        name="lucide:shopping-cart"
        class="size-48 text-dimmed"
      />
    </slot>
    <slot name="message">
      <p class="mt-4 text-base text-default">
        Your cart is empty
      </p>
    </slot>
  </div>
</template>
