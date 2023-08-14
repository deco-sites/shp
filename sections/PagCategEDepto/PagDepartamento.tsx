// deno-lint-ignore-file no-window-prefix no-explicit-any
import { useEffect, useState, useRef } from 'preact/hooks'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Benefits from "deco-sites/shp/sections/Benefits.tsx"
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx'
import { Runtime } from "deco-sites/shp/runtime.ts"
import FiltroMob from "deco-sites/shp/sections/PagCategEDepto/FiltroMob.tsx";

export interface Props{
  titleCategoria?:string
  /**@description separe os ids por barra caso seja uma categoria ex: Dep/Categ */
  idsDeCategoria:string
  bannerUrl:string
  descText?:string
  seoText?:string
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

const fetchData=async (idCateg:string)=>{
  const url=`https://api.shopinfo.com.br/Deco/getFacetsByCategId.php?fq=C:/${idCateg}/`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

const fetchProducts=async (queryString:string)=>{
  const url=`https://api.shopinfo.com.br/Deco/getProductsList.php?${queryString}`
  console.log(url)
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
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
  values:SpecObj[]
}

interface SpecObj{
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
}

const pagDepartamento=({bannerUrl, descText, idsDeCategoria, seoText, titleCategoria, iconesNavegacionais}:Props)=>{
  const [hideDescSeo,setHideDescSeo]=useState(true)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:19})
  const [order,setOrder]=useState('')
  const [filters,setFilters]=useState<FilterObj[]>([])
  const [selectedFilters,setSelectedFilters]=useState<Array<{fq:string, value:string}>>([])
  const [products, setProducts]=useState<any>([])
  const [fetchLength, setFetchLength]=useState(0)

  const filterLabel=useRef<HTMLLabelElement>(null)

  const listFiltersDesk=useRef<HTMLUListElement>(null)

  const addFilterListeners=()=>{
    const ulDesk=listFiltersDesk.current!

    Array.from(ulDesk.querySelectorAll('input[type="checkbox"]')).forEach((checkbox)=>{
      (checkbox as HTMLInputElement).addEventListener('input',(event)=>{
        const target=(event.target as HTMLInputElement)
        setSelectedFilters(prevSelectedFilters => 
          (target.checked) ? [...prevSelectedFilters, {fq:(target.getAttribute('data-fq') as string) ,value:target.value}] : [...prevSelectedFilters.filter(obj => obj.value !== target.value)]
        )
      })
    })

    const ulMob=filterLabel.current && filterLabel.current.querySelector('dialog ul')
    const btnFilter=filterLabel.current && filterLabel.current.querySelector('dialog button#filtrar')

    btnFilter && (btnFilter as HTMLButtonElement).addEventListener('click',(event)=>{
      const inputsChecked:HTMLInputElement[]=Array.from(ulMob!.querySelectorAll('input:checked'))
      const filtersSelected:Array<{fq:string, value:string}> =[]
      inputsChecked.forEach(input=>{
        filtersSelected.push({fq:input.getAttribute('data-fq')!, value:input.value})
      })

      setSelectedFilters(filtersSelected)
    })
  }

  const orderFilters=[
    {'Menor Preço':'OrderByPriceASC'},
    {'Maior Preço':'OrderByPriceDESC'},
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
      const pageData=await fetchData(idsDeCategoria)

      const dataFilters:Record<string,SpecObj[]> ={'Marcas': pageData!.Brands, ...pageData!.SpecificationFilters}

      const arrFilterObj:FilterObj[]=[]

      for(const key in dataFilters){
        arrFilterObj.push({label:key , values:dataFilters[key]})
      }
      
      setFilters(arrFilterObj)
    })()
    
    window.addEventListener('scroll',handleScroll)

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  useEffect(()=>{filters.length && addFilterListeners()},[filters])

  const handleMoreProducts=async()=>{
    const fqsFilter=selectedFilters.map(obj=>obj.fq==='b' ? `ft=${obj.value}` : `fq=${obj.fq}:${obj.value}`)
    const queryString=[`fq=C:/${idsDeCategoria}/`,...fqsFilter,`_from=${fromTo.from}&_to=${fromTo.to}`]
    order!=='' && queryString.push(`O=${order}`)
    const data= await fetchProducts(queryString.join('&'))
    setFetchLength(data.length)
    fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data]) : setProducts(data)
  }

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})
  },[selectedFilters])

  useEffect(()=>{
    typeof window!=='undefined' && handleMoreProducts()
  },[fromTo])

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})
  },[order])

  useEffect(()=>console.log(products),[products])

  return(
    <div className='w-full text-white'>
      <div className='absolute top-0 z-[-1] '>
        <Image src={bannerUrl} width={1920} height={1080}  decoding='async' loading='eager'
          fetchPriority='high' preload 
        />
      </div>
      <div className='re1:px-[5%] re4:px-[15%]'>
        <div className='my-5 re1:my-[60px] text-gray-500'>
          <p><a href='/'>Home</a> &gt; {titleCategoria}</p>
        </div>
        <div className='bg-transparent px-4 re1:px-0'>
          <h4 className='text-3xl font-bold'>{titleCategoria}</h4>
          <div className='max-w-full re1:max-w-[40%] my-[50px] text-xl' dangerouslySetInnerHTML={{__html: descText|| '<div>OII Luii</div>'}} />
          <button className='font-bold mb-2 border-b border-b-primary' onClick={()=>setHideDescSeo(!hideDescSeo)}>{hideDescSeo ? 'Ver mais' : 'Fechar'}</button>
          <div className={`${hideDescSeo ? 'line-clamp-1' : ''}`} dangerouslySetInnerHTML={{__html: replaceClasses(seoText || '') || '<div>OII Luii</div>'}} />
        </div>

        <Benefits/>

        <div className='mb-8 re1:mb-0'>
          <div className='text-xl re1:text-2xl flex justify-between items-center w-full mb-4 px-4 re1:px-0'>
            <p>Principais categorias</p>
            <hr className='border-[#262626] w-[40%] re1:w-[80%]'/>
          </div>
          <ul className='flex re1:items-center justify-start re1:justify-around gap-4 re1:gap-0 w-full mb-4 px-4 re1:px-0 overflow-x-auto'>
            {iconesNavegacionais.map((icon)=>(
              <IconeNavegacional href={icon.href} imgUrl={icon.imgUrl} categoryName={icon.categoryName} />
            ))}
          </ul>
        </div>

        <div className='flex justify-between align-bottom px-4 re1:px-0'>
          <label className='w-[45%]' ref={filterLabel}>
            <span>Filtro</span>
            <FiltroMob filters={filters}/>
          </label>
          <label className='focus-within:text-primary w-[45%] re1:w-auto'>
            <span>Ordenar Por:</span>
            <select className="text-white !outline-none select bg-transparent border border-white focus:bg-[#1e1e1e] w-full max-w-xs"
              onInput={(event)=>{
                setOrder((event.target as HTMLSelectElement).value)
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
          <ul ref={listFiltersDesk} className='w-[22%] re1:flex flex-col hidden'>
            {filters.map(filtro=><Filtro title={filtro.label} values={filtro.values} />)}
          </ul>

          <div className='w-full re1:w-[70%] px-4 re1:px-0'>
            <div className='grid grid-cols-4 gap-x-4'>
              {products.length ? products.map((product:any) =><p>{product.items[0].sellers[0].commertialOffer.Price}</p>)
                : 'Não tem produtos com esta combinação de filtros'}
            </div>

            {fetchLength>=20 && 
            <button className='w-full re1:w-[70%] bg-primary px-[15px] py-[20px] rounded-lg' onClick={()=>{
              if(fetchLength===20){
                const {from,to}=fromTo
                setFromTo({from:from+20, to:to+20})
              }
            }}>Carregar mais Produtos</button>}
          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default pagDepartamento