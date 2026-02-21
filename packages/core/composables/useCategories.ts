import { mockCategories } from '../shared/data/mock/categories'

/**
 * Fetch product categories.
 */
export function useCategories() {
  const { isMockMode, get } = useApiClient()

  return useAsyncData('categories', async (): Promise<Category[]> => {
    if (isMockMode) {
      return mockCategories
    }

    const response = await get<{ categories: Category[] }>('/categories')
    return response.categories
  })
}
