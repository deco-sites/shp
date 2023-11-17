import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import RecommendedProds from 'deco-sites/shp/components/product/RecommendedProds.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
}

const ProductRecommendedProds=({ page }: Props)=>{
  return (
    <div class='bg-base-100 text-secondary'>
      {page ? <RecommendedProds page={page}/> : null}
    </div>
  )
}

export default ProductRecommendedProds