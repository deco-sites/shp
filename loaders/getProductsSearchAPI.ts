export interface Props{
  queryString:string
}

const loader=async ({queryString}:Props)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search?${queryString}`
  return await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return
    }else if(text.split('')[0]==='<'){
      return
    }else{
      return resp.json()
    }
  }).catch(err=>console.error('Error: ',err))
}

export default loader