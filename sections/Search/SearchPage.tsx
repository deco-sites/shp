// deno-lint-ignore-file no-explicit-any
import type { SectionProps } from '$live/mod.ts'
import Search from 'deco-sites/shp/components/ComponentsSHP/searchSHP/Search.tsx'

export interface Props {
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

export  const loader = async (
  {iconesNavegacionais}:Props,
  _req:Request
) => {
  const REQ = _req

  const pageUrl=new URL(REQ.url)

  const q = pageUrl.searchParams.get('q')!

  let url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?ft=${q}&_from=0&_to=19`

  let fqVal=null

  const fqName=pageUrl.searchParams.get('fqName')

  if(fqName){
    // pega todas as categorias pra ver qual bate com o nome e então saber o id dela
    const data=await fetch('https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/0').then(async (r)=>{
      const resp=r.clone()
      const text=await r.text()
      if(text==='empty'){
        return null
      }else{
        return resp.json()
      }
    }).catch(err=>console.error(err))

    const categoryId=data.find((categ:any)=>categ.name===fqName).id
    categoryId && (fqVal=categoryId)

    url = `https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?ft=${q}&fq=C:${fqVal}&_from=0&_to=19`
  }

  const data=await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return null
    }else{
      return resp.json()
    }
  }).catch(err=>console.error(err)) || []

  return { data, q, iconesNavegacionais, fqName, fqVal}
}

const SearchPage=({data, q, iconesNavegacionais, fqName, fqVal}:SectionProps<typeof loader>)=>{
  
  if(!data.length){
    return <p>Sua busca por "{encodeURI(q)}" não obteve resultados</p>
  }

  return(
    <Search produtos={data} termo={q} iconesNavegacionais={iconesNavegacionais} categoria={(fqName && fqVal) ? {name:fqName, value:fqVal} : undefined}/>
  )
}

export default SearchPage