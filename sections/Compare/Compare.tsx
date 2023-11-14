import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import CompareModal from 'deco-sites/shp/sections/Compare/CompareModal.tsx'
import {useEffect} from 'preact/hooks'

interface Props{
  PCs:PcContextProps[]
}

const Vazio=()=>{
  return (
    <div className='w-[20%] h-full hidden re1:flex relative'>
      <div className='w-full h-full rounded-lg bg-[#1e1e1e]'/>
      <svg className='absolute -right-[12px] -top-[12px]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <circle cx="12.5" cy="12.5" r="12.5" fill="#DD1F26"></circle>
        <rect x="6" y="11" width="13" height="3" fill="white"></rect>
      </svg>
    </div>
  )
}

const PCCard=({PC}:{PC:PcContextProps})=>{ 
  const {removePC}:CompareContextType=useCompareContext()
  return (
    <div className='w-full re1:w-[20%] h-full flex gap-1 relative'>
      <svg className='absolute -right-[10%] re1:-right-[12px] top-[25%] re1:-top-[12px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
        onClick={()=>removePC(PC.name, PC.id)}
      >
        <circle cx="12.5" cy="12.5" r="12.5" fill="#DD1F26"></circle>
        <rect x="6" y="11" width="13" height="3" fill="white"></rect>
      </svg>
      <Image className='my-auto' width={59} height={59} src={PC.imgUrl} fetchPriority='high' decoding='sync' loading='eager'/>
      <p className='text-sm line-clamp-3 h-[90%] my-auto text-white'>{PC.name}</p>
    </div>
  )
}

const Compare=({PCs}:Props)=>{
  // useEffect(()=>console.log(PCs),[PCs])

  return (
    <div className='fixed bottom-0 left-0 w-full re1:h-[100px] bg-black flex flex-col re1:flex-row p-[15px] re1:py-[15px] re1:px-0 z-[5]'>
      <div className='flex flex-col gap-2 re1:gap-0 re1:flex-row w-[90%] justify-around mb-2 re1:mb-0'>
        {PCs[0] ? <PCCard PC={PCs[0]}/> : <Vazio />}
        {PCs[1] ? <PCCard PC={PCs[1]}/> : <Vazio />}
        {PCs[2] ? <PCCard PC={PCs[2]}/> : <Vazio />}
        {PCs[3] ? <PCCard PC={PCs[3]}/> : <Vazio />}
      </div>
      <CompareModal PCs={PCs}/>
    </div>
  )
}


export default Compare