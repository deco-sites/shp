import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useEffect} from 'preact/hooks'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import WishlistButton from 'deco-sites/shp/islands/WishlistButton.tsx'
import { Product } from 'deco-sites/std/commerce/types.ts'
import {Runtime} from 'deco-sites/shp/runtime.ts'

export interface Props{
  product:Product
}

interface PcCard{
  productId:string
  prodName:string
  precoVista:string
  valorParcela:string
  parcelas:number
  linkProd:string
  imgUrl:string
  isAvailable:boolean
  precoDe:string
  precoParcelado:string
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
}

interface ProdCard{
  productId:string
  prodName:string
  precoVista:string
  valorParcela:string
  parcelas:string
  imgUrl:string
  linkProd:string
  precoDe:string
  isAvailable:boolean
}

const tagDiscount=(price:number, listPrice:number, pix?:number)=>{
  const precoOriginal = listPrice
  const precoComDesconto  = pix ? price-(price*(pix/100)) : price
  const desconto = precoOriginal - precoComDesconto
  return Math.ceil((desconto / precoOriginal)*100)
}

const ProdCard=({...props}:ProdCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe, isAvailable} = props

  const precoDeNum=parseFloat(precoDe)
  const vistaNum=parseFloat(precoVista)
  const percent= precoDeNum ? tagDiscount(vistaNum,precoDeNum,12) : 12

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>({'product_code':productId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await Runtime.invoke({
        key:'deco-sites/shp/loaders/getTrustvox.ts',
        props:{productId, storeId:'79497'}
      })
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({'product_code':productId, 'average':0, 'count':0, 'product_name':prodName})
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-col h-[370px] w-full bg-[#262626] rounded-lg border
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
      <div className='flex px-3 pt-3 h-auto w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg'>-{percent}%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col-reverse justify-items-end ml-0 w-full h-[50%] pb-4'>
        <p className='text-sm line-clamp-2 px-3'>
          {prodName}
        </p>
        <div className='flex items-center justify-center my-[20px]'> 
          <hr className='block border-t-[#111] w-full'/>
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
              <span className='line-through text-[#b4b4b4] text-xs'>De: {precoDeNum.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
              <p className='text-xs'><span className='text-green-500 text-xl font-bold'>{parseFloat(DescontoPIX(parseFloat(precoVista),12)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span> no pix</p>
              <span className='text-xs text-[#b4b4b4]'>{parcelas}x {parseFloat(valorParcela).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</span>
            </>):(
              <p className='text-xl text-[#dd1f26] font-bold'>Produto Esgotado</p>
            )}
        </div>
      </div>
    </a>
  )
}

const PcCard=({...props}:PcCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, precoDe, precoParcelado, isAvailable} = props
  const precoDeNum=parseFloat(precoDe)
  const vistaNum=parseFloat(precoVista)
  const percent= precoDeNum ? tagDiscount(vistaNum,precoDeNum,12) : 12
  const arm=(armazenamento || '').toString().toUpperCase()

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>({'product_code':productId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)
  
  // useEffect(()=>{
  //   const handleTrust=async()=>{
  //     const { products_rates }=await Runtime.invoke({
  //       key:'deco-sites/shp/loaders/getTrustvox.ts',
  //       props:{productId, storeId:'79497'}
  //     })
  //     const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
  //     obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({'product_code':productId, 'average':0, 'count':0, 'product_name':prodName})
  //     console.log(obj)
  //   }
  //   handleTrust()
  // },[])

  return(
    <a className='flex flex-col h-[370px] w-full bg-[#262626] rounded-lg p-0 border relative
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
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
          <span className={`absolute h-[30px] w-[35px] ${objTrust?.average !==0 && 'mt-[8%] re1:mt-[6%]'} flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg`}>-{percent}%</span>
        </div>
        <div className='absolute ml-[65%] re1:ml-[73%] mt-[-18%] re1:mt-[-6.5%]'><WishlistButton productID={productId} variant='icon'/></div>
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
          <span className='text-xl font-bold text-green-500 leading-3 mt-4'>{parcelas}x {parseFloat(valorParcela).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
          <p className='text-[11px] text-[#b4b4b4]'>ou por {parseFloat(DescontoPIX(parseFloat(precoVista),12)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
        </>) : (<p className='text-xl text-[#dd1f26] font-bold'>Produto Esgotado</p>)}
        <label className='flex gap-2 text-sm items-center'>
          <input type='checkbox' name='compare' className='checkbox checkbox-primary checkbox-sm'/>
          <p>Compare</p>
        </label>
      </div>
    </a>
  )
}


const Card=({product}:Props)=>{
  const PCGamer=product.category!.includes('Computadores gamer')
  const image=product.image![0].url!
  const productId=product.productID!
  const name=product.name!
  const priceVista=product.offers!.offers[0].price
  const priceDe=product.offers!.offers[0].priceSpecification.find(price=>price.priceType==='https://schema.org/ListPrice')!.price
  const linkProduto=product.url!
  const avaibility=product.offers!.offers[0].availability==='https://schema.org/InStock'
  const addProp=product.isVariantOf!.additionalProperty

  if(PCGamer){
    return <PcCard  armazenamento={addProp.find(item=>(item.name==='SSD' || item.name==='HD'))!.value!} imgUrl={image} prodName={name} memoria={addProp.find(item=>item.name==='Memória')!.value!} 
    placaVideo={addProp.find(item=>item.name==='Placa de vídeo')!.value!} linkProd={linkProduto} productId={productId} precoDe={priceDe.toString()} precoVista={priceVista.toString()} isAvailable={avaibility}
    processador={addProp.find(item=>item.name==='Processador')!.value!} tipoArm={addProp.find(item=>item.name==='SSD') ? 'SSD' : 'HD'} parcelas={10} precoParcelado={priceVista.toString()} valorParcela={(priceVista/10).toFixed(2)}/>
  }else{
    return <ProdCard imgUrl={image} linkProd={linkProduto} precoDe={priceDe.toString()} precoVista={priceVista.toString()} parcelas={'10'} productId={productId} prodName={name} valorParcela={(priceVista/10).toFixed(2)} isAvailable={avaibility}/>
  }
}

export default Card