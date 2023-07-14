import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useEffect } from 'preact/hooks'

export interface Props {
  page: ProductDetailsPage
}

const Description=({page}:Props)=>{
  useEffect(()=>{console.log(page)
  console.log('batata')},[])
  return (
    <p>Description</p>
  )
}

export default Description