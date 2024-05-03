import { memo } from 'preact/compat'
import { Offer, Product, PropertyValue } from 'apps/commerce/types.ts'
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import { invoke } from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { useOffer } from 'deco-sites/fashion/sdk/useOffer.ts'
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface CardProps{
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  pix:number
  objTrust:ObjTrust
  trustPercent:number
  combo:ComboObj
} 

interface CardPCProps extends CardProps{
  NLI:string
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  fonte:string
  groupId:string
  seller:string
}

export interface ComboObj{
  id:string
  image:string
  name:string
  finalPrice:number
}

export type Props={
  product:Product
  frete?:string
  combo:ComboObj
  descontoPix:number
}

const CardProd=(props:CardProps)=>{
    const salePricePix=DescontoPIX(props.precoVista, props.pix)
    const diffPercent=Math.ceil(-1*(((100*salePricePix)/props.precoDe)-100))
  
    const redirectProdPage=()=>{
      globalThis.window.location.href=props.linkProd
    }
  
    const {addItems}=useCart()
  
    const handleClick=()=>{
      try{
        addItems({
          orderItems: [
            {
              id: props.prodId,
              seller: '1',
              quantity: 1,
            },
            {
              id: props.combo?.id ?? '',
              seller: '1',
              quantity: 1,
            },
          ],
        })
      }finally{
        globalThis.window.location.href='/checkout'
      }
    }
  
    return (
      <div className='flex flex-col re1:flex-row w-full re1:h-[215px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
        hover:transition-shadow hover:duration-75 hover:ease-in text-secondary p-[10px] re1:p-0 justify-between rounded-lg'
      >
  
      <div className='flex re1:block re1:w-[15%]'>
        <div className='w-[32%] re1:w-full re1:h-full flex items-center justify-center'>
          <Image src={props.imgUrl} width={180} height={180} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%] re1:w-full cursor-pointer' alt={props.prodName} title={props.prodName} onClick={redirectProdPage}/>
        </div>

        <div className='flex re1:hidden w-full p-[10px] flex-col justify-around gap-1'>
          <div className='flex items-center justify-start'>
            {/* Trustvox */}
            <div className='flex justify-center items-center absolute'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
              </div>
              {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
            </div>

            <div className='flex re1:hidden items-center justify-start gap-2 w-[85px] ml-auto'>
              <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
                </svg>
              </div>

              <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
            </div>
          </div>

          <p className='line-clamp-2 text-xs'>{props.prodName}</p>

          <p className='text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})} <span className='text-xs font-normal'>No Pix</span></p>
        </div>
      </div>

      <div className='hidden re1:flex w-[30%] p-[10px] flex-col justify-around'>
        <div className='flex items-center justify-start'>
          {/* Trustvox */}
          <div className='flex justify-center items-center absolute'>
            <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
              <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
            </div>
            {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
          </div>
        </div>

        <p className='line-clamp-2 text-xs'>{props.prodName}</p>

        <p className='text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})} <span className='text-xs font-normal'>No Pix</span></p>

      </div>

      <div className='flex flex-col re1:flex-row items-center w-full re1:w-[55%]'>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='re1:w-[5%]'>
          <path d="M11.75 26.6V18.125H3.725V14.875H11.75V6.4H15.15V14.875H23.175V18.125H15.15V26.6H11.75Z" fill="#DD1F26"/>
        </svg>

        {props.combo && (
          <div className='flex items-center justify-start re1:justify-between w-full re1:w-[50%] gap-[10px] px-[10px]'>
            <Image src={props.combo.image} width={90} height={90}/>
            <div>
              <p className='text-xs line-clamp-3'>{props.combo.name}</p>
              <p className='py-2 flex gap-1 justify-start items-center'>
                <span className='font-bold text-sm text-secondary'>{props.combo.finalPrice.toLocaleString('pr-BR',{style:'currency', currency:'BRL'})}</span>
                <span className='text-xs'>No Pix</span>
              </p>
            </div>
          </div>
        )}

        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" className='re1:w-[5%]'>
          <path d="M0.725 4.2V0.949998H20.175V4.2H0.725ZM0.725 14.05V10.8H20.175V14.05H0.725Z" fill="#DD1F26"/>
        </svg>
        
        <div className='flex flex-col items-center re1:items-start justify-center p-[10px] w-full re1:w-[40%] h-full'>
          <div className='hidden re1:flex items-center justify-start gap-2 w-[85px]'>
            <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
              </svg>
            </div>

            <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
          </div>

          <div className='flex flex-col gap-1 my-auto items-center re1:items-start'>
            <p className='hidden re1:block line-through text-xs'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
            <span className='text-[#00a74c] text-xl font-bold'>{(salePricePix + props.combo.finalPrice).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</span>
            <span className='text-xs'>No Pix ou em {props.parcelas}x de {(props.valorParcela + (props.combo.finalPrice/props.parcelas)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
          </div>

          <button className='bg-primary text-sm w-full rounded-lg font-extrabold flex gap-1 items-center justify-center h-7 py-1 mb-4' onClick={handleClick}>
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20.8" height="17.06" transform="translate(0 0.300049)" fill="url(#pattern0_243_76)"/>
              <defs>
              <pattern id="pattern0_243_76" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_243_76" transform="scale(0.00111111 0.00135318)"/>
              </pattern>
              <image id="image0_243_76" width="900" height="739" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAALjCAMAAAB9FjtfAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAYOdPDL9+Cv02LZnNm7OBImZYCDwkQCq1A1EAAAAJcEhZcwAACxMAAAsTAQCanBgAAB4ASURBVHja7d2Jcts4FoXhWDIlSpZ3O3r/Nx3ZWcZJJw5AEsT2/emerppUySKMg3MXAPzy5Reezitz/QXA/xW42WzOOdhsbq6oEXjKpMAPWrw5+DWgXx7uckvwhxKvrpki+rTBc0EITkGDRRiiXwtoMLcfyhDRTz5YpAbf7dAvB31wdy4WMoRgNL8M5YZon6I1+JYb+hWBEeaGGYIR5kZmCCLMHpIyQ4hG1WeARJxrgQpBhLmxgQZESIVA5yIUkYIIs+PXBSLMXSP1+wIR2sIG9C1CxRk0yH4UkAJ5GQWkQF52lQWk+hQQjwpIgYUZ1GYAVqhlj77ZVqZCR3zRYEA6skKAClkhqJAVAjnZjUQI5K7OVCRD22bQqhlWI0MNezTrhkMtOvS7Qrvst9vdB7a//fmV6L8dhkF9FMgs8uNFiqN4FMjLcTtbhwYRmOuIM8tADjQBC5SB5shQkwLILENJIbAM0zfqGDtgodxwaonG0V4gsxlKCoHFOE7KDCWFwIJMCknFo0DmkNTONSCzCiWFwKLEXzblLfZAbhVKCoHMKpQUAplVqEkBLE1sdSZJUni4urr595+bq0U4HC7/HN7/8+ufw8d/rz7967f/XYBrfOefQ/X9d/D2z0d+TI6332vF9Yohc1J42JyBxW5CuqmxbBH5VoyFmxRXpg2WV2J1pYu4tHDRpPDafEGqGzrrik7jNrAt+Gw3pgro8BtRIryiQVQTlx7aDEgXi0cVZECGEyukfBBkuDzHGCtcJtA+mB1YKzdszwqXeSRTA+txaM4KBaNghpkLpIwQ9WWGjcWjV4wQ9dFWPLphhKiQa/Go7WqgwuXi0dkPY9s2qHDerpkbKSHkhZXHo3asQY2UCNElhfcLdxGPMrdJYTIgE2Uf992v2KTghJAWZo5HiRDSwrlNipkbYlVHkY2iN3Nv18tvnWMCK5ybFM6NR00FqM1k3jQjKQQr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"/>
              </defs>
            </svg>
            COMPRE JUNTO
          </button>
        </div>
      </div>
    </div>
  )
}

const CardPC=({NLI, placaVideo, processador, memoria, armazenamento, tipoArm,...props}:CardPCProps)=>{
  const salePricePix=DescontoPIX(props.precoVista, props.pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/props.precoDe)-100))
  const compareInput=useRef<HTMLInputElement>(null)
  const {PCs, addPC, removePC}:CompareContextType=useCompareContext()
  const pcObj:PcContextProps={
    placaVideo, processador, memoria, armazenamento, tipoArm, flagPercent:diffPercent, fonte:props.fonte, seller:props.seller,
    name:props.prodName, id:props.prodId, parcelas:props.parcelas, valorParcela:props.valorParcela, groupId:props.groupId,
    precoDe:props.precoDe, precoVista:props.precoVista, linkProd:props.linkProd, imgUrl:props.imgUrl, pix:props.pix
  }

  useEffect(()=>{
    if(!PCs.some((pc)=>pc.id===pcObj.id && pc.name===pcObj.name)){
      compareInput.current && (compareInput.current.checked=false)
    }
  },[PCs])

  const redirectProdPage=()=>{
    globalThis.window.location.href=props.linkProd
  }

  const {addItems}=useCart()

  const handleClick=()=>{
    try{
      addItems({
        orderItems: [
          {
            id: props.prodId,
            seller: '1',
            quantity: 1,
          },
          {
            id: props.combo?.id ?? '',
            seller: '1',
            quantity: 1,
          },
        ],
      })
    }finally{
      globalThis.window.location.href='/checkout'
    }
  }

  return (
    <div className='flex flex-col re1:flex-row w-full re1:h-[215px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
      hover:transition-shadow hover:duration-75 hover:ease-in text-secondary p-[10px] re1:p-0 justify-between rounded-lg'
    >

      <div className='flex re1:block re1:w-[15%]'>
        <div className='w-[32%] re1:w-full re1:h-full flex items-center justify-center'>
          <Image src={props.imgUrl} width={180} height={180} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%] re1:w-full cursor-pointer' alt={props.prodName} title={props.prodName} onClick={redirectProdPage}/>
        </div>

        <div className='flex re1:hidden w-full p-[10px] flex-col justify-around gap-1'>
          <div className='flex items-center justify-start'>
            {/* Trustvox */}
            <div className='flex justify-center items-center absolute'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
              </div>
              {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
            </div>

            <div className='flex re1:hidden items-center justify-start gap-2 w-[85px] ml-auto'>
              <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
                </svg>
              </div>

              <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
            </div>
          </div>

          <p className='line-clamp-2 text-xs'>{props.prodName}</p>

          <label className='flex gap-2 items-center'>
            <svg width="16" height="12" viewBox="0 0 16 12" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_243_92)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.28571 0.0407715H1.14286V1.69077H0.571429C0.255859 1.69077 0 1.93704 0 2.24077V3.34077C0 3.64451 0.255859 3.89077 0.571429 3.89077H1.14286V4.99077H0.571429C0.255859 4.99077 0 5.23703 0 5.54077V8.84077C0 9.14451 0.255859 9.39077 0.571429 9.39077H1.14286V9.94077V11.0408H2.28571H10.2857C10.9169 11.0408 11.4286 10.5483 11.4286 9.94077V8.84077H14.8571C15.4883 8.84077 16 8.3483 16 7.74077V3.89077C16 2.37196 14.7208 1.14077 13.1429 1.14077H4C3.3568 1.14077 2.76325 1.34534 2.28571 1.69057V0.0407715ZM2.28571 3.89077V7.74077H10.2857H11.4286H14.8571V3.89077C14.8571 2.9795 14.0896 2.24077 13.1429 2.24077H4C3.05323 2.24077 2.28571 2.9795 2.28571 3.89077ZM10.2857 8.84077H2.28571V9.94077H10.2857V8.84077ZM5.71429 6.64077C6.66106 6.64077 7.42857 5.90204 7.42857 4.99077C7.42857 4.0795 6.66106 3.34077 5.71429 3.34077C4.76751 3.34077 4 4.0795 4 4.99077C4 5.90204 4.76751 6.64077 5.71429 6.64077ZM13.1429 4.99077C13.1429 5.90204 12.3753 6.64077 11.4286 6.64077C10.4818 6.64077 9.71429 5.90204 9.71429 4.99077C9.71429 4.0795 10.4818 3.34077 11.4286 3.34077C12.3753 3.34077 13.1429 4.0795 13.1429 4.99077Z" fill="#DD1F26"/>
              </g>
              <defs>
              <clipPath id="clip0_243_92">
              <rect width="16" height="11" fill="white" transform="translate(0 0.0407715)"/>
              </clipPath>
              </defs>
            </svg>
            <span className='font-bold text-xs'>{placaVideo}</span>
          </label>

          <div className='flex gap-6'>
            <label className='flex gap-2 items-center'>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className='max-h-[15px]' xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.63636 1.49532H12.3636C13.5686 1.49532 14.5455 2.47215 14.5455 3.67714V12.4044C14.5455 13.6094 13.5686 14.5862 12.3636 14.5862H3.63636C2.43137 14.5862 1.45455 13.6094 1.45455 12.4044V3.67714C1.45455 2.47215 2.43137 1.49532 3.63636 1.49532ZM0 3.67714C0 1.66879 1.62802 0.0407715 3.63636 0.0407715H12.3636C14.372 0.0407715 16 1.66879 16 3.67714V12.4044C16 14.4127 14.372 16.0408 12.3636 16.0408H3.63636C1.62802 16.0408 0 14.4127 0 12.4044V3.67714ZM5.81818 4.40441C5.01484 4.40441 4.36364 5.05561 4.36364 5.85895V10.2226C4.36364 11.0259 5.01484 11.6771 5.81818 11.6771H10.1818C10.9852 11.6771 11.6364 11.0259 11.6364 10.2226V5.85895C11.6364 5.05561 10.9852 4.40441 10.1818 4.40441H5.81818ZM6.54545 2.94986C6.54545 3.3515 6.21982 3.67714 5.81818 3.67714C5.41655 3.67714 5.09091 3.3515 5.09091 2.94986C5.09091 2.54823 5.41655 2.22259 5.81818 2.22259C6.21982 2.22259 6.54545 2.54823 6.54545 2.94986ZM8 3.67714C8.40164 3.67714 8.72727 3.3515 8.72727 2.94986C8.72727 2.54823 8.40164 2.22259 8 2.22259C7.59836 2.22259 7.27273 2.54823 7.27273 2.94986C7.27273 3.3515 7.59836 3.67714 8 3.67714ZM10.9091 2.94986C10.9091 3.3515 10.5835 3.67714 10.1818 3.67714C9.78018 3.67714 9.45455 3.3515 9.45455 2.94986C9.45455 2.54823 9.78018 2.22259 10.1818 2.22259C10.5835 2.22259 10.9091 2.54823 10.9091 2.94986ZM5.81818 13.859C6.21982 13.859 6.54545 13.5333 6.54545 13.1317C6.54545 12.73 6.21982 12.4044 5.81818 12.4044C5.41655 12.4044 5.09091 12.73 5.09091 13.1317C5.09091 13.5333 5.41655 13.859 5.81818 13.859ZM8.72727 13.1317C8.72727 13.5333 8.40164 13.859 8 13.859C7.59836 13.859 7.27273 13.5333 7.27273 13.1317C7.27273 12.73 7.59836 12.4044 8 12.4044C8.40164 12.4044 8.72727 12.73 8.72727 13.1317ZM10.1818 13.859C10.5835 13.859 10.9091 13.5333 10.9091 13.1317C10.9091 12.73 10.5835 12.4044 10.1818 12.4044C9.78018 12.4044 9.45455 12.73 9.45455 13.1317C9.45455 13.5333 9.78018 13.859 10.1818 13.859ZM2.90909 9.49532C3.31072 9.49532 3.63636 9.82095 3.63636 10.2226C3.63636 10.6242 3.31072 10.9499 2.90909 10.9499C2.50746 10.9499 2.18182 10.6242 2.18182 10.2226C2.18182 9.82095 2.50746 9.49532 2.90909 9.49532ZM3.63636 8.04077C3.63636 7.63914 3.31072 7.3135 2.90909 7.3135C2.50746 7.3135 2.18182 7.63914 2.18182 8.04077C2.18182 8.44241 2.50746 8.76804 2.90909 8.76804C3.31072 8.76804 3.63636 8.44241 3.63636 8.04077ZM2.90909 5.13168C3.31072 5.13168 3.63636 5.45732 3.63636 5.85895C3.63636 6.26059 3.31072 6.58623 2.90909 6.58623C2.50746 6.58623 2.18182 6.26059 2.18182 5.85895C2.18182 5.45732 2.50746 5.13168 2.90909 5.13168ZM13.8182 10.2226C13.8182 9.82095 13.4925 9.49532 13.0909 9.49532C12.6893 9.49532 12.3636 9.82095 12.3636 10.2226C12.3636 10.6242 12.6893 10.9499 13.0909 10.9499C13.4925 10.9499 13.8182 10.6242 13.8182 10.2226ZM13.0909 7.3135C13.4925 7.3135 13.8182 7.63914 13.8182 8.04077C13.8182 8.44241 13.4925 8.76804 13.0909 8.76804C12.6893 8.76804 12.3636 8.44241 12.3636 8.04077C12.3636 7.63914 12.6893 7.3135 13.0909 7.3135ZM13.8182 5.85895C13.8182 5.45732 13.4925 5.13168 13.0909 5.13168C12.6893 5.13168 12.3636 5.45732 12.3636 5.85895C12.3636 6.26059 12.6893 6.58623 13.0909 6.58623C13.4925 6.58623 13.8182 6.26059 13.8182 5.85895Z" fill="#DD1F26"/>
              </svg>
              <span className='text-xs font-bold'>{processador}</span>
            </label>
            <label className='flex gap-2 items-center'>
              <svg width="16" height="11" viewBox="0 0 16 11" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.14286 1.75506C1.14286 1.43949 1.39872 1.18363 1.71429 1.18363H14.2857C14.6013 1.18363 14.8571 1.43949 14.8571 1.75506V6.89791H6.28571H5.14286H4H2.85714H1.14286V6.02069C1.82603 5.62551 2.28571 4.88683 2.28571 4.04077C2.28571 3.19471 1.82603 2.45602 1.14286 2.06086V1.75506ZM5.14286 8.04077H4V9.18363C4 9.81483 3.48834 10.3265 2.85714 10.3265H1.14286C0.511649 10.3265 0 9.81483 0 9.18363V8.04077V6.89791V6.32649V5.75506C0 5.43949 0.271136 5.19549 0.547991 5.04391C0.902483 4.84991 1.14286 4.4734 1.14286 4.04077C1.14286 3.60814 0.902483 3.23163 0.547991 3.03763C0.271136 2.88606 0 2.64205 0 2.32649V1.75506C0 0.80828 0.767509 0.0407715 1.71429 0.0407715H14.2857C15.2325 0.0407715 16 0.80828 16 1.75506V6.89791V8.04077V9.18363C16 9.81483 15.4883 10.3265 14.8571 10.3265H6.28571C5.65451 10.3265 5.14286 9.81483 5.14286 9.18363V8.04077ZM14.8571 8.04077H6.28571V9.18363H14.8571V8.04077ZM1.14286 8.04077H2.85714V9.18363H1.14286V8.04077ZM5.14286 2.89791H2.85714V5.18363H5.14286V2.89791ZM11.4286 2.89791H13.7143V5.18363H11.4286V2.89791ZM10.2857 2.89791H6.28571V5.18363H10.2857V2.89791Z" fill="#DD1F26"/>
              </svg>
              <span className='text-xs font-bold'>{memoria}</span>
            </label>
          </div>
          <label className='flex gap-2 items-center'>
            <svg width="16" height="12" viewBox="0 0 16 12" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1538 1.77154H1.84615C1.50628 1.77154 1.23077 2.04708 1.23077 2.38693V3.00231H2.46154C3.14127 3.00231 3.69231 3.55339 3.69231 4.23308V7.92539C3.69231 8.60508 3.14127 9.15616 2.46154 9.15616H1.23077V9.77154C1.23077 10.1114 1.50628 10.3869 1.84615 10.3869H14.1538C14.4937 10.3869 14.7692 10.1114 14.7692 9.77154V2.38693C14.7692 2.04708 14.4937 1.77154 14.1538 1.77154ZM1.23077 7.92539V4.23308H2.46154V7.92539H1.23077ZM0 2.38693V3.00231V4.23308V7.92539V9.15616V9.77154C0 10.791 0.826548 11.6177 1.84615 11.6177H14.1538C15.1735 11.6177 16 10.791 16 9.77154V2.38693C16 1.36739 15.1735 0.540771 14.1538 0.540771H1.84615C0.826548 0.540771 0 1.36739 0 2.38693ZM6.76923 4.23308C7.10911 4.23308 7.38462 3.95754 7.38462 3.61769C7.38462 3.27785 7.10911 3.00231 6.76923 3.00231C6.42935 3.00231 6.15385 3.27785 6.15385 3.61769C6.15385 3.95754 6.42935 4.23308 6.76923 4.23308ZM7.38462 8.54077C7.38462 8.88059 7.10911 9.15616 6.76923 9.15616C6.42935 9.15616 6.15385 8.88059 6.15385 8.54077C6.15385 8.20096 6.42935 7.92539 6.76923 7.92539C7.10911 7.92539 7.38462 8.20096 7.38462 8.54077ZM12.9231 4.23308C13.263 4.23308 13.5385 3.95754 13.5385 3.61769C13.5385 3.27785 13.263 3.00231 12.9231 3.00231C12.5832 3.00231 12.3077 3.27785 12.3077 3.61769C12.3077 3.95754 12.5832 4.23308 12.9231 4.23308ZM13.5385 8.54077C13.5385 8.88059 13.263 9.15616 12.9231 9.15616C12.5832 9.15616 12.3077 8.88059 12.3077 8.54077C12.3077 8.20096 12.5832 7.92539 12.9231 7.92539C13.263 7.92539 13.5385 8.20096 13.5385 8.54077ZM8.61539 4.84846H11.0769V7.31H8.61539V4.84846ZM7.38462 4.84846C7.38462 4.16878 7.93563 3.61769 8.61539 3.61769H11.0769C11.7567 3.61769 12.3077 4.16878 12.3077 4.84846V7.31C12.3077 7.9897 11.7567 8.54077 11.0769 8.54077H8.61539C7.93563 8.54077 7.38462 7.9897 7.38462 7.31V4.84846Z" fill="#DD1F26"/>
            </svg>
            <span className='text-xs font-bold'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}</span>
          </label>

          <p className='text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})} <span className='text-xs font-normal'>No Pix</span></p>

          <label className='flex cursor-pointer gap-2'>
            <input ref={compareInput} type='checkbox' className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]'
              onChange={(event)=>{
                const Target=event.target as HTMLInputElement
                Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
              }}
            />
            <span className='text-xs'>Compare com outros PCs</span> 
          </label>
        </div>
      </div>

      <div className='hidden re1:flex w-[30%] p-[10px] flex-col justify-around'>
        <div className='flex items-center justify-start'>
          {/* Trustvox */}
          <div className='flex justify-center items-center absolute'>
            <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
              <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
            </div>
            {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
          </div>
        </div>

        <p className='line-clamp-2 text-xs'>{props.prodName}</p>

        <label className='flex gap-2 items-center'>
          <svg width="16" height="12" viewBox="0 0 16 12" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_243_92)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.28571 0.0407715H1.14286V1.69077H0.571429C0.255859 1.69077 0 1.93704 0 2.24077V3.34077C0 3.64451 0.255859 3.89077 0.571429 3.89077H1.14286V4.99077H0.571429C0.255859 4.99077 0 5.23703 0 5.54077V8.84077C0 9.14451 0.255859 9.39077 0.571429 9.39077H1.14286V9.94077V11.0408H2.28571H10.2857C10.9169 11.0408 11.4286 10.5483 11.4286 9.94077V8.84077H14.8571C15.4883 8.84077 16 8.3483 16 7.74077V3.89077C16 2.37196 14.7208 1.14077 13.1429 1.14077H4C3.3568 1.14077 2.76325 1.34534 2.28571 1.69057V0.0407715ZM2.28571 3.89077V7.74077H10.2857H11.4286H14.8571V3.89077C14.8571 2.9795 14.0896 2.24077 13.1429 2.24077H4C3.05323 2.24077 2.28571 2.9795 2.28571 3.89077ZM10.2857 8.84077H2.28571V9.94077H10.2857V8.84077ZM5.71429 6.64077C6.66106 6.64077 7.42857 5.90204 7.42857 4.99077C7.42857 4.0795 6.66106 3.34077 5.71429 3.34077C4.76751 3.34077 4 4.0795 4 4.99077C4 5.90204 4.76751 6.64077 5.71429 6.64077ZM13.1429 4.99077C13.1429 5.90204 12.3753 6.64077 11.4286 6.64077C10.4818 6.64077 9.71429 5.90204 9.71429 4.99077C9.71429 4.0795 10.4818 3.34077 11.4286 3.34077C12.3753 3.34077 13.1429 4.0795 13.1429 4.99077Z" fill="#DD1F26"/>
            </g>
            <defs>
            <clipPath id="clip0_243_92">
            <rect width="16" height="11" fill="white" transform="translate(0 0.0407715)"/>
            </clipPath>
            </defs>
          </svg>
          <span className='font-bold text-xs'>{placaVideo}</span>
        </label>


        <div className='flex gap-6'>
          <label className='flex gap-2 items-center'>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className='max-h-[15px]' xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.63636 1.49532H12.3636C13.5686 1.49532 14.5455 2.47215 14.5455 3.67714V12.4044C14.5455 13.6094 13.5686 14.5862 12.3636 14.5862H3.63636C2.43137 14.5862 1.45455 13.6094 1.45455 12.4044V3.67714C1.45455 2.47215 2.43137 1.49532 3.63636 1.49532ZM0 3.67714C0 1.66879 1.62802 0.0407715 3.63636 0.0407715H12.3636C14.372 0.0407715 16 1.66879 16 3.67714V12.4044C16 14.4127 14.372 16.0408 12.3636 16.0408H3.63636C1.62802 16.0408 0 14.4127 0 12.4044V3.67714ZM5.81818 4.40441C5.01484 4.40441 4.36364 5.05561 4.36364 5.85895V10.2226C4.36364 11.0259 5.01484 11.6771 5.81818 11.6771H10.1818C10.9852 11.6771 11.6364 11.0259 11.6364 10.2226V5.85895C11.6364 5.05561 10.9852 4.40441 10.1818 4.40441H5.81818ZM6.54545 2.94986C6.54545 3.3515 6.21982 3.67714 5.81818 3.67714C5.41655 3.67714 5.09091 3.3515 5.09091 2.94986C5.09091 2.54823 5.41655 2.22259 5.81818 2.22259C6.21982 2.22259 6.54545 2.54823 6.54545 2.94986ZM8 3.67714C8.40164 3.67714 8.72727 3.3515 8.72727 2.94986C8.72727 2.54823 8.40164 2.22259 8 2.22259C7.59836 2.22259 7.27273 2.54823 7.27273 2.94986C7.27273 3.3515 7.59836 3.67714 8 3.67714ZM10.9091 2.94986C10.9091 3.3515 10.5835 3.67714 10.1818 3.67714C9.78018 3.67714 9.45455 3.3515 9.45455 2.94986C9.45455 2.54823 9.78018 2.22259 10.1818 2.22259C10.5835 2.22259 10.9091 2.54823 10.9091 2.94986ZM5.81818 13.859C6.21982 13.859 6.54545 13.5333 6.54545 13.1317C6.54545 12.73 6.21982 12.4044 5.81818 12.4044C5.41655 12.4044 5.09091 12.73 5.09091 13.1317C5.09091 13.5333 5.41655 13.859 5.81818 13.859ZM8.72727 13.1317C8.72727 13.5333 8.40164 13.859 8 13.859C7.59836 13.859 7.27273 13.5333 7.27273 13.1317C7.27273 12.73 7.59836 12.4044 8 12.4044C8.40164 12.4044 8.72727 12.73 8.72727 13.1317ZM10.1818 13.859C10.5835 13.859 10.9091 13.5333 10.9091 13.1317C10.9091 12.73 10.5835 12.4044 10.1818 12.4044C9.78018 12.4044 9.45455 12.73 9.45455 13.1317C9.45455 13.5333 9.78018 13.859 10.1818 13.859ZM2.90909 9.49532C3.31072 9.49532 3.63636 9.82095 3.63636 10.2226C3.63636 10.6242 3.31072 10.9499 2.90909 10.9499C2.50746 10.9499 2.18182 10.6242 2.18182 10.2226C2.18182 9.82095 2.50746 9.49532 2.90909 9.49532ZM3.63636 8.04077C3.63636 7.63914 3.31072 7.3135 2.90909 7.3135C2.50746 7.3135 2.18182 7.63914 2.18182 8.04077C2.18182 8.44241 2.50746 8.76804 2.90909 8.76804C3.31072 8.76804 3.63636 8.44241 3.63636 8.04077ZM2.90909 5.13168C3.31072 5.13168 3.63636 5.45732 3.63636 5.85895C3.63636 6.26059 3.31072 6.58623 2.90909 6.58623C2.50746 6.58623 2.18182 6.26059 2.18182 5.85895C2.18182 5.45732 2.50746 5.13168 2.90909 5.13168ZM13.8182 10.2226C13.8182 9.82095 13.4925 9.49532 13.0909 9.49532C12.6893 9.49532 12.3636 9.82095 12.3636 10.2226C12.3636 10.6242 12.6893 10.9499 13.0909 10.9499C13.4925 10.9499 13.8182 10.6242 13.8182 10.2226ZM13.0909 7.3135C13.4925 7.3135 13.8182 7.63914 13.8182 8.04077C13.8182 8.44241 13.4925 8.76804 13.0909 8.76804C12.6893 8.76804 12.3636 8.44241 12.3636 8.04077C12.3636 7.63914 12.6893 7.3135 13.0909 7.3135ZM13.8182 5.85895C13.8182 5.45732 13.4925 5.13168 13.0909 5.13168C12.6893 5.13168 12.3636 5.45732 12.3636 5.85895C12.3636 6.26059 12.6893 6.58623 13.0909 6.58623C13.4925 6.58623 13.8182 6.26059 13.8182 5.85895Z" fill="#DD1F26"/>
            </svg>
            <span className='text-xs font-bold'>{processador}</span>
          </label>
          <label className='flex gap-2 items-center'>
            <svg width="16" height="11" viewBox="0 0 16 11" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.14286 1.75506C1.14286 1.43949 1.39872 1.18363 1.71429 1.18363H14.2857C14.6013 1.18363 14.8571 1.43949 14.8571 1.75506V6.89791H6.28571H5.14286H4H2.85714H1.14286V6.02069C1.82603 5.62551 2.28571 4.88683 2.28571 4.04077C2.28571 3.19471 1.82603 2.45602 1.14286 2.06086V1.75506ZM5.14286 8.04077H4V9.18363C4 9.81483 3.48834 10.3265 2.85714 10.3265H1.14286C0.511649 10.3265 0 9.81483 0 9.18363V8.04077V6.89791V6.32649V5.75506C0 5.43949 0.271136 5.19549 0.547991 5.04391C0.902483 4.84991 1.14286 4.4734 1.14286 4.04077C1.14286 3.60814 0.902483 3.23163 0.547991 3.03763C0.271136 2.88606 0 2.64205 0 2.32649V1.75506C0 0.80828 0.767509 0.0407715 1.71429 0.0407715H14.2857C15.2325 0.0407715 16 0.80828 16 1.75506V6.89791V8.04077V9.18363C16 9.81483 15.4883 10.3265 14.8571 10.3265H6.28571C5.65451 10.3265 5.14286 9.81483 5.14286 9.18363V8.04077ZM14.8571 8.04077H6.28571V9.18363H14.8571V8.04077ZM1.14286 8.04077H2.85714V9.18363H1.14286V8.04077ZM5.14286 2.89791H2.85714V5.18363H5.14286V2.89791ZM11.4286 2.89791H13.7143V5.18363H11.4286V2.89791ZM10.2857 2.89791H6.28571V5.18363H10.2857V2.89791Z" fill="#DD1F26"/>
            </svg>
            <span className='text-xs font-bold'>{memoria}</span>
          </label>
        </div>
        <label className='flex gap-2 items-center'>
          <svg width="16" height="12" viewBox="0 0 16 12" className='max-h-[15px]' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1538 1.77154H1.84615C1.50628 1.77154 1.23077 2.04708 1.23077 2.38693V3.00231H2.46154C3.14127 3.00231 3.69231 3.55339 3.69231 4.23308V7.92539C3.69231 8.60508 3.14127 9.15616 2.46154 9.15616H1.23077V9.77154C1.23077 10.1114 1.50628 10.3869 1.84615 10.3869H14.1538C14.4937 10.3869 14.7692 10.1114 14.7692 9.77154V2.38693C14.7692 2.04708 14.4937 1.77154 14.1538 1.77154ZM1.23077 7.92539V4.23308H2.46154V7.92539H1.23077ZM0 2.38693V3.00231V4.23308V7.92539V9.15616V9.77154C0 10.791 0.826548 11.6177 1.84615 11.6177H14.1538C15.1735 11.6177 16 10.791 16 9.77154V2.38693C16 1.36739 15.1735 0.540771 14.1538 0.540771H1.84615C0.826548 0.540771 0 1.36739 0 2.38693ZM6.76923 4.23308C7.10911 4.23308 7.38462 3.95754 7.38462 3.61769C7.38462 3.27785 7.10911 3.00231 6.76923 3.00231C6.42935 3.00231 6.15385 3.27785 6.15385 3.61769C6.15385 3.95754 6.42935 4.23308 6.76923 4.23308ZM7.38462 8.54077C7.38462 8.88059 7.10911 9.15616 6.76923 9.15616C6.42935 9.15616 6.15385 8.88059 6.15385 8.54077C6.15385 8.20096 6.42935 7.92539 6.76923 7.92539C7.10911 7.92539 7.38462 8.20096 7.38462 8.54077ZM12.9231 4.23308C13.263 4.23308 13.5385 3.95754 13.5385 3.61769C13.5385 3.27785 13.263 3.00231 12.9231 3.00231C12.5832 3.00231 12.3077 3.27785 12.3077 3.61769C12.3077 3.95754 12.5832 4.23308 12.9231 4.23308ZM13.5385 8.54077C13.5385 8.88059 13.263 9.15616 12.9231 9.15616C12.5832 9.15616 12.3077 8.88059 12.3077 8.54077C12.3077 8.20096 12.5832 7.92539 12.9231 7.92539C13.263 7.92539 13.5385 8.20096 13.5385 8.54077ZM8.61539 4.84846H11.0769V7.31H8.61539V4.84846ZM7.38462 4.84846C7.38462 4.16878 7.93563 3.61769 8.61539 3.61769H11.0769C11.7567 3.61769 12.3077 4.16878 12.3077 4.84846V7.31C12.3077 7.9897 11.7567 8.54077 11.0769 8.54077H8.61539C7.93563 8.54077 7.38462 7.9897 7.38462 7.31V4.84846Z" fill="#DD1F26"/>
          </svg>
          <span className='text-xs font-bold'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}</span>
        </label>

        <p className='text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})} <span className='text-xs font-normal'>No Pix</span></p>

        <label className='flex cursor-pointer gap-2'>
          <input ref={compareInput} type='checkbox' className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]'
            onChange={(event)=>{
              const Target=event.target as HTMLInputElement
              Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
            }}
          />
          <span className='text-xs'>Compare com outros PCs</span> 
        </label>
      </div>

      <div className='flex flex-col re1:flex-row items-center w-full re1:w-[55%]'>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='re1:w-[5%]'>
          <path d="M11.75 26.6V18.125H3.725V14.875H11.75V6.4H15.15V14.875H23.175V18.125H15.15V26.6H11.75Z" fill="#DD1F26"/>
        </svg>

        {props.combo && (
          <div className='flex items-center justify-start re1:justify-between w-full re1:w-[50%] gap-[10px] px-[10px]'>
            <Image src={props.combo.image} width={90} height={90}/>
            <div>
              <p className='text-xs line-clamp-3'>{props.combo.name}</p>
              <p className='py-2 flex gap-1 justify-start items-center'>
                <span className='font-bold text-sm text-secondary'>{props.combo.finalPrice.toLocaleString('pr-BR',{style:'currency', currency:'BRL'})}</span>
                <span className='text-xs'>No Pix</span>
              </p>
            </div>
          </div>
        )}

        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" className='re1:w-[5%]'>
          <path d="M0.725 4.2V0.949998H20.175V4.2H0.725ZM0.725 14.05V10.8H20.175V14.05H0.725Z" fill="#DD1F26"/>
        </svg>
        
        <div className='flex flex-col items-center re1:items-start justify-center p-[10px] w-full re1:w-[40%] h-full'>
          <div className='hidden re1:flex items-center justify-start gap-2 w-[85px]'>
            <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
              </svg>
            </div>

            <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
          </div>

          <div className='flex flex-col gap-1 my-auto items-center re1:items-start'>
            <p className='hidden re1:block line-through text-xs'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
            <span className='text-[#00a74c] text-xl font-bold'>{(salePricePix + props.combo.finalPrice).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</span>
            <span className='text-xs'>No Pix ou em {props.parcelas}x de {(props.valorParcela + (props.combo.finalPrice/props.parcelas)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
          </div>

          <button className='bg-primary text-sm w-full rounded-lg font-extrabold flex gap-1 items-center justify-center h-7 py-1 mb-4' onClick={handleClick}>
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20.8" height="17.06" transform="translate(0 0.300049)" fill="url(#pattern0_243_76)"/>
              <defs>
              <pattern id="pattern0_243_76" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_243_76" transform="scale(0.00111111 0.00135318)"/>
              </pattern>
              <image id="image0_243_76" width="900" height="739" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAALjCAMAAAB9FjtfAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAYOdPDL9+Cv02LZnNm7OBImZYCDwkQCq1A1EAAAAJcEhZcwAACxMAAAsTAQCanBgAAB4ASURBVHja7d2Jcts4FoXhWDIlSpZ3O3r/Nx3ZWcZJJw5AEsT2/emerppUySKMg3MXAPzy5Reezitz/QXA/xW42WzOOdhsbq6oEXjKpMAPWrw5+DWgXx7uckvwhxKvrpki+rTBc0EITkGDRRiiXwtoMLcfyhDRTz5YpAbf7dAvB31wdy4WMoRgNL8M5YZon6I1+JYb+hWBEeaGGYIR5kZmCCLMHpIyQ4hG1WeARJxrgQpBhLmxgQZESIVA5yIUkYIIs+PXBSLMXSP1+wIR2sIG9C1CxRk0yH4UkAJ5GQWkQF52lQWk+hQQjwpIgYUZ1GYAVqhlj77ZVqZCR3zRYEA6skKAClkhqJAVAjnZjUQI5K7OVCRD22bQqhlWI0MNezTrhkMtOvS7Qrvst9vdB7a//fmV6L8dhkF9FMgs8uNFiqN4FMjLcTtbhwYRmOuIM8tADjQBC5SB5shQkwLILENJIbAM0zfqGDtgodxwaonG0V4gsxlKCoHFOE7KDCWFwIJMCknFo0DmkNTONSCzCiWFwKLEXzblLfZAbhVKCoHMKpQUAplVqEkBLE1sdSZJUni4urr595+bq0U4HC7/HN7/8+ufw8d/rz7967f/XYBrfOefQ/X9d/D2z0d+TI6332vF9Yohc1J42JyBxW5CuqmxbBH5VoyFmxRXpg2WV2J1pYu4tHDRpPDafEGqGzrrik7jNrAt+Gw3pgro8BtRIryiQVQTlx7aDEgXi0cVZECGEyukfBBkuDzHGCtcJtA+mB1YKzdszwqXeSRTA+txaM4KBaNghpkLpIwQ9WWGjcWjV4wQ9dFWPLphhKiQa/Go7WqgwuXi0dkPY9s2qHDerpkbKSHkhZXHo3asQY2UCNElhfcLdxGPMrdJYTIgE2Uf992v2KTghJAWZo5HiRDSwrlNipkbYlVHkY2iN3Nv18tvnWMCK5ybFM6NR00FqM1k3jQjKQQr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"/>
              </defs>
            </svg>
            COMPRE JUNTO
          </button>
        </div>
      </div>
    </div>
  )
}

const Card=({product, combo, descontoPix}:Props)=>{
  const avaibility=product.offers!.offers[0].availability==='https://schema.org/InStock'

  if(!avaibility){return null}

  const { seller } = useOffer(product.offers)

  const offer=product.offers!.offers![0]!
  const imgUrl=product.image![0].url!
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

  const linkProd=product.isVariantOf!.url!
  const prodName=product.name!
  const refId=product.inProductGroupWithID!
  const prodId=product.productID
  const precoDe=offer.priceSpecification.find(item=>item.priceType==='https://schema.org/ListPrice')!.price!
  const precoVista=offer.price!
  const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)!.billingIncrement!

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':prodId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)
    
  const handleTrust=
  useCallback(
    async()=>{
    const data=await invoke["deco-sites/shp"].loaders.getTrustvox({productId:refId, storeId:'79497'})
    const {products_rates}:{products_rates:ObjTrust[]}=data
    const obj:ObjTrust=products_rates[0]
    obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:prodId, average:0, count:0, product_name:prodName})
  }
  ,[refId, prodId, prodName])

  useEffect(()=>{
    handleTrust()
  },[])

  if(product.additionalProperty!.some(propValue=>propValue.propertyID==='10' && propValue.name==='category')){
    const additionalProp:PropertyValue[]=product.isVariantOf!.additionalProperty!

    if(!additionalProp.length){return null}

    const armaz=(additionalProp.find(propVal=>propVal.name==='SSD') || additionalProp.find(propVal=>propVal.name==='HD'))!
    
    if(!additionalProp.find(item=>item.name==='Memória')){
      return null
    }

    return <CardPC 
      NLI={prodName.slice(prodName.indexOf('NLI'),prodName.length).split(' ')[0]}
      placaVideo={additionalProp.find(item=>item.name==='Placa de vídeo')?.value! ?? ''}
      processador={additionalProp.find(item=>item.name==='Processador')?.value! ?? ''}
      armazenamento={armaz?.value! ?? ''}
      tipoArm={armaz?.name! ?? ''}
      memoria={additionalProp.find(item=>item.name==='Memória')?.value! ?? ''}
      fonte={additionalProp.find(item=>item.name==='Fonte')?.value! ?? ''}
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={descontoPix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      groupId={product.inProductGroupWithID ?? product.isVariantOf?.productGroupID ?? ''}
      seller={seller ?? '1'}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      objTrust={objTrust}
      trustPercent={trustPercent}
      combo={combo}
    />
  }else{
    return <CardProd
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={descontoPix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      objTrust={objTrust}
      trustPercent={trustPercent}
      combo={combo}
    />
  }
}

export default Card