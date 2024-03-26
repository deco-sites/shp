export interface Props{
 /**@description separe os ids por barra caso seja uma subcategoria ex: IdCateg/IdSubCateg */
  categoryId:string
}

const loader=async({categoryId}:Props)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/facets/search/?fq=C:/${categoryId}/`
  console.log('Fetching: '+url)
  const categs=await fetch(url).then(async (r)=>{ 
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