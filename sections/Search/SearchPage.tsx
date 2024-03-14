// deno-lint-ignore-file no-explicit-any
import type { SectionProps } from '$live/mod.ts'
import Search from 'deco-sites/shp/components/ComponentsSHP/searchSHP/Search.tsx'
import SearchSub from 'deco-sites/shp/components/ComponentsSHP/searchSHP/SearchSub.tsx'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import {sendEvent} from 'deco-sites/shp/sdk/analytics.tsx'
import { VtexTypeToAnalytics } from "deco-sites/shp/FunctionsSHP/ProdsToItemAnalytics.ts";

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
    return (
      <div className='re1:px-[5%] re4:px-[15%] appearance-none'>
        <div className='flex flex-col items-center justify-center gap-10 bg-transparent px-4 re1:px-0 mt-14 re1:mt-18 mb-6 re1:mb-10'>
          <p className='text-5xl re1:text-7xl font-bold text-secondary'>Vish, Pinou</p>
          <h4 className='text-lg re1:text-3xl text-center'>Sua busca por "<span className='font-bold text-secondary'>{decodeURI(q)}</span>" não obteve resultados!</h4>
          <a href='/' className='bg-primary py-[10px] px-[50px] text-secondary rounded-lg'>Voltar para a Home</a>
        </div>

        <div className='my-8 re1:my-4'>
          <div className='text-xl flex justify-between items-center w-full mb-4 px-4 re1:px-0'>
            <p>Principais categorias</p>
            <hr className='border-[#262626] w-[40%] re1:w-[80%]'/>
          </div>
          <ul className='flex re1:items-center justify-start re1:justify-around gap-4 re1:gap-0 w-full mb-4 px-4 re1:px-0 overflow-x-auto'>
            {iconesNavegacionais.map((icon)=>(
              <IconeNavegacional href={icon.href} imgUrl={icon.imgUrl} categoryName={icon.categoryName} />
            ))}
          </ul>
        </div>
      </div>)
  }

  return <CompareContextProvider>{(fqVal && fqName) ? <SearchSub produtos={data} termo={q} iconesNavegacionais={iconesNavegacionais} fqName={fqName} fqValue={fqVal}/> : <Search produtos={data} termo={q} iconesNavegacionais={iconesNavegacionais}/>}</CompareContextProvider>
}

export default SearchPage