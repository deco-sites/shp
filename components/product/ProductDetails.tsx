import Button from 'deco-sites/fashion/components/ui/Button.tsx'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

import ProductSelector from './ProductVariantSelector.tsx'
import ProductImageZoom from 'deco-sites/fashion/islands/ProductImageZoom.tsx'
import Details from 'deco-sites/shp/components/product/Details.tsx'


export type Variant = 'front-back' | 'slider' | 'auto'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  /**@description Desconto pix, caso não haja coloque 1 */
  pix: number
}

const WIDTH = 400
const HEIGHT = 400
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`
/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class='w-full flex justify-center items-center py-28'>
      <div class='flex flex-col items-center justify-center gap-6'>
        <span class='font-medium text-2xl'>Página não encontrada</span>
        <a href='/'>
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  )
}

function ProductDetails({ page, pix }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */

  return (
    <div class='py-10 re1:p-10 bg-[#111] text-white'>
      {page ? <Details page={page} pix={pix}/> : <NotFound />}
    </div>
  )
}

export default ProductDetails
