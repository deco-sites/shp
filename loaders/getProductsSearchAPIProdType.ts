// deno-lint-ignore-file no-explicit-any
import { toProduct } from 'https://denopkg.com/deco-cx/apps@0.3.5/vtex/utils/transform.ts'

export interface Props{
  queryString:string
}

const loader=async ({queryString}:Props, _req:Request)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search?${queryString}`
  console.log('Fetching: '+url)
  const vtexProds=await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return
    }else if(text.split('')[0]==='<'){
      return
    }else{
      return resp.json()
    }
  }).catch(err=>console.error('Error: ',err)) ?? []

  const { url:baseUrl } = _req

  try{
    const products = vtexProds.map((p:any) =>
      toProduct(p, p.items[0], 0, {
        baseUrl: baseUrl,
        priceCurrency: "BRL", // config!.defaultPriceCurrency, // TODO fix currency
      })
    )
    return products
  }catch(err){
    console.error(err)
  }

  return []
}

export default loader