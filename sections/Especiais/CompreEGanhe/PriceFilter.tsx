import { useState, useEffect, useRef } from 'preact/hooks'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'

interface Props{
  filtro:FilterObj | undefined
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

const PriceFilter=()=>{
  const [open,setOpen]=useState(true)

  const [red,setRed]=useState(false)
  const min=useRef<HTMLInputElement>(null)
  const max=useRef<HTMLInputElement>(null)

  return(
    <div className='w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0'>
      <h5 className='px-3 py-5 flex justify-between cursor-pointer'
        onClick={()=>setOpen(!open)}
      >
        Faixa de Preços
        <Icon 
          id={open ? 'ChevronUp' : 'ChevronDown'}
          size={12}
          strokeWidth={2}
        />
      </h5>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <ul className={`flex flex-col gap-2 bg-[#141414] overflow-y-auto max-h-[300px]`}>
          
          <li className='py-1 px-2'>
            <label className='flex justify-start gap-2 cursor-pointer items-center'>
              <input onInput={(event)=>{
                const Input=event.target as HTMLInputElement
                if(Input.checked){
                  Array.from(document.querySelectorAll('input[name="min"]')).forEach(input=>(input as HTMLInputElement).value='')
                  Array.from(document.querySelectorAll('input[name="max"]')).forEach(input=>(input as HTMLInputElement).value='')
                }
              }} id='filter' type='checkbox' name='R$0 - R$2.000,00' value={'[0 TO 2000]'} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq='P'/>
              <span className='line-clamp-1 text-sm'>R$0 - R$2.000,00</span>
            </label>
          </li>

          <li className='py-1 px-2'>
            <label className='flex justify-start gap-2 cursor-pointer items-center'>
              <input onInput={(event)=>{
                const Input=event.target as HTMLInputElement
                if(Input.checked){
                  Array.from(document.querySelectorAll('input[name="min"]')).forEach(input=>(input as HTMLInputElement).value='')
                  Array.from(document.querySelectorAll('input[name="max"]')).forEach(input=>(input as HTMLInputElement).value='')
                }
              }} id='filter' type='checkbox' name='R$2.000,00 - R$3.500,00' value={encodeURI('[2000 TO 3500]')} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq='P'/>
              <span className='line-clamp-1 text-sm'>R$2.000,00 - R$3.500,00</span>
            </label>
          </li>

          <li className='py-1 px-2'>
            <label className='flex justify-start gap-2 cursor-pointer items-center'>
              <input onInput={(event)=>{
                const Input=event.target as HTMLInputElement
                if(Input.checked){
                  Array.from(document.querySelectorAll('input[name="min"]')).forEach(input=>(input as HTMLInputElement).value='')
                  Array.from(document.querySelectorAll('input[name="max"]')).forEach(input=>(input as HTMLInputElement).value='')
                }
              }} id='filter' type='checkbox' name='R$3.500,00 - R$5.000,00' value={encodeURI('[3500 TO 5000]')} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq='P'/>
              <span className='line-clamp-1 text-sm'>R$3.500,00 - R$5.000,00</span>
            </label>
          </li>

          <li className='py-1 px-2'>
            <label className='flex justify-start gap-2 cursor-pointer items-center'>
              <input onInput={(event)=>{
                const Input=event.target as HTMLInputElement
                if(Input.checked){
                  Array.from(document.querySelectorAll('input[name="min"]')).forEach(input=>(input as HTMLInputElement).value='')
                  Array.from(document.querySelectorAll('input[name="max"]')).forEach(input=>(input as HTMLInputElement).value='')
                }
              }} id='filter' type='checkbox' name='R$5.000,00 - R$10000,00' value={encodeURI('[5000 TO 10000]')} className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' data-fq='P'/>
              <span className='line-clamp-1 text-sm'>R$5.000,00 - R$10000,00</span>
            </label>
          </li>

          <li className='py-1 px-2'>
            <label className='flex justify-center re1:justify-start gap-2 cursor-pointer items-center'>
              <input ref={min} type='text' placeholder='min' name='min' className='rounded-lg border-2 border-neutral placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-[35%] text-sm px-2 py-1'
                onInput={(event)=>{
                  const Input=event.target as HTMLInputElement
                  Array.from(document.querySelectorAll('input[name="min"]')).forEach(input=>{
                    (input as HTMLInputElement).value=Input.value
                  })
                  if(max.current){
                    const inputMax=max.current as HTMLInputElement
                    if(Input.value.length>0){
                      setRed(true)
                      Array.from(document.querySelectorAll('input[data-fq="P"]')).forEach(input=>(input as HTMLInputElement).checked=false)
                    }else if(inputMax.value.length === 0){
                      setRed(false)
                    }
                  }
                }}
              />
              <p>-</p>
              <input ref={max} type='text' placeholder='max' name='max' className='rounded-lg border-2 border-neutral placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-[35%] text-sm px-2 py-1'
                onInput={(event)=>{
                  const Input=event.target as HTMLInputElement
                  Array.from(document.querySelectorAll('input[name="max"]')).forEach(input=>{
                    (input as HTMLInputElement).value=Input.value
                  })
                  if(min.current){
                    const inputMin=min.current as HTMLInputElement
                    if(Input.value.length>0){
                      setRed(true)
                      Array.from(document.querySelectorAll('input[data-fq="P"]')).forEach(input=>(input as HTMLInputElement).checked=false)
                    }else if(inputMin.value.length === 0){
                      setRed(false)
                    }
                  }
                }}
              />
              <button className={`hidden btn re1:flex ${red ? 'bg-primary hover:bg-primary' : 'bg-neutral hover:bg-neutral'} btn-circle !min-h-[30px] !h-[30px] !min-w-[30px] !w-[30px]`} id='priceRange'>
                <Icon 
                  id='ChevronRight'
                  size={12}
                  strokeWidth={3}
                />
              </button>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PriceFilter