import { mockProducts } from '../shared/data/mock/products'

interface UseProductsOptions {
  category?: Ref<string | undefined>
  search?: Ref<string | undefined>
  key?: string
}

/**
 * Fetch all products with optional filtering.
 * Pass reactive refs for SSR-safe reactive params.
 */
export function useProducts(options?: UseProductsOptions) {
  const { isMockMode, get } = useApiClient()
  const key = options?.key ?? 'products'

  return useAsyncData(key, async (): Promise<Product[]> => {
    const categoryVal = options?.category?.value
    const searchVal = options?.search?.value

    if (isMockMode) {
      let results = [...mockProducts]
      if (categoryVal) {
        results = results.filter(p => p.category === categoryVal)
      }
      if (searchVal) {
        const query = searchVal.toLowerCase()
        results = results.filter(p =>
          p.name.toLowerCase().includes(query)
          || p.brand.toLowerCase().includes(query),
        )
      }
      return results
    }

    const params = new URLSearchParams()
    if (categoryVal)
      params.set('category', categoryVal)
    if (searchVal)
      params.set('search', searchVal)

    const queryStr = params.toString()
    const path = `/products${queryStr ? `?${queryStr}` : ''}`
    const response = await get<{ products: Product[], total: number }>(path)
    return response.products
  }, {
    watch: [() => options?.category?.value, () => options?.search?.value],
  })
}

/**
 * Fetch a single product by ID.
 * Accepts a reactive ref so re-fetching works on route param changes.
 */
export function useProduct(id: MaybeRef<string | number>) {
  const { isMockMode, get } = useApiClient()
  const idRef = toRef(id)

  return useAsyncData(() => `product-${idRef.value}`, async (): Promise<Product | null> => {
    const idVal = idRef.value

    if (isMockMode) {
      const product = mockProducts.find(p => String(p.id) === String(idVal))
      return product ?? null
    }

    return get<Product>(`/products/${idVal}`)
  }, {
    watch: [idRef],
  })
}
