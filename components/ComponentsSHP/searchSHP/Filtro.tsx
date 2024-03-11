import { useState, useRef, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx';

interface Props{
  title:string
  values:Array<SpecObj | Category>
}

interface Category{
  name:string
  value:string
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

const Filtro=({title, values}:Props)=>{
  const [open,setOpen]=useState(true)
  const search=useRef<HTMLInputElement>(null)
  const valuesList=useRef<HTMLUListElement>(null)
  
  const handleInput=()=>{
    if(search.current && valuesList.current){
      const inputValue=search.current.value.toLowerCase()
      const listChildrens=Array.from(valuesList.current.children).filter(li=>!li.hasAttribute('data-filtered'))

      listChildrens.forEach((li)=>{
        const Li=li as HTMLLIElement
        if(Li.innerText.toLowerCase().includes(inputValue)){
          Li.classList.contains('hidden') && Li.classList.remove('hidden')
        }else{
          Li.classList.add('hidden')
        }
      })
    }
  }

  const cleanInput=(event:KeyboardEvent)=>{
    event.key==='Escape' && (search.current && (search.current.value='', handleInput()))
  }

  return(
    <div className='w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0'>
      <h3 className='px-3 py-5 flex justify-between cursor-pointer'
        onClick={()=>setOpen(!open)}
      >
        {title}
        <Icon 
          id={open ? 'ChevronUp' : 'ChevronDown'}
          size={12}
          strokeWidth={2}
        />
      </h3>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <label className={`${values.length>2 ? 'flex' : 'hidden'} justify-around items-center py-1`}>
          <input ref={search} type='text' name='search' placeholder='Procure por nome ou descrição' className='rounded-lg placeholder:line-clamp-1 
            border-2 border-neutral placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-[80%] text-sm px-2 py-1'
            onInput={handleInput} onKeyUp={cleanInput}
          />
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png' width={15} height={15}
            decoding='sync' loading='lazy' fetchPriority='low' onClick={handleInput}/>
        </label>
        <ul ref={valuesList} className={`flex flex-col gap-2 bg-[#141414] overflow-y-auto max-h-[300px] re1:scrollbar-shp`}>
          {values.map(filter=>{
            return 'value' in filter ? 
            (
              <li className='py-1 px-2'>
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input id='filter' type='checkbox' name={filter.name} value={filter.value} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq={'C'} 
                    onChange={()=>{
                      sendEvent({name:'filters',params:{
                        filter: title,
                        filtred_by: filter.name
                      }})
                    }}
                  />
                  <span className='text-sm'>{filter.name}</span>
                </label>
              </li>
            ) : (
              <li className='py-1 px-2'>
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input id='filter' type='checkbox' name={filter.Name} value={filter.Value} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq={filter.Map}
                    onChange={()=>{
                      sendEvent({name:'filters',params:{
                        filter: title,
                        filtred_by: filter.Name
                      }})
                    }}
                  />
                  <span className='text-sm'>{filter.Name}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Filtro