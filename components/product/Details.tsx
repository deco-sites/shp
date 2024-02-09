// deno-lint-ignore-file
import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { useId, useEffect, useState, useCallback, useRef } from 'preact/hooks'
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import Breadcrumb from 'deco-sites/shp/components/ui/Breadcrumb.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import Share from './ShareButton.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { useOffer } from 'deco-sites/shp/sdk/useOffer.ts'
import { formatPrice } from 'deco-sites/shp/sdk/format.ts'
import { SendEventOnView } from 'deco-sites/shp/components/Analytics.tsx'
import { mapProductToAnalyticsItem } from 'apps/commerce/utils/productToAnalyticsItem.ts'
import Button from 'deco-sites/shp/islands/AddToCartButton/vtex.tsx'
import ShippingSimulation from 'deco-sites/shp/islands/ShippingSimulation.tsx'
import ProductSelector from './ProductVariantSelector.tsx'
import ProductImageZoom from 'deco-sites/shp/islands/ProductImageZoom.tsx'


export interface Props {
  page: ProductDetailsPage
  /**@description Desconto pix, caso não haja coloque 1 */
  pix?: number
  aspectRatio?:string
  height?:number
  width?:number
  /**@description As flags já vem de maneira automática, aqui serve pra estilizar elas */
  flags?:Flag[]
}

interface Flag{
  value:string
  /**@description Coloque em hexdecimal a cor da tag */
  bgColor:string
  textColor:'black'|'white'
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
  const useStableImages = (product: ProductDetailsPage['product']) => {
    const imageNameFromURL = (url = '') => {
      const segments = new URL(url).pathname.split('/')
      return segments[segments.length - 1]
    }
  
    const images = product.image ?? []
    const allImages =
      product.isVariantOf?.hasVariant
        .flatMap((p) => p.image)
        .reduce((acc, img) => {
          if (img?.url) {
            acc[imageNameFromURL(img.url)] = img.url
          }
          return acc
        }, {} as Record<string, string>) ?? {}
  
    return images.map((img) => {
      const name = imageNameFromURL(img.url)
  
      return { ...img, url: allImages[name] ?? img.url }
    })
  }

  function PcSpec({ page }: Props) {
    const { product } = page
    const { isVariantOf } = product
    const pecas = isVariantOf?.additionalProperty
      .map((item) => {
        if (item.name === 'Processador') return { value: item.value, type: item.name }
        if (item.name === 'SSD' || item.name === 'HD') return { value: item.value, type: item.name }
        if (item.name === 'Memória') return { value: item.value, type: item.name }
        if (item.name === 'Placa de vídeo') return { value: item.value, type: item.name }
      })
      .filter((item) => item !== undefined)
    const processador = pecas?.find((peca) => peca?.type === 'Processador')
    const mem = pecas?.find((peca) => peca?.type === 'Memória')
    const placa = pecas?.find((peca) => peca?.type === 'Placa de vídeo')
    const arm = pecas?.find((peca) => peca?.type === 'HD' || peca?.type === 'SSD')
  
    return (
      <div className='flex justify-evenly items-start re1:mt-6'>
        <div className='hidden re1:flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
          <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] my-auto re1:mb-auto">
            <Picture>
              <Source
                media='(max-width:768px)'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg'
                width={15}
                height={15}
                />
              <Source
                src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg'
                media='(min-width:768px)'
                width={30}
                height={21}
              />
              <img src="https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg" loading='eager'/>
            </Picture>
          </div>
          <div className='flex flex-row re1:flex-col items-center'>
            <span className='hidden text-sm re1:block'>{placa?.type}:</span>
            <span className='text-sm re1:max-w-[90px] text-center'>{placa?.value}</span>
          </div>
        </div>
        <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
          <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] mt-auto re1:mb-auto re1:mt-0">
            <Picture>
              <Source
                media='(max-width:768px)'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
                width={15}
                height={10}
                />
              <Source
                src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
                media='(min-width:768px)'
                width={30}
                height={20}
              />
              <img src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg' loading='eager'/>
            </Picture>
          </div>
          <div className='flex flex-row re1:flex-col items-center'>
            <span className='hidden text-sm re1:block'>{mem?.type}:</span>
            <span className='text-sm re1:max-w-[90px] text-center'>{mem?.value}</span>
          </div>
        </div>
        <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
          <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] my-auto re1:mb-auto">
            <Picture>
              <Source
                media='(max-width:768px)'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
                width={15}
                height={15}
              />
              <Source
                src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
                media='(min-width:768px)'
                width={30}
                height={30}
              />
              <img src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg' loading='eager'/>
            </Picture>
          </div>
          <div className='flex flex-row re1:flex-col items-center'>
            <span className='hidden text-sm re1:block'>{processador?.type}:</span>
            <span className='text-sm re1:max-w-[90px] text-center'>{processador?.value}</span>
          </div>
        </div>
        <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
          <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] mt-auto re1:mb-auto re1:mt-0">
            <Picture>
              <Source
                media='(max-width:768px)'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
                width={15}
                height={10}
              />
              <Source
                src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
                media='(min-width:768px)'
                width={30}
                height={21}
              />
              <img src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg' loading='eager'/>
            </Picture>
          </div>
          <div className='flex flex-row re1:flex-col items-center'>
            <span className='hidden text-sm re1:block'>{arm?.type}:</span>
            <span className='text-sm re1:max-w-[90px] text-center'>{arm?.value?.replace('HD','').replace('SSD','')}</span>
          </div>
        </div>
      </div>
    )
  }

function ProductInfo({ page, pix, flags }: Props) {
    const id=useId()
    const { product } = page
    const { description, productID, offers, name, isVariantOf, brand, additionalProperty } = product
    const { price, listPrice, seller, installments } = useOffer(offers)

    const categoriesId = additionalProperty?.map((item) =>
      item.name === 'category' ? item.propertyID : undefined
    )
    const Flags:Flag[]=[]
    additionalProperty?.map((item) =>
      item.hasOwnProperty('description') && (item.description==='highlight' && item)
    ).filter(item=>(item!==false && !item.value?.includes('Coleção'))).forEach(item=>{
      if(item!==false){
        const flagColor=flags?.find(flag=>item.value===flag.value)?.bgColor
        const color= flagColor ? flagColor : '#3D3D3D'
        const text=flags?.find(flag=>item.value===flag.value)?.textColor ?? 'white'
        Flags.push({
          value:item.value!,
          bgColor:color,
          textColor:text
        })
      } 
    })

    const PCGamer = categoriesId?.some((item) => item === '10')

    const offer=offers!.offers![0]!

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
  
    // se ele n achou o objeto q tem o billingIncrement, é pq n tem parcela, logo coloco um zero mas n vai aparecer pro usuário
    const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)?.billingIncrement ?? 0
  
    const [objTrust,setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
    const [trustPercent, setTrustPercent]=useState(0)

    const [renderizado, setRenderizado]=useState(false)
    useEffect(()=>{
      (async()=>{
        setRenderizado(true)
        const { products_rates }=await invoke['deco-sites/shp'].loaders.getTrustvox({productId:isVariantOf!.productGroupID, storeId:'79497'}) 
        
        const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
        setTrustPercent(obj.average*20)
        setObjTrust(obj)
      })()
    },[])

    const isAvailable=offers!.offers[0].availability!=="https://schema.org/OutOfStock"
    const [cadastrado,setCadastrado]=useState(false)
    const inputNome=useRef<HTMLInputElement>(null)
    const inputEmail=useRef<HTMLInputElement>(null)
    const inputSku=useRef<HTMLInputElement>(null)

    const handleCadastro=async (event:Event)=>{
      event.preventDefault()
      if(inputNome.current && inputEmail.current && inputSku.current){
        const skuId=inputSku.current.value
        const name=inputNome.current.value
        const email=inputEmail.current.value

        if(skuId!=='' && name!=='' && email!==''){
          console.log({skuId, name, email})
          const formData=new FormData()
          formData.append('name',name)
          formData.append('email',email)
          formData.append('skuId',skuId)
          const data=await fetch('https://api.shopinfo.com.br/Deco/notifyMe.php', {
            "body": formData,
            "method": "POST",
            "mode": "cors",
          }).then(r=>r.text()).catch(err=>console.error('Error: ',err))
          data==='true' && setCadastrado(true)
        }
      }
    }

    return (
      <>
        {PCGamer && <div className='block re1:hidden mb-4'><PcSpec page={page} /></div>}
        <div className='flex flex-col gap-3'>
          <div>
            <ul className='flex gap-[10px] overflow-x-scroll re1:overflow-x-auto whitespace-nowrap scrollbar-none'>
              <li className='cursor-default flex items-center justify-center bg-[#DEDA35] text-black py-1 px-2 text-xs font-bold w-fit h-6 rounded-lg'>12% NO PIX</li>
              {Flags.map((flag:Flag)=><li style={{backgroundColor:flag.bgColor}} className={`cursor-default flex items-center justify-center text-${flag.textColor} py-1 px-2 text-xs font-bold w-fit h-6 rounded-lg`}>{flag.value}</li>)}
            </ul>
          </div>
          <div className='flex gap-2'>
            {/* Trustvox */}
            {objTrust?.average ===0 ? null :
              <div className='flex items-center gap-3 cursor-pointer' title='Pergunte e veja opiniões de quem já comprou'
                onClick={()=>{
                  const reviewSec=document.querySelector('#REVIEW')
                  if(reviewSec){
                    const divReview=reviewSec.querySelector('#_trustvox_widget')
                    const reviewSecRect=reviewSec.getBoundingClientRect()
                    const posY=reviewSecRect.top+globalThis.window.scrollY

                    divReview?.classList.contains('!hidden') && reviewSec.querySelector('label')?.click()
                    globalThis.window.scrollTo({top:posY-150, behavior:'smooth'})
                  }
                }}
              >
                <span className='text-yellow-300'>{objTrust?.average} de 5</span>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${trustPercent}%`}} className='text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
                </div>
                <span className='text-yellow-300 text-xs'>({objTrust?.count})</span>
              </div>
            }
            <p className='text-success text-lg'>{brand?.name}</p>
          </div>
        </div>
        {/* Code and name */}
        <div class='mt-4 re1:mt-2'>
          <h1>
            <span class='font-medium text-xl'>{name}</span>
          </h1>
          <div>
            <span class='text-base-content'>CÓD. {isVariantOf?.model}</span>
          </div>
        </div>
        {isAvailable ? (
          <>
            {/* Prices */}
            <div class='mt-4 re1:mt-6'>
              <div className='flex gap-3 justify-between'>
                <div class='flex flex-col items-start'>
                  <span class='line-through text-xs text-base-content'>
                    De: {formatPrice(listPrice, offers!.priceCurrency!)}
                  </span>
                  <p class='font-medium text-xl re1:text-sm re4:text-lg flex gap-1'>
                    <span className='text-primary text-3xl re1:text-2xl re4:text-3xl font-bold'>
                      {formatPrice(((pix !== 1 && price !== undefined && pix) ? (price-(price*(pix/100))) : price ), offers!.priceCurrency!)}
                    </span>
                    <span>no PIX</span>
                  </p>
                </div>
                <div className='hidden re1:block'>
                  {(seller && renderizado) && (
                    <Button
                      url={product?.url ?? ''}
                      productID={productID}
                      seller={seller}
                      price={price ?? 0}
                      discount={price && listPrice ? listPrice - price : 0}
                      name={product.name ?? ''}
                      productGroupID={product.isVariantOf?.productGroupID ?? '1'}
                    />
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-6 mt-6'>
                <div className='flex gap-2 items-center'>
                  <div className='w-[30px] h-[30px]'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png'
                      width={25} height={25} decoding='auto' loading='eager' fetchPriority='high'
                    />
                  </div>
                  <p className='font-bold text-sm'>No PIX - <span className='text-success'>Economia de {formatPrice(pix && (price!*(pix/100)),offers!.priceCurrency!)}</span>
                  </p>
                </div>
                <div className='flex gap-2 text-sm items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" viewBox="0 0 30 21" fill="none"><path d="M1 0H0V21H1V0Z" fill="white"></path><path d="M30 0H29.3408V21H30V0Z" fill="white"></path><path d="M28.7902 0H28.1323V21H28.7902V0Z" fill="white"></path><path d="M27.3178 0H25.4243V21H27.3178V0Z" fill="white"></path><path d="M22.746 0H22.0868V21H22.746V0Z" fill="white"></path><path d="M21.3693 0H19.064V21H21.3693V0Z" fill="white"></path><path d="M17.3623 0H16.7031V21H17.3623V0Z" fill="white"></path><path d="M16.2186 0H14.2798V21H16.2186V0Z" fill="white"></path><path d="M2.58114 0H1.59167V21H2.58114V0Z" fill="white"></path><path d="M4.06534 0H3.40613V21H4.06534V0Z" fill="white"></path><path d="M6.15305 0H5.49384V21H6.15305V0Z" fill="white"></path><path d="M12.4162 0H11.757V21H12.4162V0Z" fill="white"></path><path d="M10.8776 0H10.2184V21H10.8776V0Z" fill="white"></path><path d="M8.96335 0H6.9093V21H8.96335V0Z" fill="white"></path><path d="M25.0681 0H24.1616V21H25.0681V0Z" fill="white"></path></svg>
                  <span>No boleto a vista com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)}</span>
                </div>
                {maxInstallments!==0 && 
                  <div className='flex gap-2 text-sm items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
                    <p>
                      Em 1x no cartão com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)} <br/> ou parcelado em <span class='text-sm font-bold'>{maxInstallments}x de {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</span>
                    </p>
                  </div>
                }
              </div>
            </div>
            {/* Sku Selector */}
            <div class='mt-4 re1:mt-6'>
              <ProductSelector product={product} />
            </div>
            {/* Add to Cart and Favorites button */}
            <div class='mt-4 re1:hidden flex flex-col gap-2'>
            {(seller && renderizado) && (
              <Button
                url={product?.url ?? ''}
                productID={productID}
                seller={seller ?? '1'}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                name={product.name ?? ''}
                productGroupID={product.isVariantOf?.productGroupID ?? ''}
              />
            )}
            </div>
            {/* Shipping Simulation */}
            {renderizado && (

              <div class='mt-8 re1:mt-0'>
              <ShippingSimulation
                items={[
                  {
                    id: Number(productID),
                    quantity: 1,
                    seller: seller ?? '1',
                  },
                ]}
                />
            </div> 
                )}
          </>
        ):(<div className='w-full h-auto'>
            <span className='block w-full bg-primary text-center font-bold my-5'>Produto Temporariamente Indisponível</span>
            <form className='flex flex-col gap-5 items-center re1:items-start justify-center' onSubmit={handleCadastro}>
              <label className='text-lg font-bold'>Avise-me se este produto chegar</label>
              {cadastrado ? <p className='text-center'>Cadastrado com sucesso, assim que o produto for disponibilizado você receberá um email avisando.</p> : 
              <>
                <input type='text' ref={inputNome} required={true} placeholder='Digite seu nome' className='rounded-lg border-2 border-neutral
                  placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-full text-base px-3 py-2 re1:w-[20vw]'
                />
                <div className='flex gap-4 w-full'>
                  <input type='text' ref={inputEmail} required={true} placeholder='Digite seu e-mail' className='rounded-lg border-2 border-neutral
                    placeholder:text-neutral bg-base-100 focus:border-primary outline-none w-full text-base px-3 py-2 re1:w-[20vw]'
                  />
                  <button type='submit' className='bg-primary px-5 rounded-lg text-lg hidden re1:block h-auto'>Enviar</button>
                </div>
                <input type='hidden' ref={inputSku} value={productID}/>
                <button type='submit' className='bg-primary w-full rounded-lg text-lg h-10 re1:hidden'>Enviar</button>
              </>}
            </form>
        </div>)}
      </>
    )
  }

  interface TouchPosition{
    x:number
    y:number
  }

function Details({ page, pix, aspectRatio, height, width, flags }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    setIsMobile(globalThis.window.innerWidth <= 768)
  }, [])

  const { product, breadcrumbList } = page
  const id = `product-image-gallery:${useId()}`
  const images = useStableImages(product)
  const {
    name,
    description,
    productID,
    offers,
    gtin,
    isVariantOf,
    additionalProperty
  } = product
  const categoriesId = additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')
  const urlReview=isVariantOf?.additionalProperty?.find((item)=>item.name==='Review')?.value

  const { price, listPrice} = useOffer(offers)
  const tagDiscount=(price:number, listPrice:number, pix?:number)=>{
    const precoOriginal = listPrice
    const precoComDesconto  = pix ? price-(price*(pix/100)) : price
    const desconto = precoOriginal - precoComDesconto
    return Math.ceil((desconto / precoOriginal)*100)
  }


  const liVideo=useRef<HTMLLIElement>(null)
  const iframe=useRef<HTMLIFrameElement>(null)
  
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    handleResize()
    console.log(product)

    globalThis.window.addEventListener('resize', handleResize)
    let observer:MutationObserver
    if((urlReview && (urlReview.split('v=').length>1 || urlReview.includes('/embed/'))) && liVideo.current){
      const button=liVideo.current.children[0]
  
      observer= new MutationObserver((mutations)=>{
        mutations.forEach((mutation)=>{
          if(mutation.type === 'attributes' && mutation.attributeName === 'disabled'){
            if(iframe.current){
              setIframeKey((prevKey) => prevKey + 1)
            }
          }
        })
      })
  
      observer.observe(button, {attributes:true})
    }

    return () => {
      globalThis.window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  function zoom(event:MouseEvent) {
    const image = event.target as HTMLImageElement
    const rect = image.getBoundingClientRect()
  
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
  
    const percentX = offsetX / rect.width
    const percentY = offsetY / rect.height
  
    globalThis.window.innerWidth > 768 && (image.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`)
  }
  
  function resetZoom(event:MouseEvent) {
    const image = event.target as HTMLImageElement
    globalThis.window.innerWidth > 768 && (image.style.transformOrigin = 'center')
  }

  const modal=useRef<HTMLDialogElement>(null)
  const dots=useRef<HTMLUListElement>(null)
  const dotsModal=useRef<HTMLUListElement>(null)

  const [imageZoom,setImageZoom]=useState<HTMLImageElement | null>(null)
  const [dotIndex, setDotIndex]=useState<string | null>(null)
  
  const [hideModalTemp,setHideModalTemp]=useState(true)
  const [hideImg, setHideImg]=useState(true)

  const [touchZoomStartX,setTouchZoomStartX]=useState(0)
  const [touchZoomStartY,setTouchZoomStartY]=useState(0)

  function touchZoomStart(event: TouchEvent) {
    // Armazenar a posição inicial do toque
    setTouchZoomStartX(event.touches[0].clientX)
    setTouchZoomStartY(event.touches[0].clientY)
  }

  function touchZoomEnd(event:TouchEvent){
    
    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY

    const deltaX = Math.abs(touchEndX - touchZoomStartX)
    const deltaY = Math.abs(touchEndY - touchZoomStartY)

    const threshold = 10
    
    if(deltaX < threshold && deltaY < threshold){
      const image=event.target as HTMLImageElement
      
      const imgDataDot=image.parentElement!.parentElement!.getAttribute('data-slider-item')
      
      dotsModal.current && (
        (dotsModal.current.querySelector(`div[data-dot="${imgDataDot}"] img`) as HTMLImageElement).click()
      )
      
      modal.current && (
        modal.current.showModal(),
        setHideModalTemp(false),
        setHideImg(true)
      )
    }
  }

  useEffect(()=>{
    if(!hideModalTemp){
      setTimeout(()=>{
        setHideModalTemp(true)
        setHideImg(false)
      },3000)
    }
  },[hideModalTemp])

  const lastTap = useRef(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentScale, setCurrentScale] = useState(1);
  const [translate, setTranslate] = useState<TouchPosition>({ x: 0, y: 0 });
  const [lastTouchPosition, setLastTouchPosition] = useState<TouchPosition>({ x: 0, y: 0 });

  const handleTouchStart = (event: TouchEvent) => {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap.current;
    lastTap.current = currentTime;
  
    if (tapLength < 300 && tapLength > 0) {
      setIsZoomed(!isZoomed);
      setTranslate({ x: 0, y: 0 }); // Reset translation when toggling zoom
      setCurrentScale(isZoomed ? 1 : 2);
    }
  
    const touchPosition: TouchPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    setLastTouchPosition(touchPosition);
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  
    if (isZoomed) {
      const touchPosition: TouchPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      const delta = {
        x: touchPosition.x - lastTouchPosition.x,
        y: touchPosition.y - lastTouchPosition.y,
      };
      setLastTouchPosition(touchPosition);
  
      setTranslate(prevTranslate => ({
        x: prevTranslate.x + delta.x,
        y: prevTranslate.y + delta.y,
      }));
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      img.style.transformOrigin = 'center center';
      img.style.transform = `scale(${currentScale}) translate(${translate.x}px, ${translate.y}px)`;
    }
  }, [currentScale, translate]);

  useEffect(()=>{
    if(dots.current && dotIndex)(
      (dots.current.querySelector(`button[data-dot="${dotIndex}"]`)! as HTMLButtonElement).click()
    )
  },[dotIndex])

  useEffect(() => {
    isZoomed ?  setCurrentScale(2) : (setCurrentScale(1), setTranslate({ x: 0, y: 0 }))
  }, [isZoomed]);
  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */


  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumbList,
    price,
    listPrice,
  })

  return (
    <>
      <dialog ref={modal} className='bg-base-100 min-h-full min-w-[100vw] overflow-hidden'>
        <form method="dialog" className='flex flex-col h-[95vh] justify-end'>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-neutral text-secondary border-transparent"
            onClick={()=>modal.current && (
              modal.current.close()
            )}
          >✕</button>

          <div className='btn btn-sm btn-circle absolute top-2 left-2 z-40 bg-neutral text-secondary border-transparent'
            onTouchEnd={()=>setHideModalTemp(false)}
          >
            ?
          </div>

          <div className='m-auto'>
            {imageZoom && 
              <Image src={imageZoom.src}
                className={hideImg ? 'hidden' : 'block'}
                ref={imgRef}
                width={300}
                height={300}
                loading={imageZoom.loading}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{
                  touchAction: 'none',
                  transformOrigin: '0 0',
                  transform: `scale(${currentScale}) translate(${translate.x}px, ${translate.y}px)`
                }}
              />
            }
            <div className={`bg-[#272727] text-secondary rounded-lg w-[85%] absolute top-[50%] left-[7.5%] p-4 ${hideModalTemp ? 'hidden' : 'block'}`}>
              <p>Dê dois toques na imagem para dar Zoom</p>
              <p>E também para sair do Zoom</p>
            </div>
          </div>

          <ul ref={dotsModal} class='flex gap-2 justify-center absolute bottom-0 left-0 p-4 w-screen  z-40 bg-base-100'>
            {images.map((img, index) => (
              <li class='min-w-[60px]'>
                <div data-dot={index}>
                  <div className='data-[disabled="true"]:border-b-primary w-[70px] border-b-neutral border-b'>
                    <Image
                      style={{ aspectRatio: aspectRatio }}
                      width={70}
                      height={70}
                      src={img.url!}
                      alt={img.alternateName}
                      onClick={(event)=>{
                        const image=event.target as HTMLImageElement
                        const dotIndex=image.parentElement!
                        Array.from(dotIndex!.parentElement!.parentElement!.parentElement!.querySelectorAll('div[data-disabled="true"]')).forEach(item=>item.setAttribute('data-disabled','false'))
                        dotIndex!.setAttribute('data-disabled','true')
                        setImageZoom(image)
                        setDotIndex(dotIndex!.parentElement!.getAttribute('data-dot'))
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </form>
      </dialog> 
      <div className='ml-[16%] mb-4 hidden re1:block'> 
        {/* Breadcrumb */}
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>
      <div
        id={id}
        class='grid grid-cols-1 gap-4 re1:grid-cols-[max-content_30vw_30vw] re1:grid-rows-1 re1:justify-center'
      >
        {/* Image Slider */}
        <div class='relative re1:col-start-2 re1:col-span-1 re1:row-start-1'>
          <div className='flex re1:h-14 justify-between items-center px-[10%]'>
            <div className='flex gap-1'>
              <div className='flex items-center justify-center bg-success text-secondary text-lg p-1 font-bold h-[30px] rounded-lg'>
                <p className='before:content-["-"]'>
                  {(price && listPrice) && tagDiscount(price, listPrice, pix)}%
                </p>
              </div>
              {PCGamer && 
              <div className='flex items-center justify-center h-[30px] rounded-lg'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/pdp-pc-frete-gratis.gif'
                  width={74} height={30} fetchPriority='high' decoding='sync' loading='eager'
                />
              </div>}
            </div>
            <div className='flex'>
              <Share productName={name ?? ''}/>
            </div>
          </div>
          <Slider class='carousel gap-6 w-full'>
            {images.map((img, index) => 
                (
                  <Slider.Item
                    index={index}
                    class='carousel-item min-w-[100vw] re1:min-w-[30vw] justify-center'
                  >
                    <Picture 
                      // Preload LCP image for better web vitals
                      
                      preload={index === 0 ? true : false}
                    >
                      <Source
                        src={img.url!}
                        media='(max-width:768px)'
                        width={300}
                        height={300}
                      />
                      <Source
                        src={img.url!}
                        media='(min-width:768px)'
                        width={400}
                        height={400}
                      />
    
                    <img
                      className={`overflow-hidden ${!isMobile && 'hover:scale-150'} transition-transform`}
                      onMouseMove={zoom}
                      onMouseLeave={resetZoom}
                      onTouchStart={touchZoomStart}
                      onTouchEnd={touchZoomEnd}
                      style={{ aspectRatio: aspectRatio }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={width}
                      height={height}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </Picture>
                  </Slider.Item>
                )
            )}

          {(urlReview && (urlReview.split('v=').length>1 || urlReview.includes('/embed/'))) && (
            <Slider.Item
              index={images.length}
              class='carousel-item min-w-[100vw] re1:min-w-[30vw] justify-center'
            >
              <iframe ref={iframe} key={iframeKey} width={isMobile ? 300 : 400} height={isMobile ? 300 : 400} src={ urlReview.split('v=').length>1 ? `https://www.youtube.com/embed/${urlReview.split('v=')[1].split('&')[0]}` : urlReview} title="Conheça a Shopinfo | A Melhor Loja de PC Gamer do Brasil" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"></iframe>
            </Slider.Item>
            )
          }
          </Slider>

          {PCGamer && <div className='hidden re1:block'><PcSpec page={page} /></div>}

          <Slider.PrevButton
            class='absolute left-2 re1:top-[40%] top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
            disabled
          >
            <Icon size={20} id='ChevronLeft' strokeWidth={3} class='text-primary'/>
          </Slider.PrevButton>

          <Slider.NextButton
            class='absolute right-2 re1:top-[40%] top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
            disabled={images.length < 2}
          >
            <Icon size={20} id='ChevronRight' strokeWidth={3} class='text-primary'/>
          </Slider.NextButton>

          {/* <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <ProductImageZoom
                images={images}
                width={1280}
                height={1280 * HEIGHT / WIDTH}
              />
            </div> */}
        </div>

        {/* Dots */}
        <ul ref={dots} class='flex gap-2 justify-center re1:justify-start overflow-auto px-4 re1:px-0 re1:flex-col re1:col-start-1 re1:col-span-1 re1:row-start-1'>
          {images.map((img, index) => (
            <li class='min-w-[60px] re1:min-w-[70px]'>
              <Slider.Dot index={index}>
                <div className='group-disabled:border-b-primary w-[60px] re1:w-[70px] border border-b-neutral re1:border-b-transparent border-transparent group-disabled:shadow-[0_2px_2px_0] group-disabled:shadow-primary/30'>
                  <Image
                    style={{ aspectRatio: aspectRatio }}
                    width={70}
                    height={70}
                    src={img.url!}
                    alt={img.alternateName}
                    className='hidden re1:block'
                  />
                </div>
              </Slider.Dot>
            </li>
          ))}
          {(urlReview && (urlReview.split('v=').length>1 || urlReview.includes('/embed/'))) && (
            <li class='min-w-[70px]' ref={liVideo}>
              <Slider.Dot index={images.length}>
                <div className='flex re1:flex-col gap-1 items-center py-1 px-2 re1:p-0 bg-neutral re1:bg-transparent justify-center rounded-lg  
                  re1:static group-disabled:border-primary re1:group-disabled:border-b-primary re1:group-disabled:border-l-transparent 
                  re1:group-disabled:border-r-transparent re1:group-disabled:border-t-transparent w-[70px] border re1:border-b-transparent border-transparent 
                  group-disabled:shadow-[0_2px_2px_0] group-disabled:shadow-primary/30 mt-1 re1:mt-0'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} viewBox="0 0 50 50" fill="none">
                    <path d="M35 25L20 33.6603V16.3397L35 25Z" fill="#C2C2C2"></path>
                    <circle cx="25" cy="25" r="24.5" stroke="#C2C2C2"></circle>
                  </svg>
                  <p className='text-xs re1:text-base'>Video</p>
                </div>
              </Slider.Dot>
            </li>
          )}
        </ul>

        {/* Product Info */}
        <div class='px-4 re1:pr-0 re1:pl-6 re1:col-start-3 re1:col-span-1 re1:row-start-1'>
          <ProductInfo page={page} pix={pix} flags={flags}/>
        </div>
      </div>
      <SliderJS rootId={id}></SliderJS>

      {/* Analytics Event */}
      {/* <SendEventOnView
          id={id}
          event={{
            name: "view_item",
            params: {
              item_list_id: "product",
              item_list_name: "Product",
              items: [eventItem],
            },
          }}
        /> */}
    </>
  )
}

export default Details
