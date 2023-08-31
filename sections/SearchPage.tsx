// deno-lint-ignore-file no-explicit-any
import type { SectionProps } from '$live/mod.ts'
import Search from 'deco-sites/shp/components/ComponentsSHP/searchSHP/Search.tsx'

export interface Props {
  True:true
}

export const loader: (
  True: Props,
  _req: Request
) => Promise<{ data:any, q:string }> = async ( __,_req) => {
  const REQ = _req

  const q = REQ.url.split('?q=')[1]

  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?ft=${q}&_from=0&_to=19`

  const data=await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return null
    }else{
      return resp.json()
    }
  }).catch(err=>console.error(err)) || []

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