import { Product, PropertyValue } from 'apps/commerce/types.ts'

export interface Props{
  product:Product
}

const Card=({product}:Props)=>{
  const avaibility=product.offers!.offers[0].availability==='https://schema.org/InStock'

  if(!avaibility){return null}
  const prodName=product.name!

  if(product.additionalProperty!.some(propValue=>propValue.propertyID==='10' && propValue.name==='category')){
    const additionalProp:PropertyValue[]=product.isVariantOf!.additionalProperty!

    if(additionalProp.length){return null}

    return <p>{prodName}</p>
  }

  return null
}

export default Card