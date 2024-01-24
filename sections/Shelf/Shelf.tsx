// deno-lint-ignore-file no-window-prefix
import { useState, useRef, useEffect } from 'preact/hooks'
import type { SectionProps } from '$live/mod.ts'
import type { Product } from 'apps/commerce/types.ts'
import { LoaderContext } from '$live/mod.ts'
import type {Manifest}  from 'deco-sites/shp/manifest.gen.ts'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import Filtro from 'deco-sites/shp/sections/Shelf/Filtro.tsx'
import Modal from 'deco-sites/shp/sections/Shelf/Modal.tsx'

export interface Props{
  fqType:string
}

interface FilterObj{
  label:string
  values:Array<{
    value:string
    checked:boolean
  }>
}

export const loader: (
  fqType:Props,
  _req: Request,
  ctx: LoaderContext<unknown, Manifest>
) => Promise<{ data: Product[], filters:FilterObj[] }> = async (fqType, _req, ctx) => {
  const REQ = _req

  const q = REQ.url.split('?q=')[1].split(',')
  const fqs = q.map((fq: string) => `fq=skuId:${fq}`)

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

  return { data, filters:filters.filter(filtro=>filtro.values.length) }
}

const Shelf=({data, filters}:SectionProps<typeof loader>)=>{
  const [produtos,setProdutos]=useState<Product[]>(data)
  const [selectedFilters, setSelectedFilters]=useState<FilterObj[]>(filters)
  const [divFlut, setDivFlut]=useState(false)

  const listFiltersDesk=useRef<HTMLUListElement>(null)
  const divModalTop=useRef<HTMLDivElement>(null)
  const divModalBot=useRef<HTMLDivElement>(null)
  const contentWrapper=useRef<HTMLDivElement>(null)

  const addFiltersFunctionability=()=>{
    if(listFiltersDesk.current){
      const desktopFilterDivs=Array.from(listFiltersDesk.current.querySelectorAll('#filterDiv'))

      desktopFilterDivs.forEach((divFilter)=>{
        const specKey=divFilter.querySelector('h5')?.innerText

        const inputs=Array.from(divFilter.querySelectorAll('input#filter'))

        inputs.forEach(input=>{
          input.addEventListener('input',()=>{
            const Input=input as HTMLInputElement
            setSelectedFilters(currentFilters=>
              currentFilters.map(filtro=>{
                const newFiltro={...filtro}
                
                if(newFiltro.label === specKey){
                  newFiltro.values= newFiltro.values.map(filterVal=>{
                    if(filterVal.value === Input.value){
                      return {...filterVal, checked: Input.checked}
                    }
                    return filterVal
                  })
                }
                return newFiltro
              })

            )
          })
        })

      })
    }

    if(divModalTop.current){
      const divModalTopCurrent=divModalTop.current
      const filterBtn=divModalTopCurrent.querySelector('button#filtrar') as HTMLButtonElement
      
      filterBtn.addEventListener('click',()=>{
        const inputs=Array.from(divModalTopCurrent.querySelectorAll('#filterDiv input'))
        setSelectedFilters(currentFilters=>{
          const newFiltro:FilterObj[]=[...currentFilters]

          inputs.forEach(input=>{
            const Input=input as HTMLInputElement
            const filtroDoInput=newFiltro.find(filtro=>filtro.label===Input.name)?.values.find(val=>val.value===Input.value)
            filtroDoInput && (filtroDoInput.checked=Input.checked)
          })

          return newFiltro
        })
      })
    }

    if(divModalBot.current){
      const divModalBotCurrent=divModalBot.current
      const filterBtn=divModalBotCurrent.querySelector('button#filtrar') as HTMLButtonElement
      
      filterBtn.addEventListener('click',()=>{
        const inputs=Array.from(divModalBotCurrent.querySelectorAll('#filterDiv input'))
        setSelectedFilters(currentFilters=>{
          const newFiltro:FilterObj[]=[...currentFilters]

          inputs.forEach(input=>{
            const Input=input as HTMLInputElement
            const filtroDoInput=newFiltro.find(filtro=>filtro.label===Input.name)?.values.find(val=>val.value===Input.value)
            filtroDoInput && (filtroDoInput.checked=Input.checked)
          })

          return newFiltro
        })
      })
    }
  }

  const getProductsStartY=()=>{
    if(divModalTop.current){
      const divModalTopRect=divModalTop.current.getBoundingClientRect()
      const posY=divModalTopRect.top + window.scrollY
      return posY
    }else{
      return 700
    }
  }

  useEffect(()=>{
    const handleScroll=()=>{
      //divFlut
      if(contentWrapper.current){
        const contentRect=contentWrapper.current.getBoundingClientRect()
        const endContent=contentRect.bottom + window.scrollY
        if(window.scrollY > getProductsStartY() && window.scrollY < endContent){
          setDivFlut(true)
        }else{
          divModalBot.current && ((divModalBot.current.querySelector('dialog') as HTMLDialogElement).open!==true && setDivFlut(false))
        }
      }
    }

    window.addEventListener('scroll',handleScroll)

    addFiltersFunctionability()

    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  useEffect(()=>{
    const selecionado=selectedFilters.some(filters=>{
      return filters.values.some(filter=>filter.checked)
    })

    selectedFilters.forEach(filter=>{
      filter.values.forEach(val=>{
        Array.from(document.querySelectorAll(`input#filter[name="${filter.label}"][value="${val.value}"]`)).forEach(input=>{(input as HTMLInputElement).checked=val.checked})
      })
    })

    if(selecionado){
      const filtrosSelecionados = selectedFilters
      .filter(filter => filter.values.some(value => value.checked))
      .map(filter => ({
        ...filter,
        values: filter.values.filter(value => value.checked)
      }))

      const prodsFiltrados=data.filter(prod=>
        filtrosSelecionados.every(filter=>
          filter.values.some(value=>
            prod.isVariantOf?.additionalProperty.some(prop=>prop.name===filter.label && prop.value===value.value)
          )
        )
      )

      setProdutos(prodsFiltrados)
    }else{
      setProdutos(data)
    }
  },[selectedFilters])

  return(
    <CompareContextProvider>
      <div className='my-5'>
        <div className='flex flex-col re1:flex-row px-4 w-full justify-between re1:px-[5%] re4:px-[15%] text-white'>
          <ul ref={listFiltersDesk} className='w-[22%] re1:flex flex-col hidden'>
            {filters.map(filter=><Filtro filtro={filter}/>)}
          </ul>
          <div className='w-full re1:hidden' ref={divModalTop}>
            <Modal filters={filters} id='divFlutTop'/>
          </div>
          {produtos.length ? (
            <div ref={contentWrapper} className='grid auto-rows-min grid-cols-2 re1:grid-cols-4 gap-x-4 gap-y-4 re1:w-[75%] w-full mt-4 mb-12 re1:my-0'>
              {produtos.map(element=><Card product={element} pix={'12'}/>)}
            </div>
          ):(
            <p className='text-2xl font-bold mx-auto mt-10'>Não há produtos com esta combinação de filtros!</p>
          )}
          <div className={`fixed bottom-0 left-0 ${divFlut ? '' : 'hidden'} w-full max-w-screen re1:hidden py-2 px-4 bg-[#111]`} ref={divModalBot}>
            <Modal filters={filters} id='divFlutBot'/>
          </div>
        </div>
      </div>
    </CompareContextProvider>
  )
}

export default Shelf