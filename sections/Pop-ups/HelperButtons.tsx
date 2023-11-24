// deno-lint-ignore-file no-window-prefix
import { useState, useEffect } from 'preact/hooks'
import ScrollToTop from 'deco-sites/shp/components/pop-ups/ScrollToTop.tsx'

const HelperButtons=()=>{

  const [showToTop, setShowToTop]=useState(false)

  const handleScroll=()=>{
    setShowToTop(window.scrollY > window.innerHeight-200)
  }

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      window.addEventListener('scroll' ,handleScroll)
    }

    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return (
    <div className='fixed right-[20px] bottom-28'>
      <div className={showToTop ? '' : 'hidden'}>
        <ScrollToTop />
      </div>
    </div>
  )
}

export default HelperButtons