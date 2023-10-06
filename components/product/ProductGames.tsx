import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Games from 'deco-sites/shp/components/product/Games.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
}

const ProductGames=({ page }: Props)=>{
  return (
    <div class='bg-[#111] text-white'>
      {page ? <Games page={page}/> : null}
    </div>
  )
}

export default ProductGames