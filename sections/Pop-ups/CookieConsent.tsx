import CookieConsent from "deco-sites/shp/components/pop-ups/CookieConsent.tsx"
import { useState, useRef, useEffect } from 'preact/hooks'

export interface Props{
  /**@description Coloque o path das paginas q n deseja exibir o pop-up */
  paths?:string[]
}

const CookieConsentFinal=({paths}:Props)=>{
  const [show, setShow]=useState(true)

  const button=useRef<HTMLButtonElement>(null)

  useEffect(()=>{
    const hide=()=>{
      setShow(false)
    }

    if(button.current && typeof globalThis.window!=='undefined'){
      if(paths){
        const pathName=globalThis.window.location.pathname
        // console.log(pathName)
        paths.includes(pathName) && setShow(false)
      }

      button.current.addEventListener('click',hide)
    }

    return ()=>{
      button.current?.removeEventListener('click',hide)
    }
  },[])

  return !show ? null : (
    <div className='fixed bottom-0'>
      <CookieConsent ref={button}/>
    </div>
  )
}

export default CookieConsentFinal