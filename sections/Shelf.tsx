import { useState, useCallback, useEffect } from 'preact/hooks'
import Vitrine from 'deco-sites/shp/sections/Vitrine.tsx'
import type { SectionProps } from '$live/mod.ts'
import type { Product } from 'apps/commerce/types.ts'
import { LoaderContext } from '$live/mod.ts'
import type {Manifest}  from 'deco-sites/shp/manifest.gen.ts'

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
  const [products,setProducts]=useState<Product[]>([])

  useEffect(()=>{
    setProducts(data)
  })

  return(
    <Vitrine PcGamer produtos={products}/>
  )
}

export default Shelf