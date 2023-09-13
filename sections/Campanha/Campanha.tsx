import { LoaderReturnType } from 'deco/mod.ts'
import type { TipoDeFiltro } from 'deco-sites/shp/types/CampanhaTypes.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { Product } from 'deco-sites/std/commerce/types.ts'
import { useEffect, useState, useRef } from 'preact/hooks'
import {Runtime} from 'deco-sites/shp/runtime.ts'

//arrumar pra amanha usar o runtime ao inves do loader no começo

export type Props={
  collection:string
  produtos: LoaderReturnType<Product[] | null>
  bannerUrl:{
    desktop:string
    mobile:string
    linkCta?:string
  } 
} & TipoDeFiltro

type Filter={
  index:number
  value:string
}

const fetchData=async(idCollection:string, order?:string, filter?:string)=>{
  const arrQueryString=[`fq=productClusterIds:${idCollection}`]
  order && arrQueryString.push(`O=${order}`)
  filter && arrQueryString.push(filter)
  const queryString=encodeURI(arrQueryString.join('&'))

  return await Runtime.invoke({
    key:'deco-sites/shp/loaders/getProductsSearchAPIProdType.ts',
    props:{queryString}
  })
}

const Campanha=({collection, produtos, bannerUrl, tipo}:Props)=>{
  const onlyProds=produtos

  const [filterSelected, setFilterSelected]=useState<Filter>({index:999,value:'inicio'})

  useEffect(()=>{
    console.log(filterSelected)
  },[filterSelected])

  useEffect(()=>{
    (async()=>{
      console.log(produtos)
      const data=await fetchData(collection, 'OrderByPriceASC')
      console.log(data)
    })()
  },[])

  return (
  <>
    <div className='bg-[#262626]'>
      <a href={bannerUrl.linkCta}><Image width={1968} height={458} src={bannerUrl.desktop} className='hidden re1:block'/></a>
      <a href={bannerUrl.linkCta}><Image width={420} height={300} src={bannerUrl.mobile} className='re1:hidden'/></a>
      {tipo!==undefined && (typeof tipo!=='string' ? (
        <ul className='flex gap-3 my-4 items-center justify-around'>
          {tipo.tipoDeFiltro.map((filtro,idx)=>(
            <li data-index={idx} data-value={filtro.value} className='cursor-pointer'>
              <Image src={filtro.iconURL} width={filtro.iconTamanho.width} height={filtro.iconTamanho.height}
                onClick={(event)=>{
                  const Target=(event.target! as HTMLImageElement).parentElement! as HTMLLIElement
                  const value=Target.getAttribute('data-value')!
                  const index=idx
                  setFilterSelected({index,value})
                }}
              />
            </li>
          ))}

            <li data-index={777} data-value='' className='cursor-pointer'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-vertodos.png' width={125} height={30}
                onClick={(event)=>{
                  const Target=(event.target! as HTMLImageElement).parentElement! as HTMLLIElement
                  const value=Target.getAttribute('data-value')!
                  const index=777
                  setFilterSelected({index,value})
                }}
              />
            </li>
        </ul>
      ) : (
        <div dangerouslySetInnerHTML={{__html:tipo}}/>
      ))}
    </div>

    
  </>)
}

export default Campanha