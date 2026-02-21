import { mockProducts } from '../../../shared/data/mock/products'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const product = mockProducts.find(p => String(p.id) === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    })
  }

  return product
})
