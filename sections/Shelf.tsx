import { Runtime } from 'deco-sites/std/runtime.ts'
import { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts"

export interface Props{
  slug?: RequestURLParam
}

const Shelf=({slug}:Props)=>{
  const Slug=slug

  

  return (
    <h1>{Slug}</h1>
  )
}

export default Shelf