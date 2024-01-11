import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import { useEffect, useState } from 'preact/hooks'
import { JSX } from 'preact'
import { renderToString } from 'preact-render-to-string'
import Image from 'deco-sites/std/components/Image.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts';
import {invoke} from 'deco-sites/shp/runtime.ts'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage>
}

const recomendacoesLoader = async (param: string) => {
  const url = 'https://api.shopinfo.com.br/vitrines/recomendacoes.php'
  const formData = new FormData()
  formData.append('data', param)
  const data:Array<Record<string,string>>[] =
    (await fetch(url, {
      method: 'POST',
      body: formData,
    }).then((r) => r.json()).catch((err) => console.error('Error: ' + err))) || []

  return data
}

interface PcInfos {
  id: string;
  name: string;
  priceVista: string;
  valorParcela: string;
  parcela: number;
  link: string;
  image: string;
  placaVideo: string;
  processador: string;
  memoria: string;
  armazenamento: string;
  classArmazenamento: string;
  tipoArmazenamento: string;
  precoDe: string;
  priceParcelado: string;
  flags: Array<{
    class: string;
    name: string;
  }>
}

const recomendacoesV2Loader = async (param: string) => {
  const url = 'https://api.shopinfo.com.br/vitrines/recomendacoesV2.php'
  const formData = new FormData()
  formData.append('data', param)
  const data:PcInfos[] =
    (await fetch(url, {
      method: 'POST',
      body: formData,
    }).then((r) => r.json()).catch((err) => console.error('Error: ' + err))) || []

  return data
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

const ProdCard=({...props}:ProdCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe} = props

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await invoke['deco-sites/shp'].loaders.getTrustvox({productId, storeId:'79497'})
      
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-[90vw] re1:w-[18%] bg-[#262626] rounded-lg p-3 re1:p-0 border border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd.replace('https://www.shopinfo.com.br','')}>
      <div className='flex re1:px-3 re1:pt-3 w-[30%] h-auto re1:w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg'>-12%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col re1:flex-col-reverse justify-between w-[65%] ml-[5%] re1:ml-0 re1:w-full re1:h-[50%] re1:pb-3'>
        <p className='text-xs re1:text-sm max-h-[30%] line-clamp-2 re1:px-3'>
          {prodName}
        </p>
        <div className='flex items-center justify-start re1:justify-center'> 
          <hr className='hidden re1:block border-t-base-100 w-full'/>
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
          <span className='line-through text-base-content text-xs'>{precoDe}</span>
          <p className='text-xs'><span className='text-success text-lg font-bold'>{DescontoPIX(parseFloat(precoVista), 12).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span> no pix</p>
          <span className='text-xs text-base-content'>{parcelas}x R$ {valorParcela} sem juros</span>
        </div>
      </div>
    </a>
  )
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

const PcCard=({...props}:PcCard)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, precoDe, precoParcelado} = props
  const precoDeNum=precoDe!=='' ? parseFloat((precoDe.split('R$ ')[1]).replace('.','').replace(',','.')) : parseFloat(precoParcelado.replace('.','').replace(',','.'))
  const vistaNum=parseFloat(precoVista.replace('.','').replace(',','.'))
  const percent=precoDe!=='' ? Math.floor(((precoDeNum - vistaNum) / precoDeNum) * 100) : 15

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
  const [trustPercent, setTrustPercent]=useState(0)

  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await invoke['deco-sites/shp'].loaders.getTrustvox({productId, storeId:'79497'})
      
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-[90vw] re1:w-[18%] bg-[#262626] rounded-lg p-3 re1:p-0 border border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' 
      href={linkProd.replace('https://www.shopinfo.com.br','')}
    >
      <div className='flex re1:px-3 re1:pt-3 w-[30%] h-auto re1:w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg'>-{percent}%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col re1:flex-col-reverse justify-between w-[65%] ml-[5%] re1:ml-0 re1:w-full re1:h-[50%] re1:pb-3'>
        <div className='re1:px-3'>
          <p className='text-success font-bold line-clamp-1 text-xs re1:text-base'>{placaVideo}</p>
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
          <hr className='hidden re1:block border-t-base-100 w-full'/>
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
          <span className='line-through text-base-content text-xs leading-3'>{precoDe!=='' ? precoDe : `DE: R$ ${precoDeNum}`}</span>
          <p className='text-xs'><span className='text-success text-lg font-bold'>{precoVista}</span> no pix</p>
          <span className='text-xs text-base-content leading-3'>{parcelas}x R$ {valorParcela} sem juros</span>
        </div>
      </div>
    </a>
  )
}

const ProductRecommendedProds = ({ page }: Props) => {
  const { product } = page
  const prodID = product.isVariantOf!.productGroupID
  const prodSKU = product.sku
  const param = `["${prodID}#${prodSKU}"]`

  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')

  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([])
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)

  useEffect(()=>{
    setHtmlContent([<div className='loading loading-spinner text-primary loading-lg'/>])
  },[])

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      PCGamer?
      (async()=>{
        const data=await recomendacoesV2Loader(param)
        console.log(data)
        const elements:JSX.Element[]=data.map(item=>
          <PcCard productId={item.id} prodName={item.name} precoVista={item.priceVista} valorParcela={item.valorParcela} parcelas={item.parcela}
            linkProd={item.link} imgUrl={item.image} precoDe={item.precoDe} armazenamento={item.armazenamento} precoParcelado={item.priceParcelado}
            memoria={item.memoria} placaVideo={item.placaVideo} processador={item.processador} tipoArm={item.tipoArmazenamento}
          />
        )
        setHtmlContent(elements)
      })()
    :
      (async()=>{
        const data=await recomendacoesLoader(param)
        console.log(data)
        const elements:JSX.Element[]=data[0].map(item=>{
          const arr=item.index.split('#')
          return <ProdCard productId={arr[0]} prodName={arr[1]} precoVista={arr[2]} valorParcela={arr[3]} parcelas={arr[4]} linkProd={arr[5]} imgUrl={arr[6]} precoDe={arr[7]}/>
        })
        setHtmlContent(elements)
      })()
    }
    setAlreadyOpened(true)
  }

  return (
    <div className='w-full re1:px-[10%] border-b border-b-neutral'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p className='w-[90%] re1:w-auto'>Produtos Recomendados</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? '!block' : '!hidden'}`}>
        <div className='flex flex-col re1:flex-row gap-4 items-center justify-center my-[20px]'>
          {htmlContent.map(item=>item)}
        </div>
      </div>
    </div>
  )
}

export default ProductRecommendedProds
