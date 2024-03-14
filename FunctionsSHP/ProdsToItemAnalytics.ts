// deno-lint-ignore-file no-explicit-any
import { AnalyticsItem, Product } from "apps/commerce/types.ts";

export const OrgSchemaToAnalytics:(prods:Product[])=>AnalyticsItem[]=(prods)=>{
  const finalArr:AnalyticsItem[]=[]
  
  prods.forEach(prod=>{
    const item_id=prod?.isVariantOf?.model
    const item_name=prod?.name ?? ''
    const item_url=prod?.isVariantOf?.url
    const item_brand=prod?.brand?.name
    const price=prod?.offers?.offers[0].price
    const categs=prod.category?.split('>').toReversed() ?? []
    const quantity=1

    const finalObj:AnalyticsItem={
      item_id, item_name, item_url, price, item_brand, quantity,
      item_category:categs[0], item_category2:categs[1], item_category3:categs[2]
    }

    finalArr.push(finalObj)
  })

  return finalArr
}

export const VtexTypeToAnalytics:(prods:any)=>AnalyticsItem[]=(prods)=>{
  const finalArr:AnalyticsItem[]=[]

  prods.forEach((prod:any)=>{
    const item_id=prod.productReferenceCode ?? prod.productReference
    const item_name=prod.productName
    const item_url='/'+prod.linkText+'/p'
    const item_brand=prod.brand
    const price=prod.items[0].sellers[0].commertialOffer.Price
    const categs=prod.categories
    const quantity=1

    const finalObj:AnalyticsItem={
      item_id, item_name, item_url, price, item_brand, quantity,
      item_category:categs[0], item_category2:categs[1], item_category3:categs[2]
    }

    finalArr.push(finalObj)
  })

  return finalArr
}