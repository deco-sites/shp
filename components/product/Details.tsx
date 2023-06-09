// deno-lint-ignore-file
import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import { useId, useEffect, useState, useCallback, useRef } from 'preact/hooks'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import Breadcrumb from 'deco-sites/fashion/components/ui/Breadcrumb.tsx'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'
import Share from './ShareButton.tsx'
import Icon from 'deco-sites/fashion/components/ui/Icon.tsx'
import WishlistButton from '../wishlist/WishlistButton.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { useOffer } from 'deco-sites/fashion/sdk/useOffer.ts'
import { formatPrice } from 'deco-sites/fashion/sdk/format.ts'
import { SendEventOnLoad } from 'deco-sites/fashion/sdk/analytics.tsx'
import { mapProductToAnalyticsItem } from 'deco-sites/std/commerce/utils/productToAnalyticsItem.ts'
import AddToCartButton from 'deco-sites/fashion/islands/AddToCartButton.tsx'
import ShippingSimulation from 'deco-sites/fashion/islands/ShippingSimulation.tsx'
import ProductSelector from './ProductVariantSelector.tsx'
import ProductImageZoom from 'deco-sites/fashion/islands/ProductImageZoom.tsx'


export interface Props {
  page: ProductDetailsPage
  /**@description Desconto pix, caso não haja coloque 1 */
  pix?: number
  aspectRatio?:string
  height?:number
  width?:number
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
            <Picture preload>
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
            <Picture preload>
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
            <Picture preload>
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
            <Picture preload>
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

async function loaderTrustvox(productId:string, storeId:string){
  const url=`https://trustvox.com.br/widget/shelf/v2/products_rates?codes[]=${productId}&store_id=${storeId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

function ProductInfo({ page, pix }: Props) {
    const {  product } = page
    const { description, productID, offers, name, isVariantOf, brand, additionalProperty } = product
    const { price, listPrice, seller, installments } = useOffer(offers)
    const categoriesId = additionalProperty?.map((item) =>
      item.name === 'category' ? item.propertyID : undefined
    )
    const Flags =additionalProperty?.map((item) =>
      item.hasOwnProperty('description') && (item.description==='highlight' && item)
    ).filter(item=>(item!==false && !item.value?.includes('Coleção'))).map(item=>item!==false && item.value) || []


    const PCGamer = categoriesId?.some((item) => item === '10')
  
    const [objTrust,setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
    const [trustPercent, setTrustPercent]=useState(0)

    const [renderizado, setRenderizado]=useState(false)
    useEffect(()=>{
      
      (async()=>{
        setRenderizado(true)
        const { products_rates }=await loaderTrustvox(isVariantOf!.productGroupID, '79497')
        const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
        setTrustPercent(obj.average*20)
        setObjTrust(obj)
      })()
    },[])

    return (
      <>
        {PCGamer && <div className='block re1:hidden mb-4'><PcSpec page={page} /></div>}
        <div className='flex flex-col gap-3'>
          <div>
            <ul className='flex gap-[10px] overflow-x-scroll re1:overflow-x-auto whitespace-nowrap scrollbar-none'>
              <li className='flex items-center justify-center bg-[#3d3d3d] border border-[#828282] hover:border-[#dd1f26] py-1 px-2 text-xs font-bold w-fit h-6 rounded-lg'>12% no PIX Junho</li>
              {Flags.map(flag=><li className='flex items-center justify-center bg-[#3d3d3d] border border-[#828282] hover:border-[#dd1f26] py-1 px-2 text-xs font-bold w-fit h-6 rounded-lg'>{flag}</li>)}
            </ul>
          </div>
          <div className='flex gap-2'>
            <div className='flex items-center gap-3'>
              {/* Trustvox */}
              {objTrust?.average ===0 ? null :
                <>
                  <span className='text-yellow-300'>{objTrust?.average} de 5</span>
                  <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                    <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
                  </div>
                  <span className='text-yellow-300 text-xs'>({objTrust?.count})</span>
                </>
              }
            </div>
            <p className='text-green-500 text-lg'>{brand}</p>
          </div>
        </div>
        {/* Code and name */}
        <div class='mt-4 re1:mt-2'>
          <h1>
            <span class='font-medium text-xl'>{name}</span>
          </h1>
          <div>
            <span class='text-base-300'>CÓD. {isVariantOf?.model}</span>
          </div>
        </div>
        {/* Prices */}
        <div class='mt-4 re1:mt-6'>
          <div className='flex gap-3 justify-between'>
            <div class='flex flex-col items-start'>
              <span class='line-through text-base-300 text-xs'>
                De: {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
              <p class='font-medium text-xl flex gap-1'>
                <span className='text-[#dd1f26] text-3xl font-bold'>
                  {formatPrice(((pix !== 1 && price !== undefined && pix) ? (price-(price*(pix/100))) : price ), offers!.priceCurrency!)}
                </span>
                <span>no PIX</span>
              </p>
            </div>
            <div className='hidden re1:block'>
              {(seller && renderizado) && (
                <AddToCartButton
                skuId={productID}
                sellerId={seller}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                name={product.name ?? ''}
                productGroupId={product.isVariantOf?.productGroupID ?? ''}
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
              <p className='font-bold text-sm'>No PIX - <span className='text-green-500'>Economia de {formatPrice(pix && (price!*(pix/100)),offers!.priceCurrency!)}</span>
              </p>
            </div>
            <div className='flex gap-2 text-sm items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" viewBox="0 0 30 21" fill="none"><path d="M1 0H0V21H1V0Z" fill="white"></path><path d="M30 0H29.3408V21H30V0Z" fill="white"></path><path d="M28.7902 0H28.1323V21H28.7902V0Z" fill="white"></path><path d="M27.3178 0H25.4243V21H27.3178V0Z" fill="white"></path><path d="M22.746 0H22.0868V21H22.746V0Z" fill="white"></path><path d="M21.3693 0H19.064V21H21.3693V0Z" fill="white"></path><path d="M17.3623 0H16.7031V21H17.3623V0Z" fill="white"></path><path d="M16.2186 0H14.2798V21H16.2186V0Z" fill="white"></path><path d="M2.58114 0H1.59167V21H2.58114V0Z" fill="white"></path><path d="M4.06534 0H3.40613V21H4.06534V0Z" fill="white"></path><path d="M6.15305 0H5.49384V21H6.15305V0Z" fill="white"></path><path d="M12.4162 0H11.757V21H12.4162V0Z" fill="white"></path><path d="M10.8776 0H10.2184V21H10.8776V0Z" fill="white"></path><path d="M8.96335 0H6.9093V21H8.96335V0Z" fill="white"></path><path d="M25.0681 0H24.1616V21H25.0681V0Z" fill="white"></path></svg>
              <span>No boleto a vista com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)}</span>
            </div>
            <div className='flex gap-2 text-sm items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
              <p>
                Em 1x no cartão com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)} <br/> ou parcelado em <span class='text-sm font-bold'>{installments}</span>
              </p>
            </div>
          </div>
        </div>
        {/* Sku Selector */}
        <div class='mt-4 re1:mt-6'>
          <ProductSelector product={product} />
        </div>
        {/* Add to Cart and Favorites button */}
        <div class='mt-4 re1:hidden flex flex-col gap-2'>
        {(seller && renderizado)&& (
            <AddToCartButton
              skuId={productID}
              sellerId={seller}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ''}
              productGroupId={product.isVariantOf?.productGroupID ?? ''}
            />
          )}
        </div>
        {/* Shipping Simulation */}
        {renderizado && (

          <div class='mt-8 re1:mt-0'>
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller ?? '1',
              },
            ]}
            />
        </div> 
            )}
        {/* Analytics Event */}
        {/* <SendEventOnLoad
          event={{
            name: "view_item",
            params: {
              items: [
                mapProductToAnalyticsItem({
                  product,
                  breadcrumbList,
                  price,
                  listPrice,
                }),
              ],
            },
          }}
        /> */}
      </>
    )
  }

  interface TouchPosition{
    x:number
    y:number
  }

function Details({ page, pix, aspectRatio, height, width }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  const { product, breadcrumbList } = page
  const id = `product-image-gallery:${useId()}`
  const images = useStableImages(product)
  const {
    description,
    productID,
    offers,
    gtin,
    isVariantOf,
    additionalProperty,
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

    window.addEventListener('resize', handleResize)
    let observer:MutationObserver
    if(urlReview && liVideo.current){
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
      window.removeEventListener('resize', handleResize)
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
  
    window.innerWidth > 768 && (image.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`)
  }
  
  function resetZoom(event:MouseEvent) {
    const image = event.target as HTMLImageElement
    window.innerWidth > 768 && (image.style.transformOrigin = 'center')
  }

  const modal=useRef<HTMLDialogElement>(null)
  const dots=useRef<HTMLUListElement>(null)

  const [imageZoom,setImageZoom]=useState<HTMLImageElement | null>(null)
  const [dotIndex, setDotIndex]=useState<string | null>(null)

  function touchZoom(event:TouchEvent){
    const image=event.target as HTMLImageElement

    setImageZoom(image)


    modal.current && (
      modal.current.showModal()
    )
  }

  const lastTap = useRef(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTouchPosition, setLastTouchPosition] = useState<TouchPosition>({ x: 0, y: 0 });
  const [currentScale, setCurrentScale] = useState(1);
  const [translate, setTranslate] = useState<TouchPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      img.style.transform = `scale(${currentScale}) translate(${translate.x}px, ${translate.y}px)`;
    }
  }, [currentScale, translate]);

  const handleTouchStart = (event: TouchEvent) => {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap.current;
    lastTap.current = currentTime;

    if (tapLength < 300 && tapLength > 0) {
      setIsZoomed(!isZoomed);
    }

    if (!isZoomed && event.touches.length === 2) {
      const touchDistance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(touchDistance);
      setLastTouchDistance(touchDistance);
    } else {
      const touchPosition: TouchPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      setLastTouchPosition(touchPosition);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    if (currentScale === 1) return;

    if (!isZoomed && event.touches.length === 2) {
      const touchDistance = getDistance(event.touches[0], event.touches[1]);
      if (touchDistance < lastTouchDistance && currentScale > 1) {
        const scale = (touchDistance / initialDistance) * currentScale;
        setCurrentScale(scale);
      }
      setLastTouchDistance(touchDistance);
    } else {
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

  const handleTouchEnd = () => {
    if (initialDistance !== 0) {
      setCurrentScale(currentScale * (lastTouchDistance / initialDistance));
    }
    setInitialDistance(0);
    setLastTouchDistance(0);
  };

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );
  };

  useEffect(()=>{
    (dots.current && dotIndex) && (
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
  return (
    <>
      <dialog ref={modal} className='bg-[#111] min-h-screen min-w-[100vw]'>
        <form method="dialog" className='flex flex-col h-[95vh] justify-end'>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40"
            onClick={()=>modal.current && (
              modal.current.close()
            )}
          >✕</button>

          <div className='m-auto'>
            {imageZoom && 
              <Image src={imageZoom.src}
                ref={imgRef}
                width={300}
                height={300}
                loading={imageZoom.loading}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  touchAction: 'none',
                  transformOrigin: '0 0',
                  transform: `scale(${currentScale}) translate(${translate.x}px, ${translate.y}px)`,
                }}
              />
            }
          </div>

          <ul class='flex gap-2 justify-center overflow-auto px-4 z-40'>
            {images.map((img, index) => (
              <li class='min-w-[60px]'>
                <div data-dot={index}>
                  <div className='disabled:border-b-[#dd1f26] w-[60px] re1:w-[70px] border border-b-[#3d3d3d] re1:border-b-transparent border-transparent disabled:shadow-[0_2px_2px_0] group-disabled:shadow-[#dd1f26]/30'>
                    <Image
                      style={{ aspectRatio: aspectRatio }}
                      width={70}
                      height={70}
                      src={img.url!}
                      alt={img.alternateName}
                      onClick={(event)=>{
                        const image=event.target as HTMLImageElement
                        const dotIndex=image.parentElement!
                        Array.from(dotIndex!.parentElement!.parentElement!.parentElement!.querySelectorAll('div[disabled="true"]')).forEach(item=>item.setAttribute('disabled','false'))
                        dotIndex!.setAttribute('disabled','true')
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
              <div className='flex items-center justify-center bg-green-500 text-white text-lg p-1 font-bold h-[30px] rounded-lg'>
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
              <Share />
              <WishlistButton
                variant='icon'
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              />
            </div>
          </div>
          <Slider class='carousel gap-6'>
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
                      className='overflow-hidden hover:scale-150 transition-transform'
                      onMouseMove={zoom}
                      onMouseLeave={resetZoom}
                      onTouchEnd={touchZoom}
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

          { urlReview && (
            <Slider.Item
              index={images.length}
              class='carousel-item min-w-[100vw] re1:min-w-[30vw] justify-center'
            >
              <iframe ref={iframe} key={iframeKey} width={isMobile ? 300 : 400} height={isMobile ? 300 : 400} src={`https://www.youtube.com/embed/${urlReview.split('v=')[1].split('&')[0]}`} title="Conheça a Shopinfo | A Melhor Loja de PC Gamer do Brasil" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"></iframe>
            </Slider.Item>
            )
          }
          </Slider>

          {PCGamer && <div className='hidden re1:block'><PcSpec page={page} /></div>}

          <Slider.PrevButton
            class='absolute left-2 re1:top-[40%] top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
            disabled
          >
            <Icon size={20} id='ChevronLeft' strokeWidth={3} class='text-[#dd1f26]'/>
          </Slider.PrevButton>

          <Slider.NextButton
            class='absolute right-2 re1:top-[40%] top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
            disabled={images.length < 2}
          >
            <Icon size={20} id='ChevronRight' strokeWidth={3} class='text-[#dd1f26]'/>
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
            <li class='min-w-[60px] re1:min-w-[70px]' ref={liVideo}>
              <Slider.Dot index={index}>
                <div className='group-disabled:border-b-[#dd1f26] w-[60px] re1:w-[70px] border border-b-[#3d3d3d] re1:border-b-transparent border-transparent group-disabled:shadow-[0_2px_2px_0] group-disabled:shadow-[#dd1f26]/30'>
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
          {urlReview && (
            <li class='min-w-[70px]'>
              <Slider.Dot index={images.length}>
                <div className='flex re1:flex-col gap-1 items-center py-1 px-2 re1:p-0 bg-[#3d3d3d] re1:bg-transparent justify-center rounded-lg  
                  re1:static group-disabled:border-[#dd1f26] re1:group-disabled:border-b-[#dd1f26] re1:group-disabled:border-l-transparent 
                  re1:group-disabled:border-r-transparent re1:group-disabled:border-t-transparent w-[70px] border re1:border-b-transparent border-transparent 
                  group-disabled:shadow-[0_2px_2px_0] group-disabled:shadow-[#dd1f26]/30 mt-1 re1:mt-0'
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
          <ProductInfo page={page} pix={pix}/>
        </div>
      </div>
      <SliderJS rootId={id}></SliderJS>
    </>
  )
}

export default Details