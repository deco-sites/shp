import CookieConsent from "deco-sites/shp/components/pop-ups/CookieConsent.tsx"
import { useState, useRef, useEffect } from 'preact/hooks'

export interface Props{
  /**@description Coloque o path das paginas q n deseja exibir o pop-up */
  paths?:string[]
}

const CookieConsentFinal=({paths}:Props)=>{
  const [show, setShow]=useState(true)


  useEffect(()=>{
    if(typeof globalThis.window !== 'undefined'){
      if(paths){
        const pathName=globalThis.window.location.pathname
        paths.includes(pathName) && setShow(false)
      }
    }
  },[])

  return !show ? null : (
    <div className='fixed bottom-0 z-10'>
      <CookieConsent />
    </div>
  )
}

export default CookieConsentFinal