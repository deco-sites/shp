import { Offer, Product, PropertyValue } from 'deco-sites/std/commerce/types.ts'

//promoção baseada entre o listPrice e o salePrice com desconto do pix

interface CardProps{
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  pix:string
} 

interface CardPCProps extends CardProps{
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  frete:string
}

export type Props={
  product:Product
  frete?:string
}

const CardProd=(props:CardProps)=>{
  return <p>{props.parcelas}x de {props.valorParcela}</p>
}

const CardPC=({placaVideo, processador, memoria, armazenamento, tipoArm,...props}:CardPCProps)=>{
  return <p>{props.parcelas}x de {props.valorParcela}</p>
}

const Card=({product, frete}:Props)=>{
  const additionalProp:PropertyValue[]=product.isVariantOf!.additionalProperty!
  const offer=product.offers!.offers![0]!

  const imgUrl=product.image![0].url!
  const maxInstallments=(()=>{
    let maxInstallments=0

    offer.priceSpecification.forEach((item)=>{
      if (item.priceComponentType === "https://schema.org/Installment") {
        const { billingDuration } = item
    
        if(billingDuration! > maxInstallments){maxInstallments = billingDuration!}
      }
    })

    return maxInstallments
  })()
  const linkProd=product.isVariantOf!.url!
  const pix=offer.teasers!.find(item=>item.name.toUpperCase().includes('PIX'))!.effects.parameters[0].value!
  const prodName=product.name!
  const prodId=product.productID!
  const precoDe=offer.priceSpecification.find(item=>item.priceType==='https://schema.org/ListPrice')!.price!
  const precoVista=offer.price!
  const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)!.billingIncrement!


  if(additionalProp.some(propValue=>propValue.propertyID==='10' && propValue.name==='category')){
    const armaz=(additionalProp.find(propVal=>propVal.name==='SSD') || additionalProp.find(propVal=>propVal.name==='HD'))!
    
    return <CardPC 
      placaVideo={additionalProp.find(item=>item.name==='Placa de vídeo')!.value!}
      processador={additionalProp.find(item=>item.name==='Processador')!.value!}
      armazenamento={armaz.value!}
      tipoArm={armaz.name!}
      memoria={additionalProp.find(item=>item.name==='Memória')!.value!}
      frete={frete!}
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={pix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
    />
  }else{
    return <CardProd
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={pix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
    />
  }
}

export default Card