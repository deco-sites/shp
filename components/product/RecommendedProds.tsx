import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import { useEffect, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage>
}

interface ProdCard{
  prodName:string
  precoVista:string
  valorParcela:string
  parcelas:string
  imgUrl:string
  linkProd:string
  precoDe:string
}

const ProdCard=({...props}:ProdCard)=>{
  const {prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe} = props
  
  return(
    <div className='flex flex-row re1:flex-col'>
      <div>
        imagems e flag
      </div>
      <div>
        infos e trustvox
      </div>
    </div>
  )
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

const ProductRecommendedProds = ({ page }: Props) => {
  const [recomendados, setRecomendados] = useState([])
  const { product } = page
  const prodID = product.isVariantOf?.productGroupID
  const prodSKU = product.sku
  const param = `["${prodID}#${prodSKU}"]`

  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')

  
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)

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
        console.log(data)
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
        pensando...
      </div>
    </div>
  )
}

export default ProductRecommendedProds
