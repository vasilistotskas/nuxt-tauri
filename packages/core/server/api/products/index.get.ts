import { mockProducts } from '../../../shared/data/mock/products'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  let products = [...mockProducts]

  if (query.category) {
    products = products.filter(p => p.category === String(query.category))
  }

  if (query.search) {
    const search = String(query.search).toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(search)
      || p.brand.toLowerCase().includes(search),
    )
  }

  return {
    products,
    total: products.length,
  }
})
