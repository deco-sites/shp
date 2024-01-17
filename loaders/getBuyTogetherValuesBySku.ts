// deno-lint-ignore-file no-explicit-any
export interface Props{
  skuId:string
}

const loader = async({skuId}:Props)=>{
  const url='https://shopinfo.vtexcommercestable.com.br/api/checkout/pub/orderForms/simulation'
  const dataSimulation=await fetch(url,{
    method:'POST',
    body:JSON.stringify({
      items:[{
        'id':skuId,
        'quantity':1,
        'seller':'1'
      }]
    })
  }).then(async (r)=>{
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

  const teasers=dataSimulation.ratesAndBenefitsData?.teaser || []
  const arrReturn=teasers.map((promotion:any)=>{
    if(promotion.name.toLowerCase().includes('compre junto')){
      return {
        'sku' :promotion.conditions.parameters[1].value,
        'promotion':promotion.effects.parameters[1].value
      }
    }else{
      return undefined
    }
  }).filter((item:any)=>item!==undefined)
  
  return arrReturn
}

export default loader