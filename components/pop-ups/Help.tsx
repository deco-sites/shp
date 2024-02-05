import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props{
  links:Array<{
    text:string
    icon:{type:'image', src:string, w:number, h:number} | {type:'svg', code:string}
    href:string
  }>
}

const Help = ({links}:Props) =>{
  const [openLinks, setOpenLinks]=useState(false)

  return (
    <div className='flex flex-col gap-2 justify-end opacity-80 items-end'>
      <div className={`${openLinks ? '' : 'hidden'} overflow-hidden bg-white p-4 rounded-2xl`}>
        {links.map(link=>{
          return link.icon.type==='svg' ? (
            <a href={link.href} className='text-black grid grid-cols-[24px_1fr] gap-[10px] py-1 items-center border-y border-y-base-content first:border-t-transparent last:border-b-transparent' dangerouslySetInnerHTML={{__html:`${link.icon.code}<p>${link.text}</p>`}} />
          ) : (
            <a href={link.href} className='text-black grid grid-cols-[24px_1fr] gap-[10px] py-1 items-center border-y border-y-base-content first:border-t-transparent last:border-b-transparent'>
              <Image src={link.icon.src} width={link.icon.w} height={link.icon.h}/>
              <p>{link.text}</p>
            </a>
          )
        })}
      </div>
      <button className={`btn btn-circle !bg-white text-black font-bold ${openLinks ? '' : '!w-fit px-2'}`} onClick={()=>setOpenLinks(!openLinks)}>
        {openLinks ? '✕' : 'Ajuda?'}
      </button>
    </div>
  )
}

export default Help

