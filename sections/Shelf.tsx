import { useState, useRef, useEffect } from 'preact/hooks'
import type { SectionProps } from '$live/mod.ts'
import type { Product } from 'apps/commerce/types.ts'
import { LoaderContext } from '$live/mod.ts'
import type {Manifest}  from 'deco-sites/shp/manifest.gen.ts'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import Filtro from 'deco-sites/shp/sections/Shelf/Filtro.tsx'

export interface Props {
  fqType: string
}

interface FilterObj{
  label:string
  values:Array<{
    value:string
    checked:boolean
  }>
}

export const loader: (
  fqType: Props,
  _req: Request,
  ctx: LoaderContext<unknown, Manifest>
) => Promise<{ data: Product[], filters:FilterObj[] }> = async (fqType, _req, ctx) => {
  const REQ = _req

  const q = REQ.url.split('?q=')[1].split(',')
  const fqs = q.map((fq: string) => `fq=${fqType.fqType}:${fq}`)

  const data:Product[] = (await ctx.invoke(
    'deco-sites/shp/loaders/getProductsSearchAPIProdType.ts',
    { queryString:fqs.join('&')+'&_from=0&_to=49' }
  ) || [])

  const specsKey=['Processador', 'Fonte', 'Placa Mãe', 'Placa de vídeo', 'Memória', 'SSD', 'HD', 'Gabinete']

  const filters:FilterObj[]=specsKey.map(specKey=>{return {label:specKey,values:[]} })
  
  data.forEach(prod=>{
    prod.isVariantOf?.additionalProperty?.forEach(prop=>{
      if(specsKey.includes(prop.name!)){
        const values=filters.find(filter=>filter.label===prop.name)?.values
        !values?.some(value=>value.value===prop.value!) && values?.push({value:prop.value!, checked:false})
      }
    })
  })

  return { data, filters }
}

const Shelf=({data, filters}:SectionProps<typeof loader>)=>{
  const [produtos,setProdutos]=useState<Product[]>(data)
  const [selectedFilters, setSelectedFilters]=useState<FilterObj[]>(filters)

  const listFiltersDesk=useRef<HTMLUListElement>(null)

  const addFiltersFunctionability=()=>{
    if(listFiltersDesk){
      console.log('batata')
    }
  }

  useEffect(()=>{
    setProdutos(data)
  },[selectedFilters])

  return(
    <CompareContextProvider>
      <div className='my-5'>
        <div className='flex w-full justify-between re1:px-[5%] re4:px-[15%] text-white'>
          <ul ref={listFiltersDesk} className='w-[22%] re1:flex flex-col hidden'>
            {filters.map(filter=><Filtro filtro={filter}/>)}
          </ul>
          <div className={`grid grid-cols-2 gap-x-2 gap-y-2 w-[90vw] re1:grid-cols-4 re1:w-[75%] re1:gap-x-3 re1:gap-y-3 mx-auto`}>
            {produtos.map(element=><Card product={element} pix={'12'}/>)}
          </div>
        </div>
      </div>
    </CompareContextProvider>
  )
}

export default Shelf