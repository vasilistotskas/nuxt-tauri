export interface WeCareProductMeta extends Record<string, unknown> {
  caresPoints?: number
}

export type WeCareProduct = Product<WeCareProductMeta>
