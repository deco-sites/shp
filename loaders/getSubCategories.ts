const loader=async()=>{
  const categs=await fetch('https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/1').then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return 
    }else if(text.split('')[0]==='<'){
      return
    }else{
      return resp.json()
    }
  }).catch(err=>console.error(err))
  return categs
}

export default loader