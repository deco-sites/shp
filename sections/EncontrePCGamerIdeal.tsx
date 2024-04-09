import Image from 'deco-sites/std/components/Image.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import {useEffect, useState, useRef} from 'preact/hooks'
import type { Product } from 'apps/commerce/types.ts'
import removeDot from "deco-sites/shp/FunctionsSHP/removeDOTFromFilters.ts";

export interface Props {
  peca: Array<{
    iconUrl: string
    name: string
  }>
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

const filtersLoader=async (idCateg:string)=>await invoke['deco-sites/shp'].loaders.getFacetsByCategId({categoryId:idCateg})

const PCGamerIdeal = () => {
  const [placas, setPlacas]=useState<SpecObj[]>([])
  const [processadores, setProcessadores]=useState<SpecObj[]>([])
  const [memorias, setMemorias]=useState<SpecObj[]>([])
  const [arms, setArms]=useState<SpecObj[]>([])

  const [loading,setLoading]=useState(true)

  const placasSelect=useRef<HTMLSelectElement>(null)
  const processadoresSelect=useRef<HTMLSelectElement>(null)
  const memoriasSelect=useRef<HTMLSelectElement>(null)
  const armsSelect=useRef<HTMLSelectElement>(null)

  const handleSearch=async()=>{
    const queryStringArr:string[]=['fq:C/10/']
    if(placasSelect.current?.value && placasSelect.current?.value!=='all'){queryStringArr.push(`fq=${placasSelect.current?.value}`)}
    if(processadoresSelect.current?.value && processadoresSelect.current?.value!=='all'){queryStringArr.push(`fq=${processadoresSelect.current?.value}`)}
    if(memoriasSelect.current?.value && memoriasSelect.current?.value!=='all'){queryStringArr.push(`fq=${memoriasSelect.current?.value}`)}
    if(armsSelect.current?.value && armsSelect.current?.value!=='all'){queryStringArr.push(`fq=${armsSelect.current?.value}`)}
    const data=await invoke['deco-sites/shp'].loaders.getProductsSearchAPIProdType({queryString:queryStringArr.join('&')})
    const Skus=[...new Set(data.map((item:Product)=>item.sku))]
    if(Skus.length){
      globalThis.window.location.href=`shelf/?q=${Skus}`
    }else{
      alert('Nenhum PC encontrado!')
    }
  }

  const fetchFilters=async()=>{
    const data=await filtersLoader('10')
    const specificationFilters=(data.SpecificationFilters as Record<string, SpecObj[]>)
    setPlacas(specificationFilters['Placa de vídeo'])
    setProcessadores(specificationFilters['Processador'])
    setMemorias(specificationFilters['Memória'])
    setArms(removeDot([...specificationFilters['HD'], ...specificationFilters['SSD']]))
  }

  const handleSelect=async(event:Event)=>{
    const Target=event.target as HTMLSelectElement
    if(Target.value==='all'){
      (Array.from(Target.querySelectorAll('option:not([value="all"])')) as HTMLOptionElement[]).forEach((option)=>{option.removeAttribute('data-filtered')})
    }else{
      const queryStringArr:string[]=['fq=C:/10/']
      if(placasSelect.current?.value && placasSelect.current?.value!=='all'){queryStringArr.push(`fq=${placasSelect.current?.value}`)}
      if(processadoresSelect.current?.value && processadoresSelect.current?.value!=='all'){queryStringArr.push(`fq=${processadoresSelect.current?.value}`)}
      if(memoriasSelect.current?.value && memoriasSelect.current?.value!=='all'){queryStringArr.push(`fq=${memoriasSelect.current?.value}`)}
      if(armsSelect.current?.value && armsSelect.current?.value!=='all'){queryStringArr.push(`fq=${armsSelect.current?.value}`)}
      setLoading(true)
      const data = await invoke['deco-sites/shp'].loaders.getFacetsQueryString({queryString:queryStringArr.join('&')})

      const specificationFilters=(data.SpecificationFilters as Record<string, SpecObj[]>)
      const returnedPlacas=specificationFilters['Placa de vídeo']?.map(spec=>spec.Name) || []
      const returnedProcessadores=specificationFilters['Processador']?.map(spec=>spec.Name) || []
      const returnedMemorias=specificationFilters['Memória']?.map(spec=>spec.Name) || []
      const tempArr=[]
      specificationFilters['HD'] && tempArr.push(...specificationFilters['HD'])
      specificationFilters['SSD'] && tempArr.push(...specificationFilters['SSD'])
      const returnedArms=tempArr.map(spec=>spec.Name)

      placasSelect.current && (Array.from(placasSelect.current.querySelectorAll('option:not([value="all"])')) as HTMLOptionElement[]).forEach(option=>{
        if(returnedPlacas.includes(option.innerText)){
          option.removeAttribute('data-filtered')
        }else{
          option.setAttribute('data-filtered','true')
        }
      })

      processadoresSelect.current && (Array.from(processadoresSelect.current.querySelectorAll('option:not([value="all"])')) as HTMLOptionElement[]).forEach(option=>{
        if(returnedProcessadores.includes(option.innerText)){
          option.removeAttribute('data-filtered')
        }else{
          option.setAttribute('data-filtered','true')
        }
      })

      memoriasSelect.current && (Array.from(memoriasSelect.current.querySelectorAll('option:not([value="all"])')) as HTMLOptionElement[]).forEach(option=>{
        if(returnedMemorias.includes(option.innerText)){
          option.removeAttribute('data-filtered')
        }else{
          option.setAttribute('data-filtered','true')
        }
      })

      armsSelect.current && (Array.from(armsSelect.current.querySelectorAll('option:not([value="all"])')) as HTMLOptionElement[]).forEach(option=>{
        if(returnedArms.includes(option.innerText)){
          option.removeAttribute('data-filtered')
        }else{
          option.setAttribute('data-filtered','true')
        }
      })

      setLoading(false)
    }
  }

  useEffect(()=>{
    typeof globalThis.window!=='undefined' && fetchFilters().then(()=>{setLoading(false)})
  },[])

  return (
    <div className='my-5 flex flex-col justify-center items-center'>
      <p className='text-center text-2xl font-bold text-secondary'>
        Encontre seu Pc Gamer Ideal
      </p>
      {loading && <div className='loading loading-spinner loading-lg text-primary mx-auto my-4'/> }
      <div className={`${loading ? '!hidden' : ''} grid grid-cols-2 mx-2 my-4 rounded-lg text-white gap-4 re1:flex re1:justify-center`}>
        <div className='flex flex-col justify-center items-start w-full re1:w-[17.5%]'>
            <label className='flex gap-1 items-center h-[25px] mb-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg' width={25} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <p className='text-sm re1:text-lg font-bold'>Placa de Vídeo</p>
            </label>
            <div
              className='w-full h-[35px] re1:h-[50px] after:ml-auto after:mr-1.5 after:mt-[-20px] after:re1:mt-[-28px] after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png)] after:bg-no-repeat 
              after:bg-right after:flex after:w-[15px] after:h-[15px] after:rotate-90'
            >
              <select
                onChange={handleSelect}
                ref={placasSelect}
                name='select placaVideo'
                className='w-full max-w-full h-full text-sm bg-[#272727] border-[#3A3838] border-[2px] appearance-none !outline-none pl-[5px] pr-6 py-1'
              >
                <option value='all'>Todas as Opções</option>
                {placas.map(filter => (
                  <option className='data-[filtered]:hidden text-xs line-clamp-1 w-full overflow-x-hidden' title={filter.Name} value={`${filter.Map}:${filter.Value}`}>{filter.Name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start w-full re1:w-[17.5%]'>
            <label className='flex gap-1 items-center h-[25px] mb-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg' width={25} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <p className='text-sm re1:text-lg font-bold'>Processador</p>
            </label>
            <div
              className='w-full h-[35px] re1:h-[50px] after:ml-auto after:mr-1.5 after:mt-[-20px] after:re1:mt-[-28px] after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png)] after:bg-no-repeat 
              after:bg-right after:flex after:w-[15px] after:h-[15px] after:rotate-90'
            >
              <select
                onChange={handleSelect}
                ref={processadoresSelect}
                name='select processador'
                className='w-full max-w-full h-full text-sm bg-[#272727] border-[#3A3838] border-[2px] appearance-none !outline-none pl-[5px] pr-6 py-1'
              >
                <option value='all'>Todas as Opções</option>
                {processadores.map(filter => (
                  <option className='data-[filtered]:hidden text-xs line-clamp-1 w-full overflow-x-hidden' title={filter.Name} value={`${filter.Map}:${filter.Value}`}>{filter.Name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start w-full re1:w-[17.5%]'>
            <label className='flex gap-1 items-center h-[25px] mb-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg' width={25} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <p className='text-sm re1:text-lg font-bold'>Memória</p>
            </label>
            <div
              className='w-full h-[35px] re1:h-[50px] after:ml-auto after:mr-1.5 after:mt-[-20px] after:re1:mt-[-28px] after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png)] after:bg-no-repeat 
              after:bg-right after:flex after:w-[15px] after:h-[15px] after:rotate-90'
            >
              <select
                onChange={handleSelect}
                ref={memoriasSelect}
                name='select memoria'
                className='w-full max-w-full h-full text-sm bg-[#272727] border-[#3A3838] border-[2px] appearance-none !outline-none pl-[5px] pr-6 py-1'
              >
                <option value='all'>Todas as Opções</option>
                {memorias.map(filter => (
                  <option className='data-[filtered]:hidden text-xs line-clamp-1 w-full overflow-x-hidden' title={filter.Name} value={`${filter.Map}:${filter.Value}`}>{filter.Name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start w-full re1:w-[17.5%]'>
            <label className='flex gap-1 items-center h-[25px] mb-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg' width={25} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <p className='text-sm re1:text-lg font-bold'>HD/SSD</p>
            </label>
            <div
              className='w-full h-[35px] re1:h-[50px] after:ml-auto after:mr-1.5 after:mt-[-20px] after:re1:mt-[-28px] after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png)] after:bg-no-repeat 
              after:bg-right after:flex after:w-[15px] after:h-[15px] after:rotate-90'
            >
              <select
                onChange={handleSelect}
                ref={armsSelect}
                name='select HdSsd'
                className='w-full max-w-full h-full text-sm bg-[#272727] border-[#3A3838] border-[2px] appearance-none !outline-none pl-[5px] pr-6 py-1'
              >
                <option value='all'>Todas as Opções</option>
                {arms.map(filter => (
                  <option className='data-[filtered]:hidden text-xs line-clamp-1 w-full overflow-x-hidden' title={filter.Name} value={`${filter.Map}:${filter.Value}`}>{filter.Name}</option>
                ))}
              </select>
            </div>
          </div>
        <button className='bg-primary text-lg w-[200px] re1:flex rounded-lg text-secondary pl-[45px] h-[50px] items-center justify-center hidden self-end' onClick={handleSearch}>
          <b>Buscar</b>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='50'
            height='20'
            x='0'
            y='0'
            viewBox='0 0 512.009 512.009'
            style='enable-background:new 0 0 512 512'
            class=''
          >
            <g>
              <path
                d='M508.625 247.801 392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z'
                fill='#ffffff'
                data-original='#000000'
              />
            </g>
          </svg>
        </button>
      </div>
      
      <div className='flex justify-center w-5/6 mx-auto mt-8 re1:hidden'>
        <button className='bg-primary text-lg w-full flex rounded-lg text-secondary pl-[45px] py-2 justify-center items-center' onClick={handleSearch}>
          <b>Buscar</b>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='50'
            height='20'
            x='0'
            y='0'
            viewBox='0 0 512.009 512.009'
            style='enable-background:new 0 0 512 512'
            class=''
          >
            <g>
              <path
                d='M508.625 247.801 392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z'
                fill='#ffffff'
                data-original='#000000'
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PCGamerIdeal
