<script setup lang="ts">
const { $i18n } = useNuxtApp()
const appConfig = useAppConfig()

const { data: allProducts } = useProducts({ key: 'cart-suggested' })
const suggestedProducts = computed(() => allProducts.value?.slice(0, 4) ?? [])

const cartStore = useCartStore()
</script>

<template>
  <div
    class="
      md:px-6
      lg:px-8
    "
  >
    <!-- Header -->
    <header
      class="
        px-4 pt-8 pb-4
        md:px-0 md:pt-6
      "
    >
      <h1
        class="text-center text-2xl font-bold tracking-wide text-default"
      >
        {{ $i18n.t('cart.title') }}
      </h1>
      <USeparator class="mt-4" />
    </header>

    <!-- Empty Cart State -->
    <EmptyCartIllustration
      class="
        py-6
        md:py-10
      "
    />

    <!-- You Might Like Section -->
    <section
      class="
        mt-6 px-4
        md:mt-10 md:px-0
      "
    >
      <h2
        class="
          mb-6 text-center text-lg font-bold tracking-wide text-default
          uppercase
          md:text-xl
        "
      >
        {{ $i18n.t('cart.youMightLike') }}
      </h2>

      <!-- Mobile: Carousel -->
      <div class="md:hidden">
        <UCarousel
          v-slot="{ item }"
          :items="suggestedProducts"
          dots
          :ui="{
            item: `
              shrink-0 basis-[180px]
              first:ps-4
            `,
            container: 'gap-4',
            dots: 'relative bottom-0 mt-6 justify-center',
            dot: `
              bg-dimmed size-2.5 rounded-full
              data-[state=active]:bg-default
            `,
          }"
        >
          <ProductCard :product="item" show-add-to-cart @add-to-cart="cartStore.addItem(item)" />
        </UCarousel>
      </div>

      <!-- Tablet/Desktop: Grid -->
      <div
        class="
          hidden gap-4
          md:grid md:grid-cols-3
          lg:grid-cols-4 lg:gap-6
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        <ProductCard
          v-for="product in suggestedProducts"
          :key="product.id"
          :product="product"
          show-add-to-cart
          class="w-full"
          @add-to-cart="cartStore.addItem(product)"
        />
      </div>
    </section>

    <!-- Info Section (only if brand provides config) -->
    <section
      v-if="appConfig.cart.freeShippingThreshold || appConfig.cart.supportPhone"
      class="
        mt-10 px-4 pb-8
        md:mt-14 md:px-0
      "
    >
      <USeparator />
      <!-- Mobile: Stacked / Desktop: Side-by-side -->
      <div
        class="md:flex md:gap-8"
      >
        <div v-if="appConfig.cart.freeShippingThreshold" class="flex-1">
          <p
            class="
              py-4 text-[15px] tracking-wide text-default
              md:text-base
            "
          >
            <span class="font-bold">{{ $i18n.t('cart.freeShipping') }}</span> {{ $i18n.t('cart.freeShippingDesc', { threshold: `${appConfig.cart.freeShippingThreshold}€` }) }}
          </p>
        </div>
        <template v-if="appConfig.cart.freeShippingThreshold && appConfig.cart.supportPhone">
          <USeparator class="md:hidden" />
          <USeparator
            orientation="vertical"
            class="
              hidden self-stretch
              md:block
            "
          />
        </template>
        <div v-if="appConfig.cart.supportPhone" class="flex-1">
          <p
            class="
              py-4 text-[15px] tracking-wide text-default
              md:text-base
            "
          >
            <span class="font-bold">{{ $i18n.t('cart.telephoneOrders') }}</span> {{ appConfig.cart.supportPhone }}
          </p>
        </div>
      </div>
      <USeparator />
    </section>
  </div>
</template>
