import type { SectionProps } from '$live/mod.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import { LoaderContext } from '$live/mod.ts'
import type  {Manifest}  from 'deco-sites/shp/live.gen.ts'
import Search from 'deco-sites/shp/components/ComponentsSHP/searchSHP/Search.tsx'

export interface Props {
  True:true
}

export const loader: (
  True: Props,
  _req: Request,
  ctx: LoaderContext<unknown, Manifest>
) => Promise<{ data: Product[], q:string }> = async ( __,_req, ctx) => {
  const REQ = _req

  const q = REQ.url.split('?q=')[1]

  const data = await ctx.invoke(
    'deco-sites/std/loaders/vtex/legacy/productList.ts',
    { term:q, count: 20 }
  ) || []

  return { data,q }
}

const SearchPage=({data, q}:SectionProps<typeof loader>)=>{
  
  if(!data.length){
    return <p>Sua busca por '{q}' não obteve resultados</p>
  }

  return(
    <Search produtos={data} termo={q} iconesNavegacionais={[]}/>
  )
}

export default SearchPage