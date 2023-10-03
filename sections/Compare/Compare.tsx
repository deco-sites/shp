import { useState, useEffect } from 'preact/hooks'

const Compare=()=>{
  useEffect(()=>{
    if(typeof window!=='undefined'){
      Array.from(document.querySelectorAll('#COMPARE-PC')).forEach(element=>{
        element.addEventListener('input',(event)=>{
          console.log(event.target as HTMLInputElement)
        })
      })
    }
  },[])

  return null
}

export default Compare