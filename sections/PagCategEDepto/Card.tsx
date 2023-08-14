// deno-lint-ignore-file no-explicit-any
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useEffect} from 'preact/hooks'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

export interface Props{
  product:any
}

interface PcCard{
  productId:string
  prodName:string
  precoVista:string
  valorParcela:string
  parcelas:number
  linkProd:string
  imgUrl:string
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  precoDe:string
  precoParcelado:string
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
}

const loaderTrustvox= async (productId:string, storeId:string)=>{
  const url=`https://trustvox.com.br/widget/shelf/v2/products_rates?codes[]=${productId}&store_id=${storeId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

const ProdCard=({...props}:ProdCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe} = props

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await loaderTrustvox(productId, '79497')
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-full bg-[#262626] rounded-lg p-3 re1:p-0 border
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
      <div className='flex re1:px-3 re1:pt-3 w-[30%] h-auto re1:w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg'>-12%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col re1:flex-col-reverse justify-between w-[65%] ml-[5%] re1:ml-0 re1:w-full re1:h-[50%] re1:pb-3'>
        <p className='text-xs re1:text-sm max-h-[30%] line-clamp-2 re1:px-3'>
          {prodName}
        </p>
        <div className='flex items-center justify-start re1:justify-center'> 
          <hr className='hidden re1:block border-t-[#111] w-full'/>
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
        <div className='flex flex-col re1:px-3'>
          <span className='line-through text-base-300 text-xs'>{precoDe}</span>
          <p className='text-xs'><span className='text-green-500 text-lg font-bold'>R$ {DescontoPIX(parseFloat(precoVista), 12)}</span> no pix</p>
          <span className='text-xs text-base-300'>{parcelas}x R$ {valorParcela} sem juros</span>
        </div>
      </div>
    </a>
  )
}

const PcCard=({...props}:PcCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, precoDe, precoParcelado} = props
  const precoDeNum=precoDe!=='' ? parseFloat(precoDe.toString().replace('.','').replace(',','.')) : parseFloat(precoParcelado.replace('.','').replace(',','.'))
  const vistaNum=parseFloat(precoVista.toString().replace('.','').replace(',','.'))
  const percent=precoDe!=='' ? Math.floor(((precoDeNum - vistaNum) / precoDeNum) * 100) : 12

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await loaderTrustvox(productId, '79497')
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-full bg-[#262626] rounded-lg p-3 re1:p-0 border
    border-transparent hover:re1:border-[#dd1f26] hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-[#dd1f26]' href={linkProd}>
      <div className='flex re1:px-3 re1:pt-3 w-[30%] h-auto re1:w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg'>-{percent}%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col re1:flex-col-reverse justify-between w-[65%] ml-[5%] re1:ml-0 re1:w-full re1:h-[50%] re1:pb-3'>
        <div className='re1:px-3'>
          <p className='text-green-500 font-bold line-clamp-1 text-xs re1:text-base'>{placaVideo}</p>
          <div className='flex justify-between'>
            <label className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
                width={15}
                height={15}
                loading='lazy'
                fetchPriority='low' decoding='sync'
              />
              <p className='text-xs line-clamp-1'>{processador}</p>
            </label>
            <label className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
                width={15}
                height={15}
                loading='lazy'
                fetchPriority='low' decoding='sync'
              />
              <p className='text-xs line-clamp-1'>{memoria}</p>
            </label>
            <label className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
                width={15}
                height={15}
                loading='lazy'
                fetchPriority='low' decoding='sync'
              />
              <p className='text-xs line-clamp-1'>{tipoArm} {armazenamento}</p>
            </label>
          </div>
        </div>
        <div className='flex items-center justify-start re1:justify-center'> 
          <hr className='hidden re1:block border-t-[#111] w-full'/>
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
        <div className='flex flex-col re1:px-3'>
          <p className='text-xs re1:text-sm max-h-[30%] line-clamp-1 leading-3 re1:leading-4'>
            {prodName}
          </p>
          <span className='line-through text-base-300 text-xs leading-3'>{precoDe!=='' ? precoDe : `DE: R$ ${precoDeNum}`}</span>
          <p className='text-xs'><span className='text-green-500 text-lg font-bold'>R$ {precoVista}</span> no pix</p>
          <span className='text-xs text-base-300 leading-3'>{parcelas}x R$ {valorParcela} sem juros</span>
        </div>
      </div>
    </a>
  )
}


const Card=({product}:Props)=>{
  const PCGamer=product.categoriesIds.includes('/10/')
  const image=product.items[0].images[0].imageUrl
  const productId=product.productId
  const name=product.productName
  const priceVista=product.items[0].sellers[0].commertialOffer.Price
  const priceDe=product.items[0].sellers[0].commertialOffer.ListPrice
  const linkProduto=product.linkText+'/p'

  if(PCGamer){
    return <PcCard  armazenamento={product.SSD || product.HD} imgUrl={image} prodName={name} memoria={product.Memória} 
    placaVideo={product['Placa de vídeo']} linkProd={linkProduto} productId={productId} precoDe={priceDe} precoVista={priceVista}
    processador={product.Processador} tipoArm={product.SSD ? 'SSD' : 'HD'} parcelas={10} precoParcelado={priceVista} valorParcela={(parseFloat(priceVista)/10).toFixed(2)}/>
  }else{
    return <ProdCard imgUrl={image} linkProd={linkProduto} precoDe={priceDe} precoVista={priceVista} parcelas={'10'} productId={productId} prodName={name} valorParcela={(parseFloat(priceVista)/10).toFixed(2)}/>
  }
}

export default Card