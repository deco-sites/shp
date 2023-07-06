import { useId } from 'preact/hooks'
import AddToCartButton from 'deco-sites/fashion/islands/AddToCartButton.tsx'
import ShippingSimulation from 'deco-sites/fashion/islands/ShippingSimulation.tsx'
import Breadcrumb from 'deco-sites/fashion/components/ui/Breadcrumb.tsx'
import Button from 'deco-sites/fashion/components/ui/Button.tsx'
import Icon from 'deco-sites/fashion/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'
import { useOffer } from 'deco-sites/fashion/sdk/useOffer.ts'
import { formatPrice } from 'deco-sites/fashion/sdk/format.ts'
import { SendEventOnLoad } from 'deco-sites/fashion/sdk/analytics.tsx'
import { mapProductToAnalyticsItem } from 'deco-sites/std/commerce/utils/productToAnalyticsItem.ts'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

import Share from './ShareButton.tsx'
import ProductSelector from './ProductVariantSelector.tsx'
import ProductImageZoom from 'deco-sites/fashion/islands/ProductImageZoom.tsx'
import WishlistButton from '../wishlist/WishlistButton.tsx'
import YoutubeEmbed from 'deco-sites/shp/components/product/YoutubeDivEmbed.tsx'

export type Variant = 'front-back' | 'slider' | 'auto'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  /**@description Desconto pix, caso não haja coloque 1 */
  pix: number
}

const WIDTH = 400
const HEIGHT = 400
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`
/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class='w-full flex justify-center items-center py-28'>
      <div class='flex flex-col items-center justify-center gap-6'>
        <span class='font-medium text-2xl'>Página não encontrada</span>
        <a href='/'>
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  )
}

function ProductInfo({ page, pix }: { page: ProductDetailsPage, pix:number }) {
  const {  product } = page
  const { description, productID, offers, name, isVariantOf, brand, additionalProperty } = product
  const { price, listPrice, seller, installments } = useOffer(offers)
  const categoriesId = additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')


  return (
    <>
      {PCGamer && <div className='block re1:hidden'><PcSpec page={page} /></div>}
      <div className='flex re1:flex-col'>
        <div>
          Flags
        </div>
        <div className='flex gap-2'>
          <p>Trustvox</p>
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
                {formatPrice(((pix !== 1 && price !== undefined) ? (price-(price*(pix/100))) : price ), offers!.priceCurrency!)}
              </span>
              <span>no PIX</span>
            </p>
          </div>
          <div className='hidden re1:block'>
            {seller && (
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
            <p className='font-bold text-sm'>No PIX - <span className='text-green-500'>Economia de {formatPrice(price!*(pix/100),offers!.priceCurrency!)}</span>
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
      {seller && (
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

function PcSpec({ page }: { page: ProductDetailsPage }) {
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
              height={30}
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
        <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] my-auto re1:mb-auto">
          <Picture preload>
            <Source
              media='(max-width:768px)'
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              width={15}
              height={15}
              />
            <Source
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              media='(min-width:768px)'
              width={30}
              height={30}
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
        <div className="flex h-[15px] re1:h-[30px] w-[15px] re1:w-[30px] my-auto re1:mb-auto">
          <Picture preload>
            <Source
              media='(max-width:768px)'
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
            />
            <Source
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              media='(min-width:768px)'
              width={30}
              height={30}
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

function Details({ page, pix }: { page: ProductDetailsPage, pix:number }) {
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
  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  return (
    <>     
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
          <div className='flex re1:h-14'>
            <div>tags</div>
            <div className='flex'>
              <WishlistButton
                variant='icon'
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              />
              <Share />
            </div>
          </div>
          <Slider class='carousel gap-6'>
            {images.map((img, index) => {
              if(index!==images.length-1){
                return(
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
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </Picture>
                  </Slider.Item>
                )
              }else if(urlReview){
                <Slider.Item
                  index={index}
                  class='carousel-item min-w-[100vw] re1:min-w-[30vw] justify-center'
                >
                  <YoutubeEmbed videoId={urlReview.split('v=')[1].split('&')[0]} wMob={300} wDesk={300} hMob={400} hDesk={400}/>
                </Slider.Item>
                console.log(urlReview)
              }
            })}
          </Slider>

          {PCGamer && <div className='hidden re1:block'><PcSpec page={page} /></div>}

          <Slider.PrevButton
            class='absolute left-2 top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
            disabled
          >
            <Icon size={20} id='ChevronLeft' strokeWidth={3} class='text-[#dd1f26]'/>
          </Slider.PrevButton>

          <Slider.NextButton
            class='absolute right-2 top-1/2 bg-transparent border-none disabled:grayscale active:hue-rotate-[350deg]'
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
        <ul class='flex gap-2 justify-center re1:justify-start overflow-auto px-4 re1:px-0 re1:flex-col re1:col-start-1 re1:col-span-1 re1:row-start-1'>
          {images.map((img, index) => (
            <li class='min-w-[70px]'>
              <Slider.Dot index={index}>
                <div className='group-disabled:border-b-[#dd1f26] w-[70px] border border-b-[#3d3d3d] re1:border-b-transparent border-transparent group-disabled:shadow-[0_2px_2px_0] group-disabled:shadow-[#dd1f26]/30'>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
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

function ProductDetails({ page, pix }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */

  return (
    <div class='py-0 re1:p-10 bg-[#111] text-white'>
      {page ? <Details page={page} pix={pix}/> : <NotFound />}
    </div>
  )
}

export default ProductDetails
