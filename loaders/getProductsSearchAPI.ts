export interface Props{
  queryString:string
}

const loader=async ({queryString}:Props)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search?${queryString}`
  console.log('Fetching: '+url)
  return await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return
    }else if(text.split('')[0]==='<'){
      return
    }else{
      const products= await resp.json()
      const productsResources= resp.headers.get('resources')

      const finalObj={products, productsResources}
      return finalObj
    }
  }).catch(err=>console.error('Error: ',err))
}

export default loader