import { LoaderReturnType } from 'deco/mod.ts'
import type { TipoDeFiltro } from 'deco-sites/shp/types/CampanhaTypes.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { Product } from 'deco-sites/std/commerce/types.ts'
import { useEffect, useState, useRef } from 'preact/hooks'
import {Runtime} from 'deco-sites/shp/runtime.ts'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CampanhaCard.tsx'
import useTimer,{ TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import prodQntd from 'deco-sites/shp/FunctionsSHP/productQntHotsite.ts'
import {JSX} from 'preact'

//montando interface com infos que precisam de descricao no ADMIN
interface NeedDesc{
  /** @description formato AAAA-MM-DD*/
  inicioDaOferta:string
  /** @description formato AAAA-MM-DD*/
  finalDaOferta:string
  /**@description Escreva aqui o texto da tag de frete grátis */
  freteGratis?:string
}

export type Props={
  collection:string
  produtos: LoaderReturnType<Product[] | null>
  bannerUrl:{
    desktop:string
    mobile:string
    linkCta?:string
  } 
} & NeedDesc & TipoDeFiltro

type Filter={
  index:number
  value:string
  fqType:string
}

const loaderData= async(idCollection:string, order?:string, filter?:string):Promise<Product[]>=>{
  const arrQueryString=[`fq=productClusterIds:${idCollection}`]
  if(order && order!=='') arrQueryString.push(`O=${order}`)
  filter && arrQueryString.push('fq='+filter)
  arrQueryString.push('_from=0&_to=49')
  const queryString=encodeURI(arrQueryString.join('&'))

  return await Runtime.invoke({
    key:'deco-sites/shp/loaders/getProductsSearchAPIProdType.ts',
    props:{queryString}
  })
}

const Campanha=({collection, produtos, bannerUrl, tipo, freteGratis, finalDaOferta, inicioDaOferta}:Props)=>{
  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined
  const timeRemaining:TimeRemaining=useTimer(finalDate)

  const onlyProds=produtos

  const [filterSelected, setFilterSelected]=useState<Filter>({index:777,value:'inicio',fqType:''})
  const [products, setProducts]=useState<Product[]>(produtos || [])
  const [readyQuantities, setReadyQuantities]=useState<number[]>([])
  const [order, setOrder]=useState('')

  const ulFilters=useRef<HTMLUListElement>(null)

  const fetchData=async()=>{
    const filterVal=filterSelected.fqType==='P' ? '['+filterSelected.value+']' : filterSelected.value
    const Filter=filterSelected.value==='' ? undefined : `${filterSelected.fqType}:${filterVal}`
    const data=await loaderData(collection, order, Filter)
    setProducts(data)
  }

  useEffect(()=>{
    if(filterSelected.value!=='inicio'){
      fetchData()
    }
  },[filterSelected])

  useEffect(()=>{
    (async()=>{
      const prodPromises=products.map(product=>prodQntd(product, new Date(inicioDaOferta), new Date(finalDaOferta)))
      const readyPromises=await Promise.all(prodPromises)

      setReadyQuantities(readyPromises)
    })()
  },[products])

  const handleClickFilters=(event:MouseEvent)=>{
    const Target=(event.target! as HTMLImageElement).parentElement! as HTMLLIElement
    const value=Target.getAttribute('data-value')!
    const index=parseFloat(Target.getAttribute('data-index')!)
    const fqType=Target.getAttribute('data-fq')!
    const ulFiltersCurrent=ulFilters.current!
    const liAlreadySelected=ulFiltersCurrent.querySelector(`li[data-index="${filterSelected.index}"]`)
    liAlreadySelected && (liAlreadySelected as HTMLLIElement).classList.replace('border-b-[#dd1f26]','border-b-transparent')
    Target.classList.replace('border-b-transparent','border-b-[#dd1f26]')
    setFilterSelected({index,value,fqType})
  }

  return (
  <>
    <div className='bg-[#262626]'>
      <a href={bannerUrl.linkCta}><Image width={1968} height={458} src={bannerUrl.desktop} className='hidden re1:block'/></a>
      <a href={bannerUrl.linkCta}><Image width={420} height={300} src={bannerUrl.mobile} className='re1:hidden'/></a>

      {tipo!==undefined && (typeof tipo!=='string' ? (
        <ul className='hidden re1:grid gap-20 my-4 items-center justify-center px-8' style={{ gridTemplateColumns: `repeat(${tipo.tipoDeFiltro.length+1}, auto)` }} ref={ulFilters}>
          {tipo.tipoDeFiltro.map((filtro,idx)=>(
            <li data-index={idx} data-value={filtro.value} data-fq={filtro.fqType} className='flex-none cursor-pointer py-2 border-b-2 border-b-transparent'>
              <Image src={filtro.iconURL} width={filtro.iconTamanho.width} height={filtro.iconTamanho.height}
                onClick={handleClickFilters}
                className='hover:scale-105'
              />
            </li>
          ))}

            <li data-index={777} data-value='' data-fq='' className='flex items-center cursor-pointer py-2 border-b-2 border-b-transparent h-full '>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-vertodos.png' width={125} height={30}
                onClick={handleClickFilters}
                className='hover:scale-105 max-h-[30px]'
              />
            </li>
        </ul>
      ) : (
        <div dangerouslySetInnerHTML={{__html:tipo}}/>
      ))}
    </div>

    <div className='flex flex-col gap-5 w-full re1:px-[5%] re4:px-[10%]'>
      {products.map((product,index)=><Card product={product} frete={freteGratis} timeRemaining={timeRemaining} quantidade={readyQuantities[index]}/>)}
    </div>
  </>)
}

export default Campanha