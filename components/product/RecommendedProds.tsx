import { useEffect, useState } from 'preact/hooks'
import { JSX } from 'preact'
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import { renderToString } from 'preact-render-to-string'
import Image from 'deco-sites/std/components/Image.tsx'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx'
import PcCard from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/PcCardRecommended.tsx'
import ProdCard from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/ProdCardRecommended.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage>
  pix:number
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
  pix:number
}

export interface ProdCard{
  productId:string
  prodName:string
  precoVista:string
  valorParcela:string
  parcelas:string
  imgUrl:string
  linkProd:string
  precoDe:string
  pix:number
}

export interface PcCard{
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
  pix:number
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
  const data:PcInfos[] =
  (await fetch(url, {
    method: 'POST',
    body: formData,
  }).then((r) => r.json()).catch((err) => console.error('Error: ' + err))) || []
  
  return data
}

const ProductRecommendedProds = ({ page, pix }: Props) => {
  const { product } = page
  const prodID = product.isVariantOf!.productGroupID
  const prodSKU = product.sku
  const param = `["${prodID}#${prodSKU}"]`

  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')

  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([<div className='loading loading-spinner text-primary loading-lg'/>])
  const [openMenu,setOpenMenu]=useState(()=>{
      PCGamer?
      (async()=>{
        const data=await recomendacoesV2Loader(param)
        const elements:JSX.Element[]=data.map(item=>
          <PcCard productId={item.id} prodName={item.name} precoVista={item.priceVista} valorParcela={item.valorParcela} parcelas={item.parcela}
            linkProd={item.link} imgUrl={item.image} precoDe={item.precoDe} armazenamento={item.armazenamento} precoParcelado={item.priceParcelado}
            memoria={item.memoria} placaVideo={item.placaVideo} processador={item.processador} tipoArm={item.tipoArmazenamento} pix={pix}
          />
        )
        setHtmlContent(elements)
      })()
    :
      (async()=>{
        const data=await recomendacoesLoader(param)
        const elements:JSX.Element[]=data[0].map(item=>{
          const arr=item.index.split('#')
          return <ProdCard productId={arr[0]} prodName={arr[1]} precoVista={arr[2]} valorParcela={arr[3]} parcelas={arr[4]} linkProd={arr[5]} imgUrl={arr[6]} precoDe={arr[7]} pix={pix} />
        })
        setHtmlContent(elements)
      })()

    return false
  })

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
  }

  useEffect(()=>{
    openMenu && sendEvent({name:'select_content', params:{content_type:'recomendedProds'}})
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
