// deno-lint-ignore-file no-window-prefix
import { useState, useEffect } from 'preact/hooks'
import ScrollToTop from 'deco-sites/shp/components/pop-ups/ScrollToTop.tsx'
import Help from 'deco-sites/shp/components/pop-ups/Help.tsx'

export interface Props{
  links:Array<{
    text:string
    icon:{type:'image', src:string} | {type:'svg', code:string}
    href:string
  }>
}

const HelperButtons=({links}:Props)=>{

  const [showToTop, setShowToTop]=useState(false)
  const [isPDP, setIsPDP]=useState(false)

  const handleScroll=()=>{
    setShowToTop(window.scrollY > window.innerHeight-200)
  } 

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      window.location.pathname.split('/').pop() === 'p' && setIsPDP(true)

      window.addEventListener('scroll' ,handleScroll)
    }

    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return (
    <div className={`fixed right-[20px] flex flex-col gap-3 items-end  ${isPDP ? 'bottom-40' : 'bottom-28'}`}>
      <Help links={links}/>
      <div className={showToTop ? '' : 'hidden'}>
        <ScrollToTop />
      </div>
    </div>
  )
}

export default HelperButtons