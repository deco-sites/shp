import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import { useEffect, useState } from 'preact/hooks'
import { JSX } from 'preact'
import { renderToString } from 'preact-render-to-string'
import Image from 'deco-sites/std/components/Image.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx'

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

  return(
    <a className='flex flex-col h-[370px] w-full max-w-[250px] bg-[#262626] rounded-lg p-0 border relative
    border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd.replace('https://www.shopinfo.com.br','')}>
      <div className='flex flex-col px-3 pt-8 re1:pt-3 h-auto w-auto'>
        <div>
          <span className={`absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg`}>-{percent}%</span>
        </div>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
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
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[12px] line-clamp-1'>{memoria}</p>
          </label>
          <label className='flex items-center gap-1 w-[100px]' title={(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[12px] line-clamp-1'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}
            </p>
          </label>
        </div>
        <span className='text-lg font-bold text-success leading-3 mt-4'>{parcelas}x {parseFloat(valorParcela).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
        <p className='text-[11px] text-[#b4b4b4]'>ou por {DescontoPIX(parseFloat(precoVista), 12).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
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

  useEffect(()=>{
    openMenu && !alreadyOpened && sendEvent({name:'select_content', params:{content_type:'recomendedProds'}})
  },[openMenu])

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
