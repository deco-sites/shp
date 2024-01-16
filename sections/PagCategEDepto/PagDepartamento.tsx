// deno-lint-ignore-file no-window-prefix no-explicit-any
import { useEffect, useState, useRef } from 'preact/hooks'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx'
import FiltroMob from 'deco-sites/shp/sections/PagCategEDepto/FiltroMob.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardVtexProdType.tsx'
import PriceFilter from 'deco-sites/shp/sections/PagCategEDepto/PriceFilter.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import CompareContextProvider, {useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { signal } from '@preact/signals'

export interface Props{
  titleCategoria?:string
  /**@description separe os ids por barra caso seja uma categoria ex: IdDep/IdCateg */
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

const fetchFilters=async (idCateg:string)=>await invoke['deco-sites/shp'].loaders.getFacetsByCategId({categoryId:idCateg})

const fetchProducts=async (queryString:string)=>await invoke['deco-sites/shp'].loaders.getProductsSearchAPI({queryString})

const replaceClasses=(desc:string)=>{
  let string=desc
  //removendo butão de fecha e vermais
  string=string.replace('<span class="buttonText verMais"> <span class="verMais">Ver mais</span> <span class="fechar">Fechar</span> </span>','')

  string=string.replaceAll('text-categoriaSeo','mb-[20px] font-normal font-sans')

  string=string.replaceAll('<h2>','<h2 class="font-black text-xl text-primary m-0 flex leading-loose">')

  string=string.replaceAll('<h3>','<h3 class="font-medium text-2xl leading-loose flex m-0">')

  string=string.replaceAll('<a','<a class="text-primary hover:text-secondary"')

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
  Slug?:string
}

const selectedFiltersSignal=signal<Array<{fq:string, value:string}>>([])

const LimparFiltros=({filters}:{filters:Array<{fq:string, value:string}>})=>{
  const [open,setOpen]=useState(true)
  const [selectedFilters, setSelectedFilters]=useState<Array<{fq:string, value:string}>>([])

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

export const PagDepartamento=({bannerUrl, descText, idsDeCategoria, seoText, titleCategoria='', iconesNavegacionais}:Props)=>{
  const [hideDescSeo,setHideDescSeo]=useState(true)
  const [loading, setLoading]=useState(true)
  const [isMobile, setIsMobile]=useState(window.innerWidth<=768)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:19})
  const [order,setOrder]=useState('selecione')
  const [filters,setFilters]=useState<FilterObj[]>([])
  const [selectedFilters,setSelectedFilters]=useState<Array<{fq:string, value:string}>>([])
  const [products, setProducts]=useState<any>([])
  const [fetchLength, setFetchLength]=useState(0)
  const [divFlut, setDivFlut]=useState(false)
  const [showMore, setShowMore]=useState(false)
  const [path,setPath]=useState<string[]>([titleCategoria])
  const [prodsResources, setProdsResources]=useState('')

  const {PCs, removeAll}=useCompareContext()


  const filterLabel=useRef<HTMLLabelElement>(null)

  const listFiltersDesk=useRef<HTMLUListElement>(null)

  const divFlutLabel=useRef<HTMLLabelElement>(null)

  const contentWrapper=useRef<HTMLDivElement>(null)

  const getProductsStartY=()=>{
    if(filterLabel.current){
      const filterLabelRect=filterLabel.current.getBoundingClientRect()
      const posY=filterLabelRect.top + window.scrollY
      return posY
    }else{
      return 700
    }
  }

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
        window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
      })
    })

    const ulMob=filterLabel.current && filterLabel.current.querySelector('dialog ul')
    const ulDivFlut=divFlutLabel.current && divFlutLabel.current.querySelector('dialog ul')
    const btnFilter=filterLabel.current && filterLabel.current.querySelector('dialog button#filtrar')
    const btnDivFlut=divFlutLabel.current && divFlutLabel.current.querySelector('dialog button#filtrar')

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
      isMobile && window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
    })

    btnDivFlut && (btnDivFlut as HTMLButtonElement).addEventListener('click',()=>{
      const inputsChecked:HTMLInputElement[]=Array.from(ulDivFlut!.querySelectorAll('input:checked'))
      const filtersSelected:Array<{fq:string, value:string}> =[]
      inputsChecked.forEach(input=>{
        filtersSelected.push({fq:input.getAttribute('data-fq')!, value:input.value})
      })

      const minInput=ulDivFlut!.querySelector('input[name="min"]') as HTMLInputElement
      const maxInput=ulDivFlut!.querySelector('input[name="max"]') as HTMLInputElement

      if(minInput.value.length!==0 && maxInput.value.length!==0){
        const value=encodeURI(`[${minInput.value} TO ${maxInput.value}]`)
        const fq='P'
        filtersSelected.push({fq , value})
      }

      setSelectedFilters(filtersSelected)
      isMobile && window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
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

      window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
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

    const header=document.querySelector('body div.z-10.fixed')
    header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,.8)')

    const handleScroll=()=>{
      //header opacity
      if(window.scrollY > initialScrollY && !scrolledDown){
        header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,1)')
        scrolledDown=true
      }else if(window.scrollY <= initialScrollY && scrolledDown){
        header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,.8)')
        scrolledDown=false
      }

      //divFlut
      if(contentWrapper.current){
        const contentRect=contentWrapper.current.getBoundingClientRect()
        const endContent=contentRect.bottom + window.scrollY
        if(window.scrollY > getProductsStartY() && window.scrollY < endContent){
          setDivFlut(true)
        }else{
          divFlutLabel.current && ((divFlutLabel.current.querySelector('dialog') as HTMLDialogElement).open!==true && setDivFlut(false))
        }
      }
    }

    (async()=>{
      const pageData=await fetchFilters(idsDeCategoria)
      const priceFilters=pageData!.PriceRanges.map((obj:SpecObj)=>{
        const slugSplittado=obj.Slug!.split('-')
        const finalValue=encodeURI(`[${slugSplittado[1]} TO ${slugSplittado[3]}]`)
        obj.Value=finalValue
        obj.Map='P'
        return obj
      })

      const dataFilters:Record<string,SpecObj[]> ={'Marcas': pageData!.Brands,...pageData!.SpecificationFilters, 'Faixa de Preço': priceFilters}

      const arrFilterObj:FilterObj[]=[]

      for(const key in dataFilters){
        arrFilterObj.push({label:key , values:dataFilters[key]})
      }

      setFilters(arrFilterObj)
    })()
    
    const handleResize=()=>{
      setIsMobile(window.innerWidth<=768)
    }

    if(typeof window !== 'undefined'){
      const Path=window.location.pathname
      const segments=Path.split('/')
      const result=segments.map((__,index)=>index!==0 ? segments.slice(0,index+1).join('/') : '/')
      console.log(result)
      setPath(result)
    }

    window.addEventListener('scroll',handleScroll)
    window.addEventListener('resize',handleResize)

    return()=>{
      window.removeEventListener('scroll',handleScroll)
      window.removeEventListener('resize',handleResize)
    }
  },[])

  useEffect(()=>{filters.length && addFilterListeners()},[filters])

  const handleMoreProducts=async()=>{
    !showMore && setLoading(true)
    const fqsFilter=selectedFilters.map(obj=>obj.fq==='b' ? `ft=${obj.value}` : `fq=${obj.fq}:${obj.value}`)
    const queryString=[`fq=C:/${idsDeCategoria}/`,...fqsFilter,`_from=${fromTo.from}&_to=${fromTo.to}`]
    order!=='selecione' && queryString.push(`O=${order}`)
    const data= await fetchProducts(queryString.join('&'))
    if(data){
      setFetchLength(data.products.length)
      fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data.products]) : setProducts(data.products)
      setProdsResources(data.productsResources?.split('/').pop() ?? '')
      setLoading(false)
      setShowMore(false)
    }
  }

  useEffect(()=>{setSelectedFilters(selectedFiltersSignal.value)},[selectedFiltersSignal.value])

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})
    const filterValues=selectedFilters.map(filter=>filter.value)
    const filterFqs=selectedFilters.map(filter=>filter.fq)
    
    Array.from(document.querySelectorAll('input#filter')).forEach((input)=>{
      const Input=input as HTMLInputElement
      (filterValues.includes(Input.value) && filterFqs.includes(Input.getAttribute('data-fq')!))? (Input.checked=true) : (Input.checked=false)
    })

    PCs.length && removeAll()
  },[selectedFilters])

  useEffect(()=>{
    typeof window!=='undefined' && handleMoreProducts()
  },[fromTo])

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})

    Array.from(document.querySelectorAll(`select#order`)).forEach((input)=>(input as HTMLInputElement).value=order)

    PCs.length && removeAll()
  },[order])

  return(
    <>
      <div className='w-full text-secondary appearance-none'>
        <div className='absolute top-28 z-[-1] '>
          <Image src={bannerUrl} width={1920} height={1080}  decoding='async' loading='eager'
            fetchPriority='high' preload 
          />
        </div>
        <div ref={contentWrapper} className='re1:px-[5%] re4:px-[15%]'>
          <div className='my-5 re1:my-[60px] px-4 re1:px-0 breadcrumbs'>
            <ul>{path.map((path,index,self)=>{
              if(index===0){
                return <li><a className='underline' href='/'>Home</a></li>
              }else if(index===self.length-1){
                return <li><a className='font-bold' href={path}>{titleCategoria}</a></li>
              }else{
                return <li><a className='underline capitalize' href={path}>{path.split('/').pop()?.replaceAll('-',' ')}</a></li>
              }
            })}</ul>
          </div>
          <div className='bg-transparent px-4 re1:px-0'>
            <h4 className='text-3xl font-bold'>{titleCategoria}</h4>
            <div className='max-w-full re1:max-w-[40%] my-[50px] text-xl' dangerouslySetInnerHTML={{__html: descText || ''}} />
          </div>

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
              <span className='font-bold hidden re1:block'>Filtros</span>
              <FiltroMob filters={filters} id='menu'/>
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

            <div className='flex flex-col items-center w-full re1:w-[75%] px-4 re1:px-0'>
              {loading ? (<div className='loading loading-spinner loading-lg text-primary my-20'/>) : (
                <>
                  {products.length > 0 ? (
                    <>
                      <div className='grid grid-cols-2 re1:grid-cols-4 gap-x-4 gap-y-4'>
                        {products.map((product:any)=><Card product={product} />)}
                      </div>

                      <div className='text-sm re1:text-base text-center mt-10'>
                        <p>Mostrando <b className='font-bold'>{products.length} de {prodsResources}</b></p>
                        <div className='bg-white w-[220px] re1:w-[360px] h-[8px] rounded-[4px] overflow-hidden'>
                          <div className='h-full bg-primary rounded-[4px] transition-[width] w-0 duration-500 ease-in-out' 
                          style={{width:(100*products.length/parseInt(prodsResources)) + '%'}}/>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className='text-2xl font-bold mx-auto mt-10'>Não há produtos com esta combinação de filtros!</p>
                  )}
                  {fetchLength===20 && 
                  <button className='font-bold w-full re1:w-[70%] bg-primary px-[15px] py-[20px] rounded-lg mx-auto my-6 re1:mb-20 re1:mt-8' onClick={()=>{
                    if(fetchLength===20){
                      const {from,to}=fromTo
                      setShowMore(true)
                      setFromTo({from:from+20, to:to+20})
                    }
                  }}>{showMore ? <div className='loading loading-spinner'/> : 'Carregar mais Produtos'}</button>}
                </>
              )}
            </div>
          </div>
          
          {seoText && (
            <div className='my-10 re1:my-8 px-4 re1:px-0'>
              <button className={`font-bold mb-2 border-b border-b-primary ${hideDescSeo && 'relative top-32 re1:top-28'}`} onClick={()=>setHideDescSeo(!hideDescSeo)}>{hideDescSeo ? 'Ver mais' : 'Fechar'}</button>
              <div className={hideDescSeo ? 'line-clamp-4 max-h-24 re1:max-h-20' : ''} dangerouslySetInnerHTML={{__html: replaceClasses(seoText || '') || ''}} />
            </div>)
          }
        </div>
        <div className={`fixed bottom-0 ${divFlut ? 'flex':'hidden'} re1:hidden justify-between items-end px-4 py-5 bg-base-100`}>
          <label className='w-[45%]' id='divFlut-mob' ref={divFlutLabel}>
            <FiltroMob filters={filters} id='divFlut'/>
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
    </>
  )
}

const finalSection=(props:Props)=>{
  return (
    <CompareContextProvider>
      <PagDepartamento {...props}/>
    </CompareContextProvider>
  )
}

export default finalSection