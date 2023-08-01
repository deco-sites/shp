import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import { useEffect, useState } from 'preact/hooks'
import { JSX } from 'preact'
import { renderToString } from 'preact-render-to-string'
import Image from 'deco-sites/std/components/Image.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts';
//import ProdRecommended from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/ProdRecommended.tsx'

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

const recomendacoesV2Loader = async (param: string) => {
  const url = 'https://api.shopinfo.com.br/vitrines/recomendacoesV2.php'
  const formData = new FormData()
  formData.append('data', param)
  const data =
    (await fetch(url, {
      method: 'POST',
      body: formData,
    }).then((r) => r.json()).catch((err) => console.error('Error: ' + err))) || []

  return data
}

const loaderTrustvox= async (productId:string, storeId:string)=>{
  const url=`https://trustvox.com.br/widget/shelf/v2/products_rates?codes[]=${productId}&store_id=${storeId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
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
    const batata=async()=>{
      const { products_rates }=await loaderTrustvox(productId, '79497')
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    console.log('obj')

    batata()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-[90vw] re1:w-[18%] bg-[#262626] rounded-lg p-3 re1:p-0 border
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
    setHtmlContent([<div className='loading loading-spinner text-[#dd1f26] loading-lg'/>])
  },[])

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      PCGamer?
      (async()=>{
        const data=await recomendacoesV2Loader(param)
        console.log(data)
      })()
    :
      (async()=>{
        const data=await recomendacoesLoader(param)
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
    <div className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Produtos Recomendados</p>
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
