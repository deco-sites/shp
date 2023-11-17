// deno-lint-ignore-file no-window-prefix no-explicit-any
import { useEffect, useState, useRef } from 'preact/hooks'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx'
import FiltroMob from 'deco-sites/shp/sections/PagCategEDepto/FiltroMob.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardVtexProdType.tsx'
import PriceFilter from 'deco-sites/shp/sections/PagCategEDepto/PriceFilter.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'

export interface Props{
  fqName:string
  fqValue:string
  termo:string
  produtos:any
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

const fetchFilters=async (idCateg:string)=> await invoke['deco-sites/shp'].loaders.getFacetsByCategId({categoryId:idCateg})

const fetchProducts=async (queryString:string)=>await invoke['deco-sites/shp'].loaders.getProductsSearchAPI({queryString})

const getBrands=async()=>{
  const url=`https://api.shopinfo.com.br/Deco/getBrands.php`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
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

interface FiltroObj{
  label:string
  value:string
}

const SearchSub=({ iconesNavegacionais, produtos, fqValue, fqName, termo }:Props)=>{
  const [loading, setLoading]=useState(true)
  const [isMobile, setIsMobile]=useState(window.innerWidth<=768)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:19})
  const [order,setOrder]=useState('selecione')
  const [filters,setFilters]=useState<FilterObj[]>([])
  const [selectedFilters,setSelectedFilters]=useState<Array<{fq:string, value:string}>>([])
  const [products, setProducts]=useState<any>(produtos)
  const [fetchLength, setFetchLength]=useState(0)
  const [divFlut, setDivFlut]=useState(false)
  const [showMore, setShowMore]=useState(false)
  const [brands,setBrands]=useState<any>([])

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

    const header=document.querySelector('body div.z-30.fixed')
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

    // vou fazer dois requests ao msm tempo
    fetchFilters(fqValue).then(pageData=>{
      const priceFilters=pageData!.PriceRanges.map((obj:SpecObj)=>{
        const slugSplittado=obj.Slug!.split('-')
        const finalValue=encodeURI(`[${slugSplittado[1]} TO ${slugSplittado[3]}]`)
        obj.Value=finalValue
        obj.Map='P'
        return obj
      })

      const dataFilters:Record<string,SpecObj[]> ={'Marcas': pageData!.Brands,...pageData!.SpecificationFilters, 'Faixa de Preço': priceFilters}

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

    getBrands().then(r=>setBrands(r)).catch(err=>console.error('Error: ',err))
    
    //aqui eu acabo os request sendo tratados independetementes

    const handleResize=()=>{
      setIsMobile(window.innerWidth<=768)
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
    const fqsFilter=selectedFilters.map(obj=>{
      if(obj.fq==='b'){
        const brandId=brands.find((brand:any)=>brand.name===obj.value)!.id
        return `fq=B:${brandId}`
      }else{
        return `fq=${obj.fq}:${obj.value}`
      }
    })
    const queryString=[`fq=C:/${fqValue}/`,...fqsFilter,`ft=${termo}`,`_from=${fromTo.from}&_to=${fromTo.to}`]
    order!=='selecione' && queryString.push(`O=${order}`)
    const data= await fetchProducts(queryString.join('&'))
    setFetchLength(data.length)
    fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data]) : setProducts(data)
    setLoading(false)
    setShowMore(false)
  }

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})
    const filterValues=selectedFilters.map(filter=>filter.value)
    const filterFqs=selectedFilters.map(filter=>filter.fq)
    
    Array.from(document.querySelectorAll('input#filter')).forEach((input)=>{
      const Input=input as HTMLInputElement
      (filterValues.includes(Input.value) && filterFqs.includes(Input.getAttribute('data-fq')!))? (Input.checked=true) : (Input.checked=false)
    })
  },[selectedFilters])

  useEffect(()=>{
    typeof window!=='undefined' && handleMoreProducts()
  },[fromTo])

  useEffect(()=>{
    typeof window!=='undefined' && setFromTo({from:0, to:19})

    Array.from(document.querySelectorAll(`select#order`)).forEach((input)=>(input as HTMLInputElement).value=order)
  },[order])

  const filterFilters=()=>{
    console.log('Filtrando Filtros')
    if(products.length){
      const keys=filters.map(filter=>filter.label)
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

      if(listFiltersDesk.current && selectedFilters.length){
        const keys=Object.keys(filtrosByLabel)
        const h5S=Array.from(listFiltersDesk.current.querySelectorAll('h5')).filter(item=>keys.includes(item.innerText))
        const h5NaoDisp=Array.from(listFiltersDesk.current.querySelectorAll('h5')).filter(item=>!keys.includes(item.innerText)).filter(item=>item.innerText!=='Faixa de Preço')
        h5S.forEach(h5=>{
          const Input=h5.nextElementSibling!.querySelector('label input[type="text"]')! as HTMLInputElement
          Input.value=''

          const key=h5.innerText
          Array.from(h5.nextElementSibling!.querySelectorAll('ul li')).forEach(li=>{
            const Li=li as HTMLLIElement
            if(filtrosByLabel[key].includes(Li.innerText)){
              Li.removeAttribute('data-filtered')
            }else{
              Li.setAttribute('data-filtered','filtrado')
            }
          })
          
        })

        h5NaoDisp.forEach(h5=>{
          const divPai=h5.parentElement! as HTMLDivElement
          divPai.classList.replace('flex','hidden')
        })
      }else if(listFiltersDesk.current){
        const h5S=Array.from(listFiltersDesk.current.querySelectorAll('h5'))
        h5S.forEach(h5=>{
          const Input=h5.nextElementSibling!.querySelector('label input[type="text"]')! as HTMLInputElement
          Input.value=''

          Array.from(h5.nextElementSibling!.querySelectorAll('ul li')).forEach(li=>{
            const Li=li as HTMLLIElement
            Li.removeAttribute('data-filtered')
          })
        })

        const h5NaoDisp=Array.from(listFiltersDesk.current.querySelectorAll('h5')).filter(item=>item.innerText!=='Faixa de Preço')
        h5NaoDisp.forEach(h5=>{
          const divPai=h5.parentElement! as HTMLDivElement
          divPai.classList.replace('hidden','flex')
        })
      }
    }
  }

  useEffect(()=>{
    // filtragem de filtros no desktop
    filterFilters()
  },[products])

  return(
    <div className='w-full text-secondary appearance-none'>
      <div ref={contentWrapper} className='re1:px-[5%] re4:px-[15%]'>
        <div className='bg-transparent px-4 re1:px-0 mt-10 re1:mt-14 mb-3 re1:mb-6'>
          <h4 className='text-xl re1:text-3xl'>Sua busca por "<span className='font-bold'>{decodeURI(termo)}</span>" + "<span className='font-bold'>{fqName}</span>"</h4>
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

        <div className='flex justify-between items-end px-4 re1:px-0 my-5'>
          <label className='w-[45%]' ref={filterLabel}>
            <span className='font-bold'>Filtros</span>
            <FiltroMob filters={filters} id='menu'/>
          </label>
          <label className='focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Ordenar Por</span>
            <select id='order' className='text-secondary !outline-none select bg-transparent border border-secondary focus:bg-[#1e1e1e] w-full max-w-xs'
              onInput={(event)=>{
                setOrder((event.target as HTMLSelectElement).value)
              }}
            >
              <option disabled selected value='selecione'>Selecione</option>
              {orderFilters.map(filter=>(
                <option className='hover:bg-[#d1d1d1]' value={Object.values(filter)[0]}>{Object.keys(filter)[0]}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='flex w-full justify-between'>
          <ul id='filtros-desk' ref={listFiltersDesk} className='w-[22%] re1:flex flex-col hidden'>
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
                  }
                }}>{showMore ? <div className='loading loading-spinner'/> : 'Carregar mais Produtos'}</button>}
              </>
            )}
          </div>
        </div>   
      </div>
      <div className={`fixed bottom-0 ${divFlut ? 'flex':'hidden'} re1:hidden justify-between items-end px-4 py-5 bg-base-100`}>
          <label className='w-[45%]' id='divFlut-mob' ref={divFlutLabel}>
            <span className='font-bold'>Filtros</span>
            <FiltroMob filters={filters} id='divFlut'/>
          </label>
          <label className='focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Ordenar Por:</span>
            <select id='order' className='text-secondary !outline-none select bg-transparent border border-secondary focus:bg-[#1e1e1e] w-full max-w-xs'
              onInput={event=>{
                setOrder((event.target as HTMLSelectElement).value)
                isMobile && window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
              }}
            >
              <option disabled selected value='selecione'>Selecione</option>
              {orderFilters.map(filter=>(
                <option className='hover:bg-[#d1d1d1]' value={Object.values(filter)[0]}>{Object.keys(filter)[0]}</option>
              ))}
            </select>
          </label>
        </div>
    </div>
  )
}

export default SearchSub