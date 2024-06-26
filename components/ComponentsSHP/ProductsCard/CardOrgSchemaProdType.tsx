// deno-lint-ignore-file no-explicit-any
import { Offer, Product, PropertyValue } from 'apps/commerce/types.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useEffect, useRef} from 'preact/hooks'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'
import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { useOffer } from 'deco-sites/shp/sdk/useOffer.ts'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

export interface Props{
  product:Product
  /**@description  pro evento de select_item do GA4*/
  item_list_id?:string
  /**@description  pro evento de select_item do GA4*/
  item_list_name?:string

  descontoPix:number
}

interface ProdCard{
  refId:string
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  pix:number
  objTrust?:ObjTrust
  trustPercent?:number
  isAvailable:boolean
  GA4Func?:()=>void
}

interface PcCard extends ProdCard{
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  fonte:string
  seller:string
  groupId:string
}


const ProdCard=({...props}:ProdCard)=>{
  const {prodId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe, isAvailable, pix} = props
  const salePricePix=DescontoPIX(precoVista, pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>({'product_code':prodId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await invoke['deco-sites/shp'].loaders.getTrustvox({productId:prodId, storeId:'79497'})

      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({'product_code':prodId, 'average':0, 'count':0, 'product_name':prodName})
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-col h-[370px] w-full max-w-[250px] bg-[#262626] rounded-lg border relative
    border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd} onClick={props.GA4Func}>
      <div className='flex px-3 pt-3 h-auto w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg'>-{diffPercent}%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low' preload={false} alt={prodName} title={prodName}/>
      </div>
      <div className='flex flex-col-reverse justify-items-end ml-0 w-full h-[50%] pb-4'>
        <p className='text-sm line-clamp-2 px-3 text-secondary'>
          {prodName}
        </p>
        <div className='flex items-center justify-center my-[20px]'> 
          <hr className='block border-t-base-100 w-full'/>
          {/* Trustvox */}
          {objTrust?.average ===0 ? null :
            <div className='flex justify-center items-center absolute'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
              </div>
              <span className='text-yellow-300 text-xs'>({objTrust?.count})</span>
            </div>
          }
        </div>
        <div className='flex flex-col px-3'>
          {isAvailable ? (
            <>
              <span className='line-through text-[#b4b4b4] text-xs'>De: {precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
              <p className='text-xs'><span className='text-success text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span> no pix</p>
              <span className='text-xs text-[#b4b4b4]'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</span>
            </>):(
              <p className='text-xl text-primary font-bold'>Produto Esgotado</p>
            )}
        </div>
      </div>
    </a>
  )
}

const PcCard=({...props}:PcCard)=>{
  const {prodId, prodName, precoVista, valorParcela, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, precoDe, isAvailable, pix, fonte} = props
  const salePricePix=DescontoPIX(precoVista, pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>({'product_code':prodId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)

  const compareInput=useRef<HTMLInputElement>(null)
  const {PCs, addPC, removePC}:CompareContextType=useCompareContext()
  const pcObj:PcContextProps={
    placaVideo, processador, memoria, armazenamento, tipoArm, flagPercent:diffPercent, fonte, groupId:props.groupId, seller:props.seller,
    name:prodName, id:prodId, parcelas, valorParcela, precoDe, precoVista, linkProd, imgUrl, pix
  }

  useEffect(()=>{
    if(!PCs.some((pc)=>pc.id===pcObj.id && pc.name===pcObj.name)){
      compareInput.current && (compareInput.current.checked=false)
    }
  },[PCs])

  return(
    <a className='flex flex-col h-[370px] w-full max-w-[250px] bg-[#262626] rounded-lg p-0 border relative
    border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd} onClick={props.GA4Func}>
      <div className='flex flex-col px-3 pt-8 re1:pt-3 h-auto w-auto'>
        <div>
          <div className='flex items-center justify-start mt-[-12%] re1:mt-0'>
            {/* Trustvox */}
            {objTrust?.average ===0 ? null :
              <div className='flex justify-center items-center absolute'>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
                </div>
                <span className='text-yellow-300 text-xs'>({objTrust?.count})</span>
              </div>
            }
          </div>
          <span className={`absolute h-[30px] w-[35px] ${objTrust?.average !==0 && 'mt-[8%] re1:mt-[6%]'} flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg`}>-{diffPercent}%</span>
        </div>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low' preload={false} alt={prodName} title={prodName}/>
        <div className='text-success flex flex-col gap-1 w-[85px] absolute mt-[45%] re1:mt-[50%]'>
          <p className='text-secondary font-bold line-clamp-1 text-xs bg-[#000000] bg-opacity-90 px-1'>{processador}</p>
          <p className='font-bold line-clamp-2 text-xs bg-[#000000] bg-opacity-90 px-1'>{placaVideo}</p>
        </div>
      </div>
      <div className='flex flex-col px-3 justify-between my-auto h-[40%]'>
        <p className='text-sm line-clamp-2 leading-4 text-secondary'>
          {prodName}
        </p>
        <div className='flex justify-between re1:justify-start re1:gap-2'>
          <label className='flex items-center gap-1' title={memoria}>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync' preload={false}
            />
            <p className='text-[12px] line-clamp-1'>{memoria}</p>
          </label>
          <label className='flex items-center gap-1 w-[80px]' title={(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync' preload={false}
            />
            <p className='text-[12px] line-clamp-1'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}
            </p>
          </label>
        </div>
        {isAvailable ? (
        <>
          <span className='text-lg font-bold text-success leading-3 mt-4'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
          <p className='text-[11px] text-[#b4b4b4]'>ou por {salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
        </>) : (<p className='text-xl text-primary font-bold'>Produto Esgotado</p>)}
        <label className='flex gap-2 text-sm items-center text-secondary'>
          <input ref={compareInput} type='checkbox' name='compare' id='COMPARE-PC' className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' onChange={(event)=>{
            const Target=event.target as HTMLInputElement
            Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
          }}/>
          <p>Compare</p>
        </label>
      </div>
    </a>
  )
}

const replaceListInfo=globalThis.window.location.pathname

const Card=({product, item_list_id=replaceListInfo, item_list_name=replaceListInfo, descontoPix}:Props)=>{
  const avaibility=product.offers!.offers[0].availability==='https://schema.org/InStock'

  if(!avaibility){
    return null
  }

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

  const { seller } = useOffer(product.offers)
  const prodName=product.name!
  const prodId=product.productID
  const refId=product.inProductGroupWithID!
  const groupId=product.inProductGroupWithID ?? product.isVariantOf?.productGroupID ?? ''
  const precoDe=offer.priceSpecification.find(item=>item.priceType==='https://schema.org/ListPrice')!.price!
  const precoVista=offer.price!
  const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)!.billingIncrement!

  
  const handleClick=()=>{
    sendEvent({name:'select_item', params:{
      item_list_id,
      item_list_name,
      items:[product as any]
    }})
  }

  if(product.additionalProperty!.some(propValue=>propValue.propertyID==='10' && propValue.name==='category')){
    const additionalProp:PropertyValue[]=product.isVariantOf!.additionalProperty!

    if(!additionalProp.length){return null}

    const armaz=(additionalProp.find(propVal=>propVal.name==='SSD') || additionalProp.find(propVal=>propVal.name==='HD'))!

    return <PcCard
      refId={refId} 
      groupId={groupId}
      seller={seller ?? '1'}
      placaVideo={additionalProp.find(item=>item.name==='Placa de vídeo')?.value ?? ''}
      processador={additionalProp.find(item=>item.name==='Processador')?.value ?? ''}
      armazenamento={armaz?.value ?? ''}
      tipoArm={armaz?.name ?? ''}
      memoria={additionalProp.find(item=>item.name==='Memória')?.value ?? ''}
      parcelas={maxInstallments}
      fonte={additionalProp.find(item=>item.name==='Fonte')?.value ?? ''}
      imgUrl={imgUrl}
      pix={descontoPix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      isAvailable={avaibility}
      GA4Func={handleClick}
    />
  }else{
    return <ProdCard
      refId={refId}
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={descontoPix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      isAvailable={avaibility}
      GA4Func={handleClick}
    />
  }
}

export default Card
