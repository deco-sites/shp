import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/shp/components/ui/Icon.tsx";
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useRef } from 'preact/hooks'
import { RefObject, forwardRef } from 'preact/compat'

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  type Attr={
    href:string,
    class:string,
    'data-filtered'?:boolean
  }

  const attributes:Attr={
    href:url,
    class:"flex items-center gap-2 py-1 px-2"
  }

  selected && (attributes['data-filtered']=selected)

  return (
    <a {...attributes}>
      <div aria-checked={selected} class="checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]" />
      <span class="text-sm text-white">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-content">({quantity})</span>} */}
    </a>
  );
}

const FilterValues=forwardRef<HTMLUListElement, FilterToggle>((props, ref)=>{
  const { key, values } = props

  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={'flex flex-col bg-[#141414] overflow-y-auto max-h-[300px] re1:scrollbar-shp'} ref={ref}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url}>
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from,'BRL')} - ${formatPrice(range.to,'BRL')}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  )
})

function Filtro({filter}:{filter:FilterToggle}){
  const [open, setOpen]=useState(true)
  const search=useRef<HTMLInputElement>(null)
  const valuesList=useRef<HTMLUListElement>(null)
  
  const handleInput=()=>{
    if(search.current && valuesList.current){
      const inputValue=search.current.value.toLowerCase()
      const listChildrens=Array.from(valuesList.current.children).filter(a=>!a.hasAttribute('data-filtered'))

      console.log(listChildrens)
      listChildrens.forEach((a)=>{
        const A=a as HTMLAnchorElement
        if(A.innerText.toLowerCase().includes(inputValue)){
          A.classList.contains('hidden') && A.classList.remove('hidden')
        }else{
          A.classList.add('hidden')
        }
      })
    }
  }

  const cleanInput=(event:KeyboardEvent)=>{
    event.key==='Escape' && (search.current && (search.current.value='', handleInput()))
  }

  return(
    <li class="w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0">
      <h5 className='px-3 py-5 flex justify-between cursor-pointer items-center text-white' onClick={()=>setOpen(!open)} >
        {filter.label}
        <Icon 
          id={open ? 'ChevronUp' : 'ChevronDown'}
          size={12}
          strokeWidth={2}
        />
      </h5>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <label className={`${filter.values.length>2 ? 'flex' : 'hidden'} justify-around items-center py-1`}>
          <input ref={search} title='Procure por nome ou descrição' type='text' name='search' placeholder='Procure por nome ou descrição' className='rounded-lg placeholder:line-clamp-1 
            border-2 border-neutral placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-[80%] text-sm px-2 py-1'
            onInput={handleInput} onKeyUp={cleanInput}
          />
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png' width={15} height={15}
            decoding='sync' loading='lazy' fetchPriority='low' onClick={handleInput}/>
        </label>
        <FilterValues {...filter} ref={valuesList}/>
      </div>
    </li>
  )
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <Filtro filter={filter} />
        ))}
    </ul>
  );
}

export default Filters;