// deno-lint-ignore-file no-explicit-any
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useEffect} from 'preact/hooks'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import WishlistButton from "deco-sites/shp/islands/WishlistButton.tsx";
import {Runtime} from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from "deco-sites/shp/types/types.ts";
import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'

export interface Props{
  product:any
  pix?:string
}

interface CardProps{
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  isAvailable:boolean
  pix:string
  objTrust:ObjTrust
  trustPercent:number
} 

interface CardPCProps extends CardProps{
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  frete?:string
}

const ProdCard=({...props}:CardProps)=>{
  const {prodId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe, isAvailable, pix} = props

  const salePricePix=DescontoPIX(precoVista, parseFloat(pix))
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))

  return(
    <a className='flex flex-col h-[370px] w-full bg-[#262626] rounded-lg border
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
      <div className='flex px-3 pt-3 h-auto w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg'>-{diffPercent}%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col-reverse justify-items-end ml-0 w-full h-[50%] pb-4'>
        <p className='text-sm line-clamp-2 px-3'>
          {prodName}
        </p>
        <div className='flex items-center justify-center my-[20px]'> 
          <hr className='block border-t-[#111] w-full'/>
          {/* Trustvox */}
          {props.objTrust?.average ===0 ? null :
            <div className='flex justify-center items-center absolute'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
              </div>
              <span className='text-yellow-300 text-xs'>({props.objTrust?.count})</span>
            </div>
          }
        </div>
        <div className='flex flex-col px-3'>
          {isAvailable ? (
            <>
              <span className='line-through text-[#b4b4b4] text-xs'>De: {precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
              <p className='text-xs'><span className='text-green-500 text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span> no pix</p>
              <span className='text-xs text-[#b4b4b4]'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</span>
            </>):(
              <p className='text-xl text-[#dd1f26] font-bold'>Produto Esgotado</p>
            )}
        </div>
      </div>
    </a>
  )
}

const PcCard=({...props}:CardPCProps)=>{
  const {prodId, prodName, precoVista, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, valorParcela, isAvailable, pix, precoDe} = props
  const salePricePix=DescontoPIX(precoVista, parseFloat(pix))
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))
  const arm=(armazenamento || '').toString().toUpperCase()
  const {PCs, addPC, removePC}:CompareContextType=useCompareContext()

  return(
    <a className='flex flex-col h-[370px] w-full bg-[#262626] rounded-lg p-0 border relative
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
      <div className='flex flex-col px-3 pt-8 re1:pt-3 h-auto w-auto'>
        <div>
          <div className='flex items-center justify-start mt-[-12%] re1:mt-0'>
            {/* Trustvox */}
            {props.objTrust?.average ===0 ? null :
              <div className='flex justify-center items-center absolute'>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
                </div>
                <span className='text-yellow-300 text-xs'>({props.objTrust?.count})</span>
              </div>
            }
          </div>
          <span className={`absolute h-[30px] w-[35px] ${props.objTrust?.average !==0 && 'mt-[8%] re1:mt-[6%]'} flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg`}>-{diffPercent}%</span>
        </div>
        <div className='absolute ml-[65%] re1:ml-[73%] mt-[-18%] re1:mt-[-6.5%]'><WishlistButton productID={prodId} variant='icon'/></div>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
        <div className='text-green-500 flex flex-col gap-1 w-[85px] absolute mt-[45%] re1:mt-[50%]'>
          <p className='text-white font-bold line-clamp-1 text-xs bg-[#000000] bg-opacity-90 px-1'>{processador}</p>
          <p className='font-bold line-clamp-2 text-xs bg-[#000000] bg-opacity-90 px-1'>{placaVideo}</p>
        </div>
      </div>
      <div className='flex flex-col px-3 justify-between my-auto h-[40%]'>
        <p className='text-sm line-clamp-2 leading-4'>
          {prodName}
        </p>
        <div className='flex justify-between re1:justify-start re1:gap-2'>
          <label className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[10px] line-clamp-1'>{memoria}</p>
          </label>
          <label className='flex items-center gap-1 w-[80px]'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[10px] line-clamp-1'>{(arm.includes('HD') || arm.includes('SSD')) ? 
              armazenamento: `${tipoArm} ${arm}`}
            </p>
          </label>
        </div>
        {isAvailable ? (
        <>
          <span className='text-xl font-bold text-green-500 leading-3 mt-4'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
          <p className='text-[11px] text-[#b4b4b4]'>ou por {salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
        </>) : (<p className='text-xl text-[#dd1f26] font-bold'>Produto Esgotado</p>)}
        <label className='flex gap-2 text-sm items-center'>
          <input type='checkbox' name='compare' id='COMPARE-PC' className='checkbox checkbox-primary checkbox-sm' onChange={(event)=>{
              const Target=event.target as HTMLInputElement
              const pcObj:PcContextProps={
                placaVideo, processador, memoria, armazenamento:arm, tipoArm, flagPercent:diffPercent,
                name:prodName, id:prodId, parcelas, valorParcela, precoDe, precoVista:salePricePix, linkProd, imgUrl, pix
              }
              Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
          }}/>
          <p>Compare</p>
        </label>
      </div>
    </a>
  )
}


const Card=({product, pix='12'}:Props)=>{
  const PCGamer=product.categoriesIds.includes('/10/')
  const image=product.items[0].images[0].imageUrl
  const prodId=product.productId
  const name=product.productName
  const priceVista=product.items[0].sellers[0].commertialOffer.Price
  const priceDe=product.items[0].sellers[0].commertialOffer.ListPrice
  const linkProduto='/'+product.linkText+'/p'
  const avaibility=product.items[0].sellers[0].commertialOffer.IsAvailable

  const installments=product.items[0].sellers[0].commertialOffer.Installments

  const maxInstallments=(()=>{
    let maxInstallments=0

    installments.forEach((installment:any)=>{
      installment.NumberOfInstallments > maxInstallments && (maxInstallments=installment.NumberOfInstallments)
    })

    return maxInstallments
  })()

  const valorParcela=installments.find((installment:any)=>installment.NumberOfInstallments===maxInstallments)?.value || priceVista/maxInstallments

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':prodId, 'average':0, 'count':0, 'product_name':name})
  const [trustPercent, setTrustPercent]=useState(0)
    
  useEffect(()=>{
    const handleTrust=async()=>{
      const data=await Runtime.invoke({
        key:'deco-sites/shp/loaders/getTrustvox.ts',
        props:{productId:prodId, storeId:'79497'}
      })
      const {products_rates}:{products_rates:ObjTrust[]}=data
      const obj:ObjTrust=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:prodId, average:0, count:0, product_name:name})
    }
    handleTrust()
  },[])

  if(PCGamer){
    return <PcCard  armazenamento={product.SSD || product.HD} imgUrl={image} prodName={name} memoria={product.Memória} objTrust={{'product_code':prodId, 'average':0, 'count':0, 'product_name':name}} trustPercent={0}
    placaVideo={product['Placa de vídeo']} linkProd={linkProduto} prodId={prodId} precoDe={priceDe} precoVista={priceVista} isAvailable={avaibility}
    processador={product.Processador} tipoArm={product.SSD ? 'SSD' : 'HD'} parcelas={maxInstallments}  valorParcela={valorParcela} pix={pix}/>
  }else{
    return <ProdCard imgUrl={image} linkProd={linkProduto} precoDe={priceDe} precoVista={priceVista} parcelas={maxInstallments} objTrust={objTrust}
      trustPercent={trustPercent} prodId={prodId} prodName={name} valorParcela={valorParcela} isAvailable={avaibility} pix={pix}/>
  }
}

export default Card