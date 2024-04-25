// deno-lint-ignore-file no-explicit-any
import { useEffect, useState, useRef } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Filtro from './Filtro.tsx'
import FiltroMob from './FiltroMob.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import PriceFilter from './PriceFilter.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import CompareContextProvider, {useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { signal } from '@preact/signals'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx'
import { OrgSchemaToAnalytics } from "deco-sites/shp/FunctionsSHP/ProdsToItemAnalytics.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";
import { LoaderReturnType, SectionProps } from "deco/types.ts";
import gamesCollections from 'deco-sites/shp/static/gamesCollection.json' with { type: "json" }
import removeDot from "deco-sites/shp/FunctionsSHP/removeDOTFromFilters.ts";
import { Product } from "apps/commerce/types.ts";

export interface Props{
  bannerUrl:string
  /**@description Não Preencher */
  descontoPix:number
  /**@description Filtro de Jogos */
  Jogos:boolean
  collectionId:string
  produtos: LoaderReturnType<Product[] | null>
}

const fetchFilters=async (queryString:string)=>await invoke['deco-sites/shp'].loaders.getFacetsQueryString({queryString})

const getBrands=async()=>{
  const url=`https://api.shopinfo.com.br/Deco/getBrands.php`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

interface Game{
  Name:string,
  '60FPS':string,
  '144FPS':string
}

interface FilterObj{
  label:string
  values:string[]
}

interface SpecObj{
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
  Slug?:string
}

interface FiltroObj{
  label:string
  value:string
}

const selectedFiltersSignal=signal<Array<{fq:string|null, value:string}>>([])

const LimparFiltros=({filters}:{filters:Array<{fq:string|null, value:string}>})=>{
  const [open,setOpen]=useState(true)
  const [selectedFilters, setSelectedFilters]=useState<Array<{fq:string|null, value:string}>>([])

  useEffect(()=>{
    setSelectedFilters(filters)
  },[filters])

  if(!filters.length) return null

  return(
    <div className='w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0'>
      <div className='flex flex-col gap-2 px-3 py-5'>
        <h5 className='flex justify-between cursor-pointer'
          onClick={()=>setOpen(!open)}
        >
          Filtrado por:
          <Icon 
            id={open ? 'ChevronUp' : 'ChevronDown'}
            size={12}
            strokeWidth={2}
          />
        </h5>
        <p className='underline text-sm ml-auto cursor-pointer hover:text-primary' onClick={()=>{selectedFiltersSignal.value=[]}}>Limpar filtros</p>
      </div>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <ul className={`flex flex-col gap-2 bg-[#141414] overflow-y-auto max-h-[300px] re1:scrollbar-shp`}>
          {filters.map(filter=>{
            let name=''

            if(filter.fq==='P'){
              const decoded=decodeURI(filter.value).split('')
              decoded.pop()
              decoded.shift()

              const [min,max]=decoded.join('').split(' TO ')

              name=`${parseFloat(min).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} - ${parseFloat(max).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`
            }else if(filter.fq==='productClusterIds'){
              const games:Record<string, Game> = {
                ...gamesCollections
              }

              Object.keys(games).forEach(gameKey=>{
                const game=games[gameKey]
                if(game['60FPS']===filter.value){
                  name=game.Name+' 60fps'
                }else if(game['144FPS']===filter.value){
                  name=game.Name+' 144fps'
                }
              })
              
            }else{name=decodeURI(filter.value)}

            return (
              <li className='py-1 px-2'>
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input id='filter' type='checkbox' value={filter.value} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq={filter.fq}
                    onInput={(event:Event)=>{
                      !(event.target as HTMLInputElement).checked && (selectedFiltersSignal.value=selectedFilters.filter(obj=>!(obj.fq===filter.fq && obj.value===filter.value)))
                    }}
                  />
                  <span className='text-sm'>{name}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export const PagDepartamento=({ bannerUrl, collectionId, Jogos, descontoPix, produtos }:Props)=>{
  const [loading, setLoading]=useState(true)
  const [order,setOrder]=useState('selecione')
  const [filters,setFilters]=useState<FilterObj[]>([])
  const [selectedFilters,setSelectedFilters]=useState<Array<{fq:string|null, value:string}>>([])
  const [products, setProducts]=useState<Product[]>(produtos ?? [])
  const [brands,setBrands]=useState<any>([])
  const [sentEvent, setSentEvent]=useState(false)

  const {PCs, removeAll}=useCompareContext()

  const orderLabel=useRef<HTMLLabelElement>(null)

  const filterLabel=useRef<HTMLLabelElement>(null)

  const listFiltersDesk=useRef<HTMLUListElement>(null)

  const addFilterListeners=()=>{
    const ulDesk=listFiltersDesk.current!

    Array.from(ulDesk.querySelectorAll('input[type="checkbox"]')).forEach((checkbox)=>{
      (checkbox as HTMLInputElement).addEventListener('input',(event)=>{
        const target=(event.target as HTMLInputElement)
        setSelectedFilters(prevSelectedFilters =>{
          const fq=target.getAttribute('data-fq') as string

          if(fq==='P'){
            return (target.checked) ? 
              [...prevSelectedFilters.filter(filter=>filter.fq!=='P'), {fq,value:target.value}] 
            : 
              [...prevSelectedFilters.filter(obj => obj.value !== target.value).filter(filter=>filter.fq!=='P')]
          }

          return (target.checked) ? [...prevSelectedFilters, {fq,value:target.value}] : [...prevSelectedFilters.filter(obj => obj.value !== target.value)]
        })
      })
    })

    const ulMob=filterLabel.current && filterLabel.current.querySelector('dialog ul')
    const btnFilter=filterLabel.current && filterLabel.current.querySelector('dialog button#filtrar')

    btnFilter && (btnFilter as HTMLButtonElement).addEventListener('click',()=>{
      const inputsChecked:HTMLInputElement[]=Array.from(ulMob!.querySelectorAll('input:checked'))
      const filtersSelected:Array<{fq:string, value:string}> =[]
      inputsChecked.forEach(input=>{
        filtersSelected.push({fq:input.getAttribute('data-fq')!, value:input.value})
      })

      const minInput=ulMob!.querySelector('input[name="min"]') as HTMLInputElement
      const maxInput=ulMob!.querySelector('input[name="max"]') as HTMLInputElement

      if(minInput.value.length!==0 && maxInput.value.length!==0){
        const value=encodeURI(`[${minInput.value} TO ${maxInput.value}]`)
        const fq='P'
        filtersSelected.push({fq , value})
      }

      setSelectedFilters(filtersSelected)     
    })

    // const btnPriceRange=ulDesk.querySelector('button#priceRange')!
    // btnPriceRange.addEventListener('click',()=>{
    //   const minInput=ulDesk.querySelector('input[name="min"]') as HTMLInputElement
    //   const maxInput=ulDesk.querySelector('input[name="max"]') as HTMLInputElement

    //   if(minInput.value.length!==0 && maxInput.value.length!==0){
    //     const value=encodeURI(`[${minInput.value} TO ${maxInput.value}]`)
    //     const fq='P'
    //     setSelectedFilters(prevSelectedFilters=>[...prevSelectedFilters.filter(filter=>filter.fq!=='P'), {fq,value}])
    //   }else{
    //     alert('Você precisa preencher os dois campos de preço!')
    //   }
    // })
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

  // useEffect(()=>{
    // (async()=>{
    //   const pageData=await fetchFilters('productClusterIds:'+collectionId)
    //   const priceFilters=pageData!.PriceRanges.map((obj:SpecObj)=>{
    //     const slugSplittado=obj.Slug!.split('-')
    //     const finalValue=encodeURI(`[${slugSplittado[1]} TO ${slugSplittado[3]}]`)
    //     obj.Value=finalValue
    //     obj.Map='P'
    //     return obj
    //   })

    //   let dataFilters:Record<string,SpecObj[]> ={'Marcas': pageData!.Brands, 'Faixa de Preço': priceFilters}

    //   dataFilters={
    //     ...dataFilters,
    //     ...Object.entries(pageData!.SpecificationFilters).reduce((acc, [key,value])=> ({
    //       ...acc,
    //       [key]:removeDot(value as SpecObj[])
    //     }),{})
    //   }

    //   if(Jogos){
    //     const gamesFilters:SpecObj[]=[]
    //     const games:Record<string, Game> = {
    //       ...gamesCollections
    //     }

    //     for(const game in games){
    //       const commonInfo={
    //         Map:'productClusterIds',
    //         Link:'',
    //         LinkEncoded:'',
    //         Position:null,
    //         Quantity:null
    //       }

    //       gamesFilters.push({
    //         ...commonInfo,
    //         Name: games[game].Name + ' 60fps',
    //         Value: games[game]['60FPS']
    //       })

    //       gamesFilters.push({
    //         ...commonInfo,
    //         Name: games[game].Name + ' 144fps',
    //         Value: games[game]['144FPS']
    //       })
    //     }
    //     dataFilters={'Jogos':gamesFilters, ...dataFilters}
    //   }

    //   const arrFilterObj:FilterObj[]=[]

    //   for(const key in dataFilters){
    //     arrFilterObj.push({label:key , values:dataFilters[key]})
    //   }

    //   setFilters(arrFilterObj)
    // })()

    // getBrands().then(r=>setBrands(r)).catch(err=>console.error('Error: ',err))
  // },[])

  useEffect(()=>{filters.length && addFilterListeners()},[filters])

  // const handleMoreProducts=async()=>{
  //   setLoading(true)
  //   const fqsFilter=selectedFilters.map(obj=>{
  //     if(obj.fq==='b'){
  //       const brandId=brands.find((brand:any)=>brand.name===obj.value)!.id
  //       return `fq=B:${brandId}`
  //     }else{
  //       return `fq=${obj.fq}:${obj.value}`
  //     }
  //   })
  //   const queryString=[`fq=C:/${idsDeCategoria}/`,...fqsFilter,`_from=${fromTo.from}&_to=${fromTo.to}`]
  //   order!=='selecione' && queryString.push(`O=${order}`)
  //   const data= await fetchProducts(queryString.join('&'))
  //   if(data){
  //     setFetchLength(data.products.length)
  //     fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data.products]) : setProducts(data.products)
  //     setProdsResources(data.productsResources?.split('/').pop() ?? '')
  //     setLoading(false)
  //   }
  // }

  useEffect(()=>{
    setSelectedFilters(selectedFiltersSignal.value)
  },[selectedFiltersSignal.value])

  const handleFiltersChange=(selected:Array<{fq:string|null, value:string}>)=>{
    //fq=null é filtragem de spec dos produtos
    //fq='productClusterIds' é fitragem de jogos,dá pra filtrar pela coleção dos produtos
    //fq='P' é filtragem de Preço ai tem q fazer novo request
  }

  useEffect(()=>{
    const filterValues=selectedFilters.map(filter=>filter.value)
    // const filterFqs=selectedFilters.map(filter=>filter.fq)
    
    Array.from(document.querySelectorAll('input#filter')).forEach((input)=>{
      const Input=input as HTMLInputElement
      (filterValues.includes(Input.value) 
        // && filterFqs.includes(Input.getAttribute('data-fq')!)
      )? (Input.checked=true) : (Input.checked=false)
    })

    

    PCs.length && removeAll()
  },[selectedFilters])

  useEffect(()=>{
    Array.from(document.querySelectorAll(`select#order`)).forEach((input)=>(input as HTMLInputElement).value=order)

    PCs.length && removeAll()
  },[order])

  const createFiltersBasedInProducts=(products:Product[])=>{
    const excludesKeys=['Imagem do Fabricante', 'Kit Gamer', 'Cabos Inclusos', 'Garantia', 'Sistema Operacional', 'Windows', 'Recomendações', 'Monitor', 'Bloco Descrição']
    
    const productsFields:FiltroObj[]=[]
      products.forEach((product:Product)=>{
        const fields=[]
        for(const addProp of product.isVariantOf?.additionalProperty ?? []){
          if(addProp.valueReference==='SPECIFICATION' && !excludesKeys.includes(addProp.name!)){
            fields.push({label: addProp.name!, value: addProp.value!})
          }
        }
        productsFields.push(...fields)
      })

      console.log(productsFields)

      const fieldsFiltrados=productsFields.filter((obj,index,self)=>self.findIndex(o=>o.label===obj.label && o.value===obj.value)===index)
      const filtrosByLabel:FilterObj[]=fieldsFiltrados.reduce((acc, obj)=>{
        const {label,value}=obj

        !acc.some(filter=>filter.label===label) && acc.push({label, values:[]})
        acc.find(filter=>filter.label===label)?.values.push(value)
        return acc
      },[] as FilterObj[])

      setFilters(filtrosByLabel)
  }

  useEffect(()=>{
    console.log(products)
    if(products.length){
      if(!sentEvent){
        // mandar evento apenas uma vez quando puxar os prods pela primeira vez
        setSentEvent(true)
        sendEvent({name:'view_item_list', params:{
          item_list_id: collectionId,
          item_list_name: 'Compre e Ganhe',
          items:OrgSchemaToAnalytics(products)
        }})
      }
      setLoading(false)
    }
  },[products])

  useEffect(()=>{
    createFiltersBasedInProducts(produtos ?? [])
  },[])

  return(
    <>
      <div className='w-full text-secondary appearance-none'>
        <div className='flex flex-col'>
          <Image src={bannerUrl} width={1920} height={1080}  decoding='async' loading='eager'
            fetchPriority='high' preload 
          />
        </div>
        <div className='re1:px-[5%] re4:px-[15%]'>
          <ul className='flex re1:hidden justify-start items-center gap-4 w-full mb-4 px-4 overflow-x-auto'>
            {selectedFilters.map((filter)=>{
              if(filter.fq==='P'){
                const nameDecoded=decodeURIComponent(filter.value)
                const numbers=nameDecoded.split(' TO ').map((item)=>parseFloat(item.replace(/\D/g, '')).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}))
                return (
                  <div className='flex gap-1 p-1 border border-secondary rounded-lg justify-between max-h-[80px]'
                    onClick={()=>setSelectedFilters(prevFilters=>
                      prevFilters.filter(filterSelected=>filterSelected.value!==filter.value && filterSelected.fq!==filter.fq)
                    )}
                  >
                    <p className='whitespace-nowrap text-xs'>{numbers.join(' - ')}</p>
                    <span className='text-primary text-xs my-auto font-bold'>✕</span>
                  </div>
                )
              }else if(filter.fq==='productClusterIds'){
                const games:Record<string, Game> = {
                  ...gamesCollections
                }

                let fps=''
  
                const GameKey=Object.keys(games).find(gameKey=>{
                  const game=games[gameKey]

                  const checkGameKey=(FPS:string)=>{
                    const typeFPS:'60FPS' | '144FPS'=`${FPS==='60' ? '60' : '144'}FPS`

                    if(game[typeFPS]===filter.value){
                      fps=FPS+'fps'
                      return true
                    }
                    return false
                  }
  
                  return checkGameKey('60') || checkGameKey('144')
                })!

                return(
                  <div className='flex gap-1 p-1 border border-secondary rounded-lg justify-between max-h-[80px]'
                    onClick={()=>{
                      selectedFiltersSignal.value=selectedFilters.filter(obj=>!(obj.fq===filter.fq && obj.value===filter.value)
                      )}
                    }
                  >
                    <p className='whitespace-nowrap text-xs'>{games[GameKey].Name + ' ' + fps}</p>
                    <span className='text-primary text-xs my-auto font-bold'>✕</span>
                  </div>
                )
              }else{
                return (
                  <div className='flex gap-1 p-1 border border-secondary rounded-lg justify-between max-h-[80px]'
                    onClick={()=>setSelectedFilters(prevFilters=>{
                      // console.log('prevFilters', prevFilters)
                      return prevFilters.filter(filterSelected=>filterSelected.value!==filter.value && filterSelected.fq!==filter.fq)
                      }
                    )}
                  >
                    <p className='whitespace-nowrap text-xs'>{decodeURIComponent(filter.value).replaceAll('@dot@','.')}</p>
                    <span className='text-primary text-xs my-auto font-bold'>✕</span>
                  </div>
                )
              }
            })}
          </ul>
          
          <div className='flex justify-between items-center px-4 re1:px-0 my-5'>
            <label className='w-[45%] re1:w-[100px]' ref={filterLabel}>
              <span className='font-bold hidden re1:flex items-center'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_278_2979)">
                  <path d="M1.26587 3.363H8.63824C8.86849 4.4265 9.81562 5.226 10.947 5.226C12.0784 5.226 13.0255 4.4265 13.2557 3.363H14.7341C15.0102 3.363 15.2341 3.13912 15.2341 2.863C15.2341 2.58687 15.0102 2.363 14.7341 2.363H13.2557C13.0255 1.2995 12.0784 0.5 10.947 0.5C9.81562 0.5 8.86849 1.2995 8.63824 2.363H1.26587C0.989744 2.363 0.765869 2.58687 0.765869 2.863C0.765869 3.13912 0.989744 3.363 1.26587 3.363ZM10.947 1.5C11.6986 1.5 12.31 2.1115 12.31 2.863C12.31 3.6145 11.6985 4.226 10.947 4.226C10.1955 4.226 9.58399 3.6145 9.58399 2.863C9.58399 2.1115 10.1954 1.5 10.947 1.5Z" fill="#DD1F26"/>
                  <path d="M14.7341 7.49996H7.36174C7.13149 6.43646 6.18437 5.63696 5.05299 5.63696C3.92162 5.63696 2.97449 6.43646 2.74424 7.49996H1.26587C0.989744 7.49996 0.765869 7.72384 0.765869 7.99996C0.765869 8.27609 0.989744 8.49996 1.26587 8.49996H2.74424C2.97449 9.56346 3.92162 10.363 5.05299 10.363C6.18437 10.363 7.13149 9.56346 7.36174 8.49996H14.7341C15.0102 8.49996 15.2341 8.27609 15.2341 7.99996C15.2341 7.72384 15.0102 7.49996 14.7341 7.49996ZM5.05299 9.36296C4.30137 9.36296 3.68999 8.75146 3.68999 7.99996C3.68999 7.24846 4.30149 6.63696 5.05299 6.63696C5.80449 6.63696 6.41599 7.24834 6.41599 7.99996C6.41599 8.75159 5.80462 9.36296 5.05299 9.36296Z" fill="#DD1F26"/>
                  <path d="M14.7341 12.637H13.2557C13.0255 11.5735 12.0784 10.774 10.947 10.774C9.81562 10.774 8.86849 11.5735 8.63824 12.637H1.26587C0.989744 12.637 0.765869 12.8609 0.765869 13.137C0.765869 13.4132 0.989744 13.637 1.26587 13.637H8.63824C8.86849 14.7005 9.81562 15.5 10.947 15.5C12.0784 15.5 13.0255 14.7005 13.2557 13.637H14.7341C15.0102 13.637 15.2341 13.4132 15.2341 13.137C15.2341 12.8609 15.0102 12.637 14.7341 12.637ZM10.947 14.5C10.1954 14.5 9.58399 13.8885 9.58399 13.137C9.58399 12.3855 10.1955 11.774 10.947 11.774C11.6985 11.774 12.31 12.3855 12.31 13.137C12.31 13.8885 11.6986 14.5 10.947 14.5Z" fill="#DD1F26"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_278_2979">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <p className='pl-[10px]'>Filtros</p>
              </span>
              <FiltroMob filters={filters} id='menu'/>
            </label>
            <label ref={orderLabel} data-open={false} className='w-[175px] font-bold relative'
              onClick={()=>{
                const OrderLabel=orderLabel.current

                if(OrderLabel){
                  const seta=OrderLabel.querySelector('#seta')
                  const list=OrderLabel.querySelector('ul')

                  if(OrderLabel.getAttribute('data-open')==='true'){
                    seta?.classList.remove('rotate-180')
                    list?.classList.add('hidden')
                    OrderLabel.setAttribute('data-open','false')
                  }else{
                    seta?.classList.add('rotate-180')
                    list?.classList.remove('hidden')
                    OrderLabel.setAttribute('data-open','true')
                  }
                }
              }}
            >
              <div className='flex justify-center items-center w-full'>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-[16px] min-h-[14px]'>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.692 12.4778C11.1532 12.4778 11.527 12.104 11.527 11.6429V6.42777C11.527 5.93757 12.1198 5.69227 12.4662 6.03912L13.5552 7.12977C13.8856 7.46062 14.4216 7.46082 14.7522 7.13022C15.0785 6.80387 15.0831 6.27617 14.7625 5.94422L10.0164 1.03047C9.95766 0.969721 9.85706 1.01477 9.85706 1.09487V11.6429C9.85706 12.104 10.2309 12.4778 10.692 12.4778ZM12.527 11.6429C12.527 12.6563 11.7055 13.4778 10.692 13.4778C9.67861 13.4778 8.85706 12.6563 8.85706 11.6429V1.09487C8.85706 0.112222 10.053 -0.371028 10.7357 0.335772L15.4817 5.24947C16.1814 5.97382 16.1714 7.12522 15.4593 7.83732C14.738 8.55862 13.5684 8.55822 12.8476 7.83637L12.527 7.51527V11.6429Z" fill="#DD1F26"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.2315 1.00098C4.7821 1.00098 4.41775 1.36528 4.41775 1.81473V7.04963C4.41775 7.54198 3.8205 7.78628 3.47545 7.43513L2.40535 6.34618C2.084 6.01913 1.56595 6.01893 1.24435 6.34573C0.922609 6.67268 0.917935 7.20468 1.23425 7.53748L5.9049 12.4512C5.96265 12.5119 6.0452 12.455 6.0452 12.3839L6.04525 1.81473C6.04525 1.36528 5.6809 1.00098 5.2315 1.00098ZM3.41775 1.81473C3.41775 0.813026 4.2298 0.000976562 5.2315 0.000976562C6.2332 0.000976562 7.04525 0.813026 7.04525 1.81473L7.0452 12.3839C7.0452 13.3512 5.86745 13.8633 5.1801 13.1402L0.509465 8.22643C-0.17825 7.50293 -0.168591 6.35583 0.531604 5.64433C1.24515 4.91923 2.4056 4.91963 3.11865 5.64528L3.41775 5.94968V1.81473Z" fill="#DD1F26"/>
                </svg>

                <span className='text-sm line-clamp-1 re1:w-full px-[10px] text-center'>{Object.keys(orderFilters.find(obj=>order===Object.values(obj)[0]) ?? {'Ordenar Por':''})[0]}</span>
                
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" id="seta" className='min-w-[14px]'>
                  <rect width="14" height="8" fill="url(#pattern0_78_481)"/>
                  <defs>
                  <pattern id="pattern0_78_481" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_78_481" transform="matrix(0.0714286 0 0 0.125 -2.57143 -2.875)"/>
                  </pattern>
                    <image id="image0_78_481" width="167" height="668" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAKcCAMAAAC66lqZAAAC/VBMVEUAAACCgoKVXl/////dHyaBgYH///+CgoKBgYGCgoL////bHyb////////////9/f3///+CgoL///7///+BgYHs7Oz///////8RERH49/XdHyUNDQvp6efdHyaEg4L////dHyb////cHiT///////+CgoL///////+/vrtKSkqCgoL///8bGxseHh7////40m3////Yn0QwhMKwjUUgICD////PqFOmgD7///+OttmCgoK0t7q7mlDWtmGZdDSIZzaRElLdHiaxs7TGlEC+wb7////g4OC1tbXZ2dnh4eEfHx/////////u4rD///96Vivw25YcHByRElL////g4OD////f39/owXPFq2j///////+RElImeb7///////9Nd6j////dHyb///////+6vsHz8/Nubm7////bqE375ajVoktlRBncqE/////////h4eH71nP756ySElPOzs7+88u4ubl1dXWlpaQbg8cnbLPVokv///+CgoLdHyYSEhDi4uIfHx8rKyqQEVFVVVRCQkH8+/oBYa//EyoBn+D8py3rGCkBPoJfX15paGgXic0Rl9fy9/l2dnb834oic7o3NjY3rONKSkn72nYdf8TS09Ihp+DZ2dn96avv7O19yfDKysrS6/jj8fn+67nuyWkBuAK/5vf85Z5tw+398vGfn57pvFwA0gCKzvFYvOrUorqu3PPB1+kAxQCXJVsAmwEAqgBHt+j//Lv/+t7hrk//6X/kwtLR3+1Ejsea2/PDgJ+bx+Xr0d3ZwXm1Yor/eg6yz+cA3gDcssbMkq75hY/97cz/9pSuVIBlvnGOjo6dOGr7t727b5OnRXVfnc7/5ebq0X0jWpRZrGT8v1v9zM+qsKv6N0Z1q9X+xoT/pgL5eioB7ACzuLWQf1/6oKj+1KH3Z3OmlW/ezZKDocL4UV+Jv+L72t9lga29rYVlUkE8Hhq9N1Nart3NvpGtwdfxSir9qWMYoSY8bJ6T0KBAtEj+kj2aGSb45AIWvSlyEhy5qQJmlj2yAAAAe3RSTlMA5Q9A3h/zwWSbfyHfvyERYX8uoz47sG8bC79hG4MskWVMQelWsdKJNOfSy0HCBv52/vv74pz++zn9UEn9/v35QJ9f/P7tonNexYRnqv0n+vmi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"/>
                  </defs>
                </svg>

              </div>

              <ul className='hidden z-10 absolute w-full re1:w-[175px] bg-[#4C4C4C] top-10 text-sm'>
                {orderFilters.map(filter => (
                  <li 
                    className='p-[10px] bg-transparent text-white cursor-pointer hover:bg-[#666]'
                    onClick={() => setOrder(Object.values(filter)[0])}
                  >
                    {Object.keys(filter)[0]}
                  </li>
                ))}
              </ul>
            </label>
          </div>

          <div className='flex w-full justify-between'>
            <ul id='filtros-desk' ref={listFiltersDesk} className='w-[22%] re1:flex flex-col hidden'>
              <LimparFiltros filters={selectedFilters}/>
              {filters.map(filtro=>filtro.label!=='Faixa de Preço' && (<Filtro title={filtro.label} values={filtro.values} />))}
              {/* <PriceFilter filtro={filters.find(filter=>filter.label==='Faixa de Preço')}/> */}
            </ul>

            <div className='flex flex-col items-center w-full re1:w-[75%] px-4 re1:px-0'>
              {loading ? (<div className='loading loading-spinner loading-lg text-primary my-20'/>) : (
                <>
                  {products.length > 0 ? (
                    <div className='grid grid-cols-2 re1:grid-cols-4 gap-x-4 gap-y-4'>
                      {products.map((product:any)=><Card product={product} descontoPix={descontoPix}/>)}
                    </div>
                  ) : (
                    <p className='text-2xl font-bold mx-auto mt-10'>Não há produtos com esta combinação de filtros!</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const loader = (props: Omit<Props, 'descontoPix'>, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

const finalSection=(props:SectionProps<typeof loader>)=>{
  return (
    <CompareContextProvider descontoPix={props.descontoPix}>
      <PagDepartamento {...props}/>
    </CompareContextProvider>
  )
}

export default finalSection
