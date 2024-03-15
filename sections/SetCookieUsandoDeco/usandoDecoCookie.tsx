import { useEffect } from "preact/hooks";

const UsandoDecoCookie=()=>{
  useEffect(()=>{
    console.log('CHAMPAGNE')
    document.cookie = "usando_deco=true; path=/;"
  },[])
  
  return null
}

export default UsandoDecoCookie