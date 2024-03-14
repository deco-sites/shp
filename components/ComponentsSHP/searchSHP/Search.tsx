// deno-lint-ignore-file no-explicit-any
import { useState, useEffect, useRef } from 'preact/hooks'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardVtexProdType.tsx'
import { useCompareContext } from "deco-sites/shp/contexts/Compare/CompareContext.tsx"
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import { signal } from '@preact/signals'
import PriceFilter from 'deco-sites/shp/sections/PagCategEDepto/PriceFilter.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import Filtro from './Filtro.tsx'
import FiltroModal from './FiltroModal.tsx'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";
import { VtexTypeToAnalytics } from "deco-sites/shp/FunctionsSHP/ProdsToItemAnalytics.ts";

export interface Props{
  produtos:any
  termo:string
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

interface Category{
  name:string,
  value:string
}

interface FiltroObj{
  label:string
  value:string
}

interface FilterObj{
  label:string
  values:SpecObj[]
}

interface SpecObj{
  Children?:SpecObj[]
  Id?:string
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
  Slug?:string
}

interface SelectedFilter{
  fq:string
  value:string
  name?:string
}

const fetchAllCategs=async()=>await invoke['deco-sites/shp'].loaders.getSubCategories()

const fetchFilters=async (queryString:string)=> await invoke['deco-sites/shp'].loaders.getFacetsQueryString({queryString})

const fetchProducts=async (queryString:string, signal:AbortSignal)=>{
  // não vou poder usar o loader por conta do abort
  const url=`https://api.shopinfo.com.br/Deco/getProductsList.php?${queryString}`
    return await fetch(url,{signal}).then(async (r)=>{
      const resp=r.clone()
      const text=await r.text()
      if(text==='empty'){
        return null
      }else{
        return resp.json()
      }
    }).catch(err=>console.error('Error: ',err))
}

const selectedFiltersSignal=signal<SelectedFilter[]>([])

const LimparFiltros=({filters}:{filters:SelectedFilter[]})=>{
  const [open,setOpen]=useState(true)
  const [selectedFilters, setSelectedFilters]=useState<SelectedFilter[]>([])

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
            }else if(filter.fq==='C'){
              name=decodeURI(filter.name!)
            }else{name=decodeURI(filter.value)}

            return (
              <li className='py-1 px-2'>
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input id='filter' type='checkbox' value={filter.value} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq={filter.fq}
                    onInput={(event:Event)=>{
                      !(event.target as HTMLInputElement).checked && (selectedFiltersSignal.value=selectedFilters.filter((obj:SelectedFilter)=>!(obj.fq===filter.fq && obj.value===filter.value)))
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

const Search=({ produtos, termo, iconesNavegacionais=[] }:Props)=>{

  const [loading, setLoading]=useState(true)
  const [isMobile, setIsMobile]=useState(globalThis.window.innerWidth<=768)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:produtos.length-1,first:1})
  const [order,setOrder]=useState('selecione')
  const [products, setProducts]=useState<any>([])
  const [divFlut, setDivFlut]=useState(false)
  const [fetchLength, setFetchLength]=useState(produtos.length)
  const [showMore, setShowMore]=useState(false)
  const [categories,setCategories]=useState<Category[]>([])
  const [filters,setFilters]=useState<FilterObj[]>([])
  const [selectedFilters,setSelectedFilters]=useState<SelectedFilter[]>([])

  const {PCs, removeAll}=useCompareContext()

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
  const divFlutLabel=useRef<HTMLLabelElement>(null)

  const contentWrapper=useRef<HTMLDivElement>(null)

  const filterLabel=useRef<HTMLLabelElement>(null)

  const listFiltersDesk=useRef<HTMLUListElement>(null)

  const currentController=useRef<AbortController | null>(null)

  const getProductsStartY=()=>{
    if(filterLabel.current){
      const filterLabelRect=filterLabel.current.getBoundingClientRect()
      const posY=filterLabelRect.top + globalThis.window.scrollY
      return posY
    }else{
      return 700
    }
  }

  const handleMoreProducts=async()=>{
    !showMore && setLoading(true)
    const fqsFilter=selectedFilters.map((obj:SelectedFilter)=>obj.fq==='b' ? `ft=${obj.value}` : `fq=${obj.fq}:${obj.value}`)
    const queryString=[`ft=${termo}`,...fqsFilter,`_from=${fromTo.from}&_to=${fromTo.to}`]
    order!=='selecione' && queryString.push(`O=${order}`)

    currentController.current = new AbortController()
    try {
      const data= await fetchProducts(queryString.join('&'), currentController.current.signal)
      if(data){
        setFetchLength(data.length)
        fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data]) : setProducts(data)
        setLoading(false)
        setShowMore(false)
        currentController.current = null // Limpa a referência após a conclusão
      }
    } catch (error) {
        // Verificar se o erro é um erro de aborto
        if (error.name === 'AbortError') {
            console.log('Fetch foi cancelado')
        } else {
            console.error(error)
        }
    }
  }

  const addFilterListeners=()=>{
    const ulDesk=listFiltersDesk.current!

    Array.from(ulDesk.querySelectorAll('input[type="checkbox"]')).forEach((checkbox)=>{
      (checkbox as HTMLInputElement).addEventListener('input',(event)=>{
        const target=(event.target as HTMLInputElement)

        // terget.checked && sendEvent({name:'filter', params:{

        // }})

        setSelectedFilters((prevSelectedFilters:SelectedFilter[]) =>{
          const fq=target.getAttribute('data-fq') as string

          if(fq==='P'){
            return (target.checked) ? 
              [...prevSelectedFilters.filter(filter=>filter.fq!=='P'), {fq, value:target.value, name:target.name}] 
            : 
              [...prevSelectedFilters.filter(obj => obj.value !== target.value).filter(filter=>filter.fq!=='P')]
          }

          return (target.checked) ? [...prevSelectedFilters, {fq,value:target.value, name:target.name}] : [...prevSelectedFilters.filter(obj => obj.value !== target.value)]
        })
        globalThis.window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
      })
    })

    const ulMob=filterLabel.current && filterLabel.current.querySelector('dialog ul')
    const ulDivFlut=divFlutLabel.current && divFlutLabel.current.querySelector('dialog ul')
    const btnFilter=filterLabel.current && filterLabel.current.querySelector('dialog button#filtrar')
    const btnDivFlut=divFlutLabel.current && divFlutLabel.current.querySelector('dialog button#filtrar')

    btnFilter && (btnFilter as HTMLButtonElement).addEventListener('click',()=>{
      const inputsChecked:HTMLInputElement[]=Array.from(ulMob!.querySelectorAll('input:checked'))
      const filtersSelected:SelectedFilter[]=[]
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
      isMobile && globalThis.window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
    })

    btnDivFlut && (btnDivFlut as HTMLButtonElement).addEventListener('click',()=>{
      const inputsChecked:HTMLInputElement[]=Array.from(ulDivFlut!.querySelectorAll('input:checked'))
      const filtersSelected:SelectedFilter[]=[]
      inputsChecked.forEach(input=>{
        filtersSelected.push({fq:input.getAttribute('data-fq')!, value:input.value, name:input.name})
      })

      const minInput=ulDivFlut!.querySelector('input[name="min"]') as HTMLInputElement
      const maxInput=ulDivFlut!.querySelector('input[name="max"]') as HTMLInputElement

      if(minInput.value.length!==0 && maxInput.value.length!==0){
        const value=encodeURI(`[${minInput.value} TO ${maxInput.value}]`)
        const fq='P'
        filtersSelected.push({fq , value})
      }

      setSelectedFilters(filtersSelected)
      isMobile && globalThis.window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
    })

    const btnPriceRange=ulDesk.querySelector('button#priceRange')!
    btnPriceRange.addEventListener('click',()=>{
      const minInput=ulDesk.querySelector('input[name="min"]') as HTMLInputElement
      const maxInput=ulDesk.querySelector('input[name="max"]') as HTMLInputElement

      if(minInput.value.length!==0 && maxInput.value.length!==0){
        const value=encodeURI(`[${minInput.value} TO ${maxInput.value}]`)
        const fq='P'
        setSelectedFilters(prevSelectedFilters=>[...prevSelectedFilters.filter(filter=>filter.fq!=='P'), {fq,value}])
      }else{
        alert('Você precisa preencher os dois campos de preço!')
      }

      globalThis.window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
    })
  }

  useEffect(()=>{
    sendEvent({name:'view_item_list', params:{
      item_list_id: termo,
      item_list_name: 'search page',
      items:VtexTypeToAnalytics(produtos)
    }})

    fetchFilters(`ft=${termo}`).then(async (pageData)=>{
      const priceFilters=pageData!.PriceRanges.map((obj:SpecObj)=>{
        const slugSplittado=obj.Slug!.split('-')
        const finalValue=encodeURI(`[${slugSplittado[1]} TO ${slugSplittado[3]}]`)
        obj.Value=finalValue
        obj.Map='P'
        return obj
      })

      const ALLCATEGS=await fetchAllCategs()

      console.log(ALLCATEGS)

      const categFilters:SpecObj[]=[]

      pageData!.Departments?.forEach((dep:SpecObj)=>{
        const depName=dep.Name

        ALLCATEGS.forEach((categ:any)=>{
          if(categ.name!=='Monte seu pc'){
            if(categ.name===depName){
              dep.Id=`/${categ.id}/`
              dep.Map='C'
              dep.Value=dep.Id
              categFilters.push(dep)
            }else if(categ.hasChildren){
              categ.children.forEach((child1:any)=>{
                if(child1.name===depName){
                  dep.Id=`/${categ.id}/${child1.id}/`
                  dep.Map='C'
                  dep.Value=dep.Id
                  categFilters.push(dep)
                }else if(child1.hasChildren){
                  child1.children.forEach((child2:any)=>{
                    if(child2.name===depName){
                      dep.Id=`/${categ.id}/${child1.id}/${child2.id}/`
                      dep.Map='C'
                      dep.Value=dep.Id
                      categFilters.push(dep)
                    }
                  })
                }
              })
            }
          }
        })
      })

      pageData!.CategoriesTrees.forEach((categ:SpecObj)=>{
        categ.Map='C'
        categ.Value='/'+categ.Id+'/'
        categ.Id='/'+categ.Id+'/'
        categFilters.unshift(categ)
      })

      const categoriesFilters:SpecObj[]=categFilters.reduce((acc:SpecObj[],current:SpecObj)=>{
        if(!acc.some(obj=>obj.Name===current.Name)){
          acc.push(current)
        }
        return acc
      },[])

      const dataFilters:Record<string,SpecObj[]> ={'Categorias': categoriesFilters,'Marcas': pageData!.Brands,...pageData!.SpecificationFilters, 'Faixa de Preço': priceFilters}

      const arrAllCategFiltersObj:FilterObj[]=[]

      const arrFilterObj:FilterObj[]=[]

      for(const key in dataFilters){
        arrAllCategFiltersObj.push({label:key , values:dataFilters[key]})
      }

      const keys=arrAllCategFiltersObj.map(filter=>filter.label)
      const productsFields:FiltroObj[]=[]
      products.forEach((product:any)=>{
        const fields=[]
        for(const key in product){
          if(keys.includes(key)){
            fields.push({label: key, value: product[key][0]})
          }else if(key==='brand'){
            fields.push({label: 'Marcas', value: product[key]})
          }
        }
        productsFields.push(...fields)
      })

      const fieldsFiltrados=productsFields.filter((obj,index,self)=>self.findIndex(o=>o.label===obj.label && o.value===obj.value)===index)
      const filtrosByLabel:Record<string, string[]> =fieldsFiltrados.reduce((acc, obj)=>{
        const {label,value}=obj
        if(!acc[label]) acc[label]=[]
        acc[label].push(value)
        return acc
      },{} as Record<string, string[]>)

      for(const key in dataFilters){
        if(filtrosByLabel[key]){
          const values=dataFilters[key].filter(specObj=>filtrosByLabel[key].includes(specObj.Name))
          arrFilterObj.push({label:key , values})
        }else{
          arrFilterObj.push({label:key , values:dataFilters[key]})
        }
      }

      setFilters(arrFilterObj)
    }).catch(err=>console.error('Error: ',err))

    const handleResize=()=>setIsMobile(globalThis.window.innerWidth<=768)

    const handleScroll=()=>{
      if(contentWrapper.current){
        const contentRect=contentWrapper.current.getBoundingClientRect()
        const endContent=contentRect.bottom + globalThis.window.scrollY
        if(globalThis.window.scrollY > getProductsStartY() && globalThis.window.scrollY < endContent){
          setDivFlut(true)
        }else{
          divFlutLabel.current && ((divFlutLabel.current.querySelector('dialog') as HTMLDialogElement).open!==true && setDivFlut(false))
        }
      }
    }
    
    if(typeof globalThis.window!=='undefined'){setProducts(produtos)}

    globalThis.window.addEventListener('resize',handleResize)
    globalThis.window.addEventListener('scroll',handleScroll)

    return ()=>{
      globalThis.window.removeEventListener('resize', handleResize)
      globalThis.window.removeEventListener('scroll',handleScroll)
    }
  },[])

  useEffect(()=>{
    setLoading(false)
  },[products])

  useEffect(()=>{setSelectedFilters(selectedFiltersSignal.value)},[selectedFiltersSignal.value])

  useEffect(()=>{
    typeof globalThis.window!=='undefined' && setFromTo({from:0, to:19})
    const filterValues=selectedFilters.map(filter=>filter.value)
    const filterFqs=selectedFilters.map(filter=>filter.fq)
    
    Array.from(document.querySelectorAll('input#filter')).forEach((input)=>{
      const Input=input as HTMLInputElement
      (filterValues.includes(Input.value) && filterFqs.includes(Input.getAttribute('data-fq')!))? (Input.checked=true) : (Input.checked=false)
    })

    PCs.length && removeAll()

  },[selectedFilters])

  useEffect(()=>{filters.length && addFilterListeners()},[filters])

  useEffect(()=>{
    if(order!=='selecione'){
      typeof globalThis.window!=='undefined' && setFromTo({from:0, to:19, first:0})
    }

    PCs.length && removeAll()
  },[order])

  useEffect(()=>{
    if(fromTo.first!==1){
      typeof globalThis.window!=='undefined' && ((currentController.current && (currentController.current.abort(), currentController.current=null)),handleMoreProducts())
    }
  },[fromTo])

  return (
    <div className='w-full text-secondary appearance-none'>
      <div ref={contentWrapper} className='re1:px-[5%] re4:px-[15%]'>
        <div className='bg-transparent px-4 re1:px-0 mt-10 re1:mt-14 mb-3 re1:mb-6'>
          <h1 className='text-xl re1:text-3xl'>Sua busca por "<span className='font-bold'>{decodeURI(termo)}</span>"</h1>
        </div>

        <div className='mb-8 re1:mb-0'>
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
            }else if(filter.fq==='C'){
              return (
                <div className='flex gap-1 p-1 border border-secondary rounded-lg justify-between max-h-[80px]'
                  onClick={()=>setSelectedFilters(prevFilters=>
                    prevFilters.filter(filterSelected=>filterSelected.value!==filter.value && filterSelected.fq!==filter.fq)
                  )}
                >
                  <p className='whitespace-nowrap text-xs'>{decodeURIComponent(filter.name!)}</p>
                  <span className='text-primary text-xs my-auto font-bold'>✕</span>
                </div>
              )
            }else{
              return (
                <div className='flex gap-1 p-1 border border-secondary rounded-lg justify-between max-h-[80px]'
                  onClick={()=>setSelectedFilters(prevFilters=>
                    prevFilters.filter(filterSelected=>filterSelected.value!==filter.value && filterSelected.fq!==filter.fq)
                  )}
                >
                  <p className='whitespace-nowrap text-xs'>{decodeURIComponent(filter.value).replaceAll('@dot@','.')}</p>
                  <span className='text-primary text-xs my-auto font-bold'>✕</span>
                </div>
              )
            }
          })}
        </ul>

        <div className='flex justify-between items-end px-4 re1:px-0 my-5'>
          <label className='w-[45%]' ref={filterLabel}>
            <span className='font-bold'>Filtros</span>
            <FiltroModal filters={filters} id='divFlut' categories={categories}/>
          </label>
          <label id='orderBy-top' className='text-sm h-12 re1:h-auto re1:text-base bg-[#111] w-[45%] py-[5px] re1:py-[15px] re1:w-[15%] border border-secondary relative after:border-r after:border-b after:border-r-base-content after:border-b-base-content 
            after:right-[20px] after:top-1/2 after:transform after:-translate-y-1/2 after:absolute after:w-[5px] after:h-[5px] re1:after:w-[10px] re1:after:h-[10px] after:rotate-45'
            onClick={()=>{
              const label= document.querySelector('#orderBy-top') as HTMLLabelElement
              const dropdown = label.querySelector('ul')
              if(dropdown && dropdown.classList.contains('hidden')){
                (label as HTMLLabelElement).classList.add('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
                dropdown?.classList.remove('hidden')
              }else{
                (label as HTMLLabelElement).classList.remove('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
                dropdown?.classList.add('hidden')
              }
            }}
          >
            <span className='font-bold px-[10px] re1:px-[20px]'>Ordenar Por:</span>
            <span className='text-xs line-clamp-1 w-full px-[10px] re1:px-[20px]'>{Object.keys(orderFilters.find(obj=>order===Object.values(obj)[0]) ?? {'Selecione':''})[0]}</span>
            <ul className='hidden z-10 absolute w-full bg-[#111] top-12 re1:top-[unset]'>
              {orderFilters.map(filter => (
                <li 
                  className='p-[10px] bg-[#111] text-white cursor-pointer hover:bg-[#d1d1d1] hover:text-black'
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
            <PriceFilter filtro={filters.find(filter=>filter.label==='Faixa de Preço')}/>
          </ul>

          <div className='flex flex-col items-center w-full re1:w-[70%] px-4 re1:px-0'>
            {loading ? (<div className='loading loading-spinner loading-lg text-primary my-20'/>) : (
              <>
                {products.length > 0 ? (
                  <div className='grid grid-cols-2 re1:grid-cols-4 gap-x-4 gap-y-4'>
                    {products.map((product:any)=><Card product={product} />)}
                  </div>
                ) : (
                  <p className='text-2xl font-bold mx-auto mt-10'>Não há produtos com esta combinação de filtros!</p>
                )}
                {fetchLength===20 && 
                <button className='font-bold w-full re1:w-[70%] bg-primary px-[15px] py-[20px] rounded-lg mx-auto my-6 re1:my-20' onClick={()=>{
                  if(fetchLength===20){
                    const {from,to}=fromTo
                    setShowMore(true)
                    setFromTo({from:from+20, to:to+20})
                    sendEvent({name:'show_more', params:{
                      item_list_id:globalThis.window.location.pathname,
                      item_list_name:termo
                    }})
                  }
                }}>{showMore ? <div className='loading loading-spinner'/> : 'Carregar mais Produtos'}</button>}
              </>
            )}
          </div>
        </div>   
      </div>
      <div className={`fixed bottom-0 ${divFlut ? 'flex':'hidden'} re1:hidden w-full justify-between items-end px-4 py-5 bg-base-100`}>
        <label className='w-[45%]' id='divFlut-mob' ref={divFlutLabel}>
          <FiltroModal filters={filters} id='divFlut' categories={categories}/>
        </label>
        <label id='orderBy-bot' className='text-sm h-12 re1:h-auto re1:text-base bg-[#111] w-[45%] py-[5px] re1:py-[15px] re1:w-[15%] border border-secondary relative after:border-r after:border-b after:border-r-base-content after:border-b-base-content 
            after:right-[20px] after:top-1/2 after:transform after:-translate-y-1/2 after:absolute after:w-[5px] after:h-[5px] re1:after:w-[10px] re1:after:h-[10px] after:rotate-45'
            onClick={()=>{
              const label= document.querySelector('#orderBy-bot') as HTMLLabelElement
              const dropdown = label.querySelector('ul')
              if(dropdown && dropdown.classList.contains('hidden')){
                (label as HTMLLabelElement).classList.add('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
                dropdown?.classList.remove('hidden')
              }else{
                (label as HTMLLabelElement).classList.remove('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
                dropdown?.classList.add('hidden')
              }
            }}
          >
          <ul className='hidden z-10 absolute w-full bg-[#111] bottom-12'>
            {orderFilters.map(filter => (
              <li 
                className='p-[10px] bg-[#111] text-white cursor-pointer hover:bg-[#d1d1d1] hover:text-black'
                onClick={() => setOrder(Object.values(filter)[0])}
              >
                {Object.keys(filter)[0]}
              </li>
            ))}
          </ul>
          <span className='font-bold px-[10px] re1:px-[20px]'>Ordenar Por:</span>
          <span className='text-xs line-clamp-1 w-full px-[10px] re1:px-[20px]'>{Object.keys(orderFilters.find(obj=>order===Object.values(obj)[0]) ?? {'Selecione':''})[0]}</span>
        </label>
      </div>
    </div>
  )
}

export default Search