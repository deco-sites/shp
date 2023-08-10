// deno-lint-ignore-file no-window-prefix
import { useEffect, useState } from 'preact/hooks'
import { Runtime } from 'deco-sites/std/runtime.ts'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Benefits from "deco-sites/shp/sections/Benefits.tsx";
import { FilterToggleValue } from "deco-sites/std/commerce/types.ts";
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx';

export interface Props{
  titleCategoria?:string
  idCategoria:number
  bannerUrl:string
  descText?:string
  seoText?:string
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

const fetchData=async (idCateg:number)=>{
  const data= await Runtime.invoke({
    key:'deco-sites/std/loaders/vtex/legacy/productListingPage.ts',
    props:{count:20,fq:`C:/${idCateg}/`}
  })

  return data
}

const fetchProducts= (idCateg:number, from:number, to:number)=>{
  return []
}

const replaceClasses=(desc:string)=>{
  let string=desc
  //removendo butão de fecha e vermais
  string=string.replace('<span class="buttonText verMais"> <span class="verMais">Ver mais</span> <span class="fechar">Fechar</span> </span>','')

  // string=string.replaceAll('<p>','<p class="pb-[10px]">')

  string=string.replaceAll('text-categoriaSeo','mb-[20px] font-normal font-sans')

  string=string.replaceAll('<h2>','<h2 class="font-black text-xl text-primary m-0 flex leading-loose">')

  string=string.replaceAll('<h3>','<h3 class="font-medium text-2xl leading-loose flex m-0">')

  // string=string.replaceAll('<ul>','<ul class="list-disc">')

  // string=string.replaceAll('<li>','<li class="list-disc">')

  string=string.replaceAll('<a','<a class="text-primary hover:text-white"')

  return string
}

interface FilterObj{
  label:string
  values:FilterToggleValue[]
}

const pagDepartamento=({bannerUrl, descText, idCategoria, seoText, titleCategoria, iconesNavegacionais}:Props)=>{
  const [hideDescSeo,setHideDescSeo]=useState(true)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:20})
  const [order,setOrder]=useState('')
  const [filters,setFilters]=useState<FilterObj[]>([])

  const orderFilters=[
    {'Menor Preço':'OrderByPriceDESC'},
    {'Maior Preço':'OrderByPriceASC'},
    {'Mais Vendidos':'OrderByTopSaleDESC'},
    {'Melhores Avaliações':'OrderByReviewRateDESC'},
    {'A - Z':'OrderByNameASC'},
    {'Z - A':'OrderByNameDESC'},
    {'Data de Lançamento':'OrderByReleaseDateDESC'},
    {'Melhor Desconto':'OrderByBestDiscountDESC'}
  ]

  useEffect(()=>{
    const initialScrollY=0
    let scrolledDown=false

    const header=document.querySelector('body div.z-30.fixed')
    header && ((header.children[0] as HTMLElement).style.opacity='.8')

    const handleScroll=()=>{
      if(window.scrollY > initialScrollY && !scrolledDown){
        header && ((header.children[0] as HTMLElement).style.opacity='1')
        scrolledDown=true
      }else if(window.scrollY <= initialScrollY && scrolledDown){
        header && ((header.children[0] as HTMLElement).style.opacity='.8')
        scrolledDown=false
      }
    }

    (async()=>{
      const pageData=await fetchData(idCategoria)
      const dataFilters=pageData!.filters.filter(item=>item.label!=='Departments')
      const arrFilterObj=dataFilters.map(filtro=>filtro.label!=='Brands' ? 
        {label:filtro.label, values:(filtro.values as FilterToggleValue[])} : {label:'Marcas', values:(filtro.values as FilterToggleValue[])}
      )
      setFilters(arrFilterObj)
      console.log(arrFilterObj)
    })()
    
    window.addEventListener('scroll',handleScroll)

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return(
    <div className='w-full text-white'>
      <div className='absolute top-0 z-[-1] '>
        <Image src={bannerUrl} width={1920} height={1080}  decoding='async' loading='eager'
          fetchPriority='high' preload 
        />
      </div>
      <div className='re1:px-[15%]'>
        <div className='my-[60px] text-gray-500'>
          <p><a href='/'>Home</a> &gt; {titleCategoria}</p>
        </div>
        <div className='bg-transparent'>
          <h4 className='text-3xl font-bold'>{titleCategoria}</h4>
          <div className='max-w-[40%] my-[50px] text-xl' dangerouslySetInnerHTML={{__html: descText|| '<div>OII Luii</div>'}} />
          <button className='font-bold mb-2 border-b border-b-primary' onClick={()=>setHideDescSeo(!hideDescSeo)}>{hideDescSeo ? 'Ver mais' : 'Fechar'}</button>
          <div className={`${hideDescSeo ? 'line-clamp-1' : ''}`} dangerouslySetInnerHTML={{__html: replaceClasses(seoText || '') || '<div>OII Luii</div>'}} />
        </div>

        <Benefits/>

        <div>
          <div className='text-2xl flex justify-between items-center w-full mb-4'>
            <p>Principais categorias</p>
            <hr className='border-[#262626] w-[80%]'/>
          </div>
          <ul className='flex items-center justify-around w-full mb-4'>
            {iconesNavegacionais.map((icon)=>(
              <IconeNavegacional href={icon.href} imgUrl={icon.imgUrl} categoryName={icon.categoryName} />
            ))}
          </ul>
        </div>

        <div className='flex justify-between align-bottom'>
          <p>Filtros</p>
          <label className='focus-within:text-primary'>
            <span>Ordenar Por:</span>
            <select className="text-white !outline-none select bg-transparent border border-white focus:bg-[#1e1e1e] w-full max-w-xs"
              onInput={(event)=>{
                console.log((event.target as HTMLSelectElement).value)
              }}
            >
              <option disabled selected>Selecione</option>
              {orderFilters.map(filter=>(
                <option className='hover:bg-[#d1d1d1]' value={Object.values(filter)[0]}>{Object.keys(filter)[0]}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='flex w-full'>
          <ul className='w-[22%] flex flex-col gap-4'>
            {filters.map(filtro=><Filtro title={filtro.label} values={filtro.values} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default pagDepartamento