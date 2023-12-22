import { useState, useCallback, useEffect } from 'preact/hooks'
import type { SectionProps } from '$live/mod.ts'
import type { Product } from 'apps/commerce/types.ts'
import { LoaderContext } from '$live/mod.ts'
import type {Manifest}  from 'deco-sites/shp/manifest.gen.ts'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'

export interface Props {
  fqType: string
}

export const loader: (
  fqType: Props,
  _req: Request,
  ctx: LoaderContext<unknown, Manifest>
) => Promise<{ data: Product[] }> = async (fqType, _req, ctx) => {
  const REQ = _req

  const q = REQ.url.split('?q=')[1].split(',')
  const fqs = q.map((fq: string) => `fq=${fqType.fqType}:${fq}`)

  const data = (await ctx.invoke(
    'deco-sites/shp/loaders/getProductsSearchAPIProdType.ts',
    { queryString:fqs.join('&')+'&_from=0&_to=49' }
  ) || [])
  // .filter((item:Product)=>item.category?.includes('Computadores gamer'))

  return { data }
}

const Shelf=({data}:SectionProps<typeof loader>)=>{
  const [produtos,setProdutos]=useState<Product[]>([])

  useEffect(()=>{
    setProdutos(data)
  })

  return(
    <CompareContextProvider>
      <div className='my-5'>
        <div
          className={`grid grid-cols-2 gap-x-2 gap-y-2 w-[90vw] re1:grid-cols-4 re1:w-[50vw] re1:gap-x-3 re1:gap-y-3 mx-auto`}
        >
          {produtos.map(element=><Card product={element} pix={'12'}/>)}
        </div>
      </div>
    </CompareContextProvider>
  )
}

export default Shelf