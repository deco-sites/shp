export interface Props{
  queryString:string
  signal?:AbortSignal|null
}

const loader=async ({queryString, signal}:Props)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search?${queryString}`
  console.log('fetching: ',url)
  if(signal){
    return await fetch(url,{signal}).then(async (r)=>{
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
  }else{
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
}

export default loader