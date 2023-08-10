// import { useState } from 'preact/hooks'

import { FilterToggleValue } from "deco-sites/std/commerce/types.ts";

interface Props{
  title:string
  values:FilterToggleValue[]
}

const Filtro=({title, values}:Props)=>{
  // const [open,setOpen]=useState(true)
  
  return(
    <div className='w-full flex flex-col bg-[#1e1e1e]'>
      <h5 className='px-3'>{title}</h5>
      <div>
        <label>
          <input type="text" name="" placeholder='Procure por nome ou descrição' 
          className='placeholder:line-clamp-1 border-2 border-[#3d3d3d] placeholder:text-[#3d3d3d] bg-[#111]
          focus:border-primary'/>
          {/* <Image /> */}
        </label>
        <ul className='flex flex-col gap-2 bg-[#141414]'>
          {values.map(filter=>(
            <li>
              <label className='flex justify-start gap-2 cursor-pointer items-center'>
                <input type='checkbox' name={filter.label} value={filter.value} className='checkbox checkbox-primary checkbox-sm'/>
                <span className='line-clamp-1 text-sm'>{filter.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filtro