export interface Props{
  productId:string
  storeId:string
}

const loader= async ({productId, storeId}:Props)=>{
  const url=`https://trustvox.com.br/widget/shelf/v2/products_rates?codes[]=${productId}&store_id=${storeId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

export default loader