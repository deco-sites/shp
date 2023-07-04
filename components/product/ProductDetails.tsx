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

import { signal } from '@preact/signals'
import Share from './ShareButton.tsx'
import ProductSelector from './ProductVariantSelector.tsx'
import ProductImageZoom from 'deco-sites/fashion/islands/ProductImageZoom.tsx'
import WishlistButton from '../wishlist/WishlistButton.tsx'

export type Variant = 'front-back' | 'slider' | 'auto'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  /**@description Desconto pix, caso não haja coloque 1 */
  pix: number
}

const WIDTH = 400
const HEIGHT = 400
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`
const isMobile = window.innerWidth <= 768

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
  const { breadcrumbList, product } = page
  const { description, productID, offers, name, gtin, isVariantOf } = product
  const { price, listPrice, seller, installments } = useOffer(offers)

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      {/* Code and name */}
      <div class='mt-4 sm:mt-8'>
        <div>
          <span class='text-sm text-base-300'>Cod. {gtin}</span>
        </div>
        <h1>
          <span class='font-medium text-xl'>{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class='mt-4'>
        <div class='flex flex-col gap-2 items-start'>
          <span class='line-through text-base-300 text-xs'>
            De: {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <p class='font-medium text-xl flex gap-1'>
            <span className='text-[#dd1f26] font-bold'>
              {formatPrice(((pix !== 1 && price !== undefined) ? (price-(price*(pix/100))) : price ), offers!.priceCurrency!)}
            </span>
            no PIX
          </p>
        </div>
        <div className='flex gap-2'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png'
            width={30} height={30} decoding='auto' loading='eager' fetchPriority='high' className='grayscale'
          />
          <p className='font-bold text-lg'>No PIX - <span className='text-green-500'>Economia de {formatPrice(price!*(pix/100),offers!.priceCurrency!)}</span>
          </p>
        </div>
        <div className='flex gap-2 text-sm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" viewBox="0 0 30 21" fill="none"><path d="M1 0H0V21H1V0Z" fill="white"></path><path d="M30 0H29.3408V21H30V0Z" fill="white"></path><path d="M28.7902 0H28.1323V21H28.7902V0Z" fill="white"></path><path d="M27.3178 0H25.4243V21H27.3178V0Z" fill="white"></path><path d="M22.746 0H22.0868V21H22.746V0Z" fill="white"></path><path d="M21.3693 0H19.064V21H21.3693V0Z" fill="white"></path><path d="M17.3623 0H16.7031V21H17.3623V0Z" fill="white"></path><path d="M16.2186 0H14.2798V21H16.2186V0Z" fill="white"></path><path d="M2.58114 0H1.59167V21H2.58114V0Z" fill="white"></path><path d="M4.06534 0H3.40613V21H4.06534V0Z" fill="white"></path><path d="M6.15305 0H5.49384V21H6.15305V0Z" fill="white"></path><path d="M12.4162 0H11.757V21H12.4162V0Z" fill="white"></path><path d="M10.8776 0H10.2184V21H10.8776V0Z" fill="white"></path><path d="M8.96335 0H6.9093V21H8.96335V0Z" fill="white"></path><path d="M25.0681 0H24.1616V21H25.0681V0Z" fill="white"></path></svg>
          <span>No boleto a vista com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)}</span>
        </div>
        <div className='flex gap-2 text-sm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
          <p>
            Em 1x no cartão com 5% OFF por {formatPrice(price!-price!*(5/100),offers!.priceCurrency!)} ou parcelado em <span class='text-sm text-base-300 font-bold'>{installments}</span>
          </p>
        </div>
      </div>
      {/* Sku Selector */}
      <div class='mt-4 sm:mt-6'>
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class='mt-4 sm:mt-10 flex flex-col gap-2'>
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
      <div class='mt-8'>
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
    <div className='flex justify-evenly items-start'>
      <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
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
        <div className='flex flex-row re1:flex-col items-center'>
          <span className='hidden re1:block'>{placa?.type}:</span>
          <span className='text-xs re1:max-w-[90px] text-center re1:text-base'>{placa?.value}</span>
        </div>
      </div>
      <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
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
        <div className='flex flex-row re1:flex-col items-center'>
          <span className='hidden re1:block'>{mem?.type}:</span>
          <span className='text-xs re1:max-w-[90px] text-center re1:text-base'>{mem?.value}</span>
        </div>
      </div>
      <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
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
        <div className='flex flex-row re1:flex-col items-center'>
          <span className='hidden re1:block'>{processador?.type}:</span>
          <span className='text-xs re1:max-w-[90px] text-center re1:text-base'>{processador?.value}</span>
        </div>
      </div>
      <div className='flex re1:flex-col justify-center items-center gap-1 re1:gap-2'>
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
        <div className='flex flex-row re1:flex-col items-center'>
          <span className='hidden re1:block'>{arm?.type}:</span>
          <span className='text-xs re1:max-w-[90px] text-center re1:text-base'>{arm?.value}</span>
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
  const { product } = page
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

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  return (
    <>
      <div
        id={id}
        class='grid grid-cols-1 gap-4 sm:grid-cols-[max-content_30vw_40vw] sm:grid-rows-1 sm:justify-center'
      >
        {/* Image Slider */}
        <div class='relative sm:col-start-2 sm:col-span-1 sm:row-start-1'>
          <div className='flex'>
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
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class='carousel-item min-w-[100vw] sm:min-w-[30vw] justify-center'
              >
                <Image
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </Slider.Item>
            ))}
          </Slider>

          {PCGamer && <PcSpec page={page} />}

          <Slider.PrevButton
            class='no-animation absolute left-2 top-1/2 btn btn-circle btn-outline'
            disabled
          >
            <Icon size={20} id='ChevronLeft' strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class='no-animation absolute right-2 top-1/2 btn btn-circle btn-outline'
            disabled={images.length < 2}
          >
            <Icon size={20} id='ChevronRight' strokeWidth={3} />
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
        <ul class='flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1'>
          {images.map((img, index) => (
            <li class='min-w-[63px] sm:min-w-[70px]'>
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio: ASPECT_RATIO }}
                  class='group-disabled:border-base-300 border rounded '
                  width={70}
                  height={70}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        {/* Product Info */}
        <div class='px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1'>
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
    <div class='container py-0 sm:py-10'>
      {page ? <Details page={page} pix={pix}/> : <NotFound />}
    </div>
  )
}

export default ProductDetails
