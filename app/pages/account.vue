<template>
	<div class="min-h-screen max-w-full overflow-x-hidden bg-white dark:bg-[#0d0d0d] pb-24">
		<!-- Header -->
		<div class="px-4 pt-8 pb-4 relative">
			<h1 class="text-2xl font-bold text-center text-black dark:text-white tracking-wide">
				My account
			</h1>
			<!-- Theme toggle -->
			<ClientOnly>
				<UButton
					:icon="isDark ? 'lucide:moon' : 'lucide:sun'"
					class="absolute top-6 right-4"
					color="neutral"
					variant="ghost"
					size="lg"
					@click="isDark = !isDark"
				/>
			</ClientOnly>
		</div>

		<USeparator class="mx-4" />

		<!-- Subheader -->
		<div class="text-center py-6">
			<p class="text-base font-semibold text-[#545454] mb-2">
				Good morning
			</p>
			<ULink class="text-lg font-semibold text-black dark:text-white underline">
				Register or log in
			</ULink>
		</div>

		<!-- Menu Items -->
		<div class="px-4 space-y-0">
			<WeCareAccountMenuItem
				v-for="item in menuItems"
				:key="item.label"
				:label="item.label"
				@click="handleMenuClick(item.route)"
			/>
		</div>

		<!-- Action Buttons -->
		<div class="px-4 mt-8 space-y-4">
			<UButton
				block
				size="xl"
				color="neutral"
				variant="solid"
				class="h-[52px] text-lg font-semibold"
				@click="handleLogin"
			>
				Log in
			</UButton>

			<UButton
				block
				size="xl"
				color="neutral"
				variant="outline"
				class="h-[52px] text-lg font-semibold"
				@click="handleChangePassword"
			>
				Change password
			</UButton>
		</div>

		<!-- Footer Links -->
		<div class="px-4 mt-8">
			<div class="flex justify-between mb-4">
				<ULink class="text-[15px] text-black dark:text-white underline">
					Shipping terms
				</ULink>
				<ULink class="text-[15px] text-black dark:text-white underline">
					Return policy
				</ULink>
				<ULink class="text-[15px] text-black dark:text-white underline">
					Terms of Use
				</ULink>
			</div>
			<div class="flex justify-center gap-12">
				<ULink class="text-[15px] text-black dark:text-white underline">
					Privacy Policy
				</ULink>
				<ULink class="text-[15px] text-black dark:text-white underline">
					Cookies
				</ULink>
			</div>
		</div>

		<!-- Bottom Navigation -->
		<WeCareBottomNav :nav-items="navItems" @navigate="handleNavigate" />
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: false
	});

	const router = useRouter();
	const colorMode = useColorMode();

	const isDark = computed({
		get() {
			return colorMode.value === "dark";
		},
		set(_isDark) {
			colorMode.preference = _isDark ? "dark" : "light";
		}
	});

	const menuItems = ref([
		{ label: "My Orders", route: "/orders" },
		{ label: "Purchased products", route: "/purchased" },
		{ label: "Care points & Discounts", route: "/points" },
		{ label: "Account settings", route: "/settings" },
		{ label: "Language", route: "/language" },
		{ label: "Help", route: "/help" }
	]);

	const navItems = ref([
		{ label: "Home", icon: "lucide:house", route: "/", active: false },
		{ label: "Shop", icon: "lucide:search", route: "/shop", active: false },
		{ label: "Cart", icon: "lucide:shopping-cart", route: "/cart", active: false },
		{ label: "Favorites", icon: "lucide:heart", route: "/favorites", active: false },
		{ label: "Account", icon: "lucide:user", route: "/account", active: true }
	]);

	function handleNavigate(route: string) {
		router.push(route);
	}

	function handleMenuClick(route: string) {
		router.push(route);
	}

	function handleLogin() {
	// Handle login action
	}

	function handleChangePassword() {
	// Handle change password action
	}
</script>
