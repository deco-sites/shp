import { useState, useRef, useEffect } from 'preact/hooks'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'

interface Props{
  filters:Array<{fq:string, value:string}>
}

const LimparFiltros=({filters}:Props)=>{
  const [open,setOpen]=useState(true)

  if(!filters.length) return null

  return(
    <div className='w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0'>
      <h5 className='px-3 py-5 flex justify-between cursor-pointer'
        onClick={()=>setOpen(!open)}
      >
        Filtrado por:
        <Icon 
          id={open ? 'ChevronUp' : 'ChevronDown'}
          size={12}
          strokeWidth={2}
        />
      </h5>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <ul className={`flex flex-col gap-2 bg-[#141414] overflow-y-auto max-h-[300px] re1:scrollbar-shp`}>
          {filters.map(filter=>(
            <li className='py-1 px-2'>
              {/*<label className='flex justify-start gap-2 cursor-pointer items-center'>
                <input id='filter' type='checkbox' value={filter.Value} className='checkbox checkbox-primary checkbox-sm' data-fq={filter.Map}/>
                <span className='line-clamp-1 text-sm'>{filter.Name}</span>
              </label>*/}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LimparFiltros