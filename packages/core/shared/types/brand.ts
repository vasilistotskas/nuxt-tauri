export interface BrandColors {
  primary: string
  primaryDark: string
}

export interface BrandMetadata {
  title: string
  description: string
}

export interface BrandConfig {
  name: string
  author: string
  colors: BrandColors
  logo: string
  metadata: BrandMetadata
}
