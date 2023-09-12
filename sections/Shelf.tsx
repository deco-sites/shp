import { useState, useCallback, useEffect } from 'preact/hooks'
import Vitrine from 'deco-sites/shp/sections/Vitrine.tsx'
import type { SectionProps } from 'deco/mod.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import { LoaderContext } from 'deco/mod.ts'
import type  {Manifest}  from 'deco-sites/shp/live.gen.ts'

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
  const fqs = q.map((fq: string) => `${fqType.fqType}:${fq}`)

  const data = await ctx.invoke(
    'deco-sites/std/loaders/vtex/legacy/productList.ts',
    { fq: fqs, count: 50 }
  ) || []

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