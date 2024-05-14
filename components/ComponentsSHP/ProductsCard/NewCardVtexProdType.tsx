// deno-lint-ignore-file no-explicit-any
import {memo} from 'preact/compat'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { useState, useEffect, useRef} from 'preact/hooks'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from "deco-sites/shp/types/types.ts";
import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

export interface Props{
  product:any
  /**@description  pro evento de select_item do GA4*/
  item_list_id?:string
  /**@description  pro evento de select_item do GA4*/
  item_list_name?:string
  descontoPix:number
}

interface CardProps{
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  isAvailable:boolean
  pix:number
  objTrust:ObjTrust
  trustPercent:number
  GA4Func?:()=>void
} 

interface CardPCProps extends CardProps{
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  fonte:string
  frete?:string
  groupId:string
  seller:string
}

const ProdCard=({...props}:CardProps)=>{
  const {prodId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe, isAvailable, pix} = props

  const salePricePix=DescontoPIX(precoVista, pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))

  return(
    <a className='flex flex-col w-full max-w-[280px] text-secondary bg-[#262626] rounded-lg border relative p-3 border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd} onClick={props.GA4Func}>
      <div className='flex flex-col h-auto w-auto'>
      <div className='flex flex-col re1:flex-row gap-2 re1:gap-0 items-start re1:items-center absolute re1:static mt-2 re1:mt-0'>
          <div className='flex items-center justify-start mt-[-12%] re1:mt-0'>
            {/* Trustvox */}
            {props.objTrust.average ===0 ? null :
              <div className='flex justify-center items-center absolute'>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
                </div>
                <span className='text-yellow-300 text-xs'>({props.objTrust?.count})</span>
              </div>
            }
          </div>
          
          <div className='flex flex-col re1:flex-row items-center justify-start re1:justify-end gap-2 re1:w-[85px] re1:ml-auto'>
            {/* <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
              </svg>
            </div> */}

            <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
          </div>
        </div>
        <Image className='m-auto mt-2 re1:mt-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low' preload={false} alt={prodName} title={prodName}/>
      </div>
      <div className='flex flex-col justify-between my-auto h-[240px] gap-2'>
        <p title={prodName} className='text-xs leading-4'>
          {prodName}
        </p>

        {isAvailable ? (
        <div className='mt-4 w-full'>
          <p className='hidden re1:block line-through text-[11px]'>De: {precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
          <p className='text-lg font-bold text-success leading-3'>{salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} <span className='text-[11px] font-normal text-secondary'>no Pix</span></p>
          <p className='text-[11px]'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</p>
        </div>) : (<p className='text-xl text-primary font-bold'>Produto Esgotado</p>)}
      </div>
    </a>
  )
}

const PcCard=({...props}:CardPCProps)=>{
  const {prodId, prodName, precoVista, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, valorParcela, isAvailable, pix, precoDe, fonte} = props
  const salePricePix=DescontoPIX(precoVista, pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/precoDe)-100))
  const arm=(armazenamento || '').toString().toUpperCase()
  const compareInput=useRef<HTMLInputElement>(null)
  const {PCs, addPC, removePC}:CompareContextType=useCompareContext()
  const pcObj:PcContextProps={
    placaVideo, processador, memoria, armazenamento:arm, tipoArm, flagPercent:diffPercent, fonte, seller:props.seller, groupId:props.groupId,
    name:prodName, id:prodId, parcelas, valorParcela, precoDe, precoVista, linkProd, imgUrl, pix
  }
  
  useEffect(()=>{
    if(!PCs.some((pc)=>pc.id===pcObj.id && pc.name===pcObj.name)){
      compareInput.current && (compareInput.current.checked=false)
    }
  },[PCs])

  return(
    <a className='flex flex-col w-full max-w-[280px] text-secondary bg-[#262626] rounded-lg border relative p-3 border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd} onClick={props.GA4Func}>
      <div className='flex flex-col h-auto w-auto'>
        <div className='flex flex-col re1:flex-row gap-2 re1:gap-0 items-start re1:items-center absolute re1:static mt-2 re1:mt-0'>
          <div className='flex items-center justify-start mt-[-12%] re1:mt-0'>
            {/* Trustvox */}
            {props.objTrust.average ===0 ? null :
              <div className='flex justify-center items-center absolute'>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-18px]'/>
                </div>
                <span className='text-yellow-300 text-xs'>({props.objTrust?.count})</span>
              </div>
            } 
          </div>
          
          <div className='flex flex-col re1:flex-row items-center justify-start gap-2 re1:w-[85px] re1:ml-auto'>
            <div className='flex items-center justify-center bg-[#C44604] h-[25px] w-[35px] rounded-lg'>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
              </svg>
            </div>

            <span className='flex items-center justify-center bg-success font-semibold text-xs rounded-lg h-[25px] w-[35px]'>-{diffPercent}%</span>
          </div>
        </div>
        <Image className='m-auto mt-2 re1:mt-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low' preload={false} alt={prodName} title={prodName}/>
      </div>
      <div className='flex flex-col justify-between my-auto h-[240px] gap-2'>
        <p title={prodName} className='text-xs line-clamp-2 leading-4'>
          {prodName}
        </p>

        <div className='w-full flex flex-col justify-start gap-2 font-bold'>
          <label className='flex items-center gap-1' title={placaVideo}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.28571 0H1.14286V1.65H0.571429C0.255859 1.65 0 1.89627 0 2.2V3.3C0 3.60374 0.255859 3.85 0.571429 3.85H1.14286V4.95H0.571429C0.255859 4.95 0 5.19626 0 5.5V8.8C0 9.10374 0.255859 9.35 0.571429 9.35H1.14286V9.9V11H2.28571H10.2857C10.9169 11 11.4286 10.5075 11.4286 9.9V8.8H14.8571C15.4883 8.8 16 8.30753 16 7.7V3.85C16 2.33119 14.7208 1.1 13.1429 1.1H4C3.3568 1.1 2.76325 1.30457 2.28571 1.6498V0ZM2.28571 3.85V7.7H10.2857H11.4286H14.8571V3.85C14.8571 2.93873 14.0896 2.2 13.1429 2.2H4C3.05323 2.2 2.28571 2.93873 2.28571 3.85ZM10.2857 8.8H2.28571V9.9H10.2857V8.8ZM5.71429 6.6C6.66106 6.6 7.42857 5.86127 7.42857 4.95C7.42857 4.03873 6.66106 3.3 5.71429 3.3C4.76751 3.3 4 4.03873 4 4.95C4 5.86127 4.76751 6.6 5.71429 6.6ZM13.1429 4.95C13.1429 5.86127 12.3753 6.6 11.4286 6.6C10.4818 6.6 9.71429 5.86127 9.71429 4.95C9.71429 4.03873 10.4818 3.3 11.4286 3.3C12.3753 3.3 13.1429 4.03873 13.1429 4.95Z" fill="#DD1F26"/>
            </svg>
            <p className='text-[12px] line-clamp-1 text-secondary'>{placaVideo}</p>
          </label>

          <label className='flex items-center gap-1' title={processador}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.63636 1.45455H12.3636C13.5686 1.45455 14.5455 2.43137 14.5455 3.63636V12.3636C14.5455 13.5686 13.5686 14.5455 12.3636 14.5455H3.63636C2.43137 14.5455 1.45455 13.5686 1.45455 12.3636V3.63636C1.45455 2.43137 2.43137 1.45455 3.63636 1.45455ZM0 3.63636C0 1.62802 1.62802 0 3.63636 0H12.3636C14.372 0 16 1.62802 16 3.63636V12.3636C16 14.372 14.372 16 12.3636 16H3.63636C1.62802 16 0 14.372 0 12.3636V3.63636ZM5.81818 4.36364C5.01484 4.36364 4.36364 5.01484 4.36364 5.81818V10.1818C4.36364 10.9852 5.01484 11.6364 5.81818 11.6364H10.1818C10.9852 11.6364 11.6364 10.9852 11.6364 10.1818V5.81818C11.6364 5.01484 10.9852 4.36364 10.1818 4.36364H5.81818ZM6.54545 2.90909C6.54545 3.31072 6.21982 3.63636 5.81818 3.63636C5.41655 3.63636 5.09091 3.31072 5.09091 2.90909C5.09091 2.50746 5.41655 2.18182 5.81818 2.18182C6.21982 2.18182 6.54545 2.50746 6.54545 2.90909ZM8 3.63636C8.40164 3.63636 8.72727 3.31072 8.72727 2.90909C8.72727 2.50746 8.40164 2.18182 8 2.18182C7.59836 2.18182 7.27273 2.50746 7.27273 2.90909C7.27273 3.31072 7.59836 3.63636 8 3.63636ZM10.9091 2.90909C10.9091 3.31072 10.5835 3.63636 10.1818 3.63636C9.78018 3.63636 9.45455 3.31072 9.45455 2.90909C9.45455 2.50746 9.78018 2.18182 10.1818 2.18182C10.5835 2.18182 10.9091 2.50746 10.9091 2.90909ZM5.81818 13.8182C6.21982 13.8182 6.54545 13.4925 6.54545 13.0909C6.54545 12.6893 6.21982 12.3636 5.81818 12.3636C5.41655 12.3636 5.09091 12.6893 5.09091 13.0909C5.09091 13.4925 5.41655 13.8182 5.81818 13.8182ZM8.72727 13.0909C8.72727 13.4925 8.40164 13.8182 8 13.8182C7.59836 13.8182 7.27273 13.4925 7.27273 13.0909C7.27273 12.6893 7.59836 12.3636 8 12.3636C8.40164 12.3636 8.72727 12.6893 8.72727 13.0909ZM10.1818 13.8182C10.5835 13.8182 10.9091 13.4925 10.9091 13.0909C10.9091 12.6893 10.5835 12.3636 10.1818 12.3636C9.78018 12.3636 9.45455 12.6893 9.45455 13.0909C9.45455 13.4925 9.78018 13.8182 10.1818 13.8182ZM2.90909 9.45455C3.31072 9.45455 3.63636 9.78018 3.63636 10.1818C3.63636 10.5835 3.31072 10.9091 2.90909 10.9091C2.50746 10.9091 2.18182 10.5835 2.18182 10.1818C2.18182 9.78018 2.50746 9.45455 2.90909 9.45455ZM3.63636 8C3.63636 7.59836 3.31072 7.27273 2.90909 7.27273C2.50746 7.27273 2.18182 7.59836 2.18182 8C2.18182 8.40164 2.50746 8.72727 2.90909 8.72727C3.31072 8.72727 3.63636 8.40164 3.63636 8ZM2.90909 5.09091C3.31072 5.09091 3.63636 5.41655 3.63636 5.81818C3.63636 6.21982 3.31072 6.54545 2.90909 6.54545C2.50746 6.54545 2.18182 6.21982 2.18182 5.81818C2.18182 5.41655 2.50746 5.09091 2.90909 5.09091ZM13.8182 10.1818C13.8182 9.78018 13.4925 9.45455 13.0909 9.45455C12.6893 9.45455 12.3636 9.78018 12.3636 10.1818C12.3636 10.5835 12.6893 10.9091 13.0909 10.9091C13.4925 10.9091 13.8182 10.5835 13.8182 10.1818ZM13.0909 7.27273C13.4925 7.27273 13.8182 7.59836 13.8182 8C13.8182 8.40164 13.4925 8.72727 13.0909 8.72727C12.6893 8.72727 12.3636 8.40164 12.3636 8C12.3636 7.59836 12.6893 7.27273 13.0909 7.27273ZM13.8182 5.81818C13.8182 5.41655 13.4925 5.09091 13.0909 5.09091C12.6893 5.09091 12.3636 5.41655 12.3636 5.81818C12.3636 6.21982 12.6893 6.54545 13.0909 6.54545C13.4925 6.54545 13.8182 6.21982 13.8182 5.81818Z" fill="#DD1F26"/>
            </svg>

            <p className='text-[12px] line-clamp-1 text-secondary'>{processador}</p>
          </label>

          <label className='flex items-center gap-1' title={memoria}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.14286 1.71429C1.14286 1.39872 1.39872 1.14286 1.71429 1.14286H14.2857C14.6013 1.14286 14.8571 1.39872 14.8571 1.71429V6.85714H6.28571H5.14286H4H2.85714H1.14286V5.97991C1.82603 5.58474 2.28571 4.84606 2.28571 4C2.28571 3.15394 1.82603 2.41525 1.14286 2.02009V1.71429ZM5.14286 8H4V9.14286C4 9.77406 3.48834 10.2857 2.85714 10.2857H1.14286C0.511649 10.2857 0 9.77406 0 9.14286V8V6.85714V6.28571V5.71429C0 5.39871 0.271136 5.15471 0.547991 5.00314C0.902483 4.80914 1.14286 4.43263 1.14286 4C1.14286 3.56737 0.902483 3.19086 0.547991 2.99686C0.271136 2.84529 0 2.60128 0 2.28571V1.71429C0 0.767509 0.767509 0 1.71429 0H14.2857C15.2325 0 16 0.767509 16 1.71429V6.85714V8V9.14286C16 9.77406 15.4883 10.2857 14.8571 10.2857H6.28571C5.65451 10.2857 5.14286 9.77406 5.14286 9.14286V8ZM14.8571 8H6.28571V9.14286H14.8571V8ZM1.14286 8H2.85714V9.14286H1.14286V8ZM5.14286 2.85714H2.85714V5.14286H5.14286V2.85714ZM11.4286 2.85714H13.7143V5.14286H11.4286V2.85714ZM10.2857 2.85714H6.28571V5.14286H10.2857V2.85714Z" fill="#DD1F26"/>
          </svg>

            <p className='text-[12px] line-clamp-1 text-secondary'>{memoria}</p>
          </label>

          <label className='flex items-center gap-1' title={(arm.includes('HD') || arm.includes('SSD')) ? armazenamento: `${tipoArm} ${arm}`}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_278_2647)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1538 1.23077H1.84615C1.50628 1.23077 1.23077 1.50631 1.23077 1.84615V2.46154H2.46154C3.14127 2.46154 3.69231 3.01262 3.69231 3.69231V7.38462C3.69231 8.06431 3.14127 8.61539 2.46154 8.61539H1.23077V9.23077C1.23077 9.57059 1.50628 9.84615 1.84615 9.84615H14.1538C14.4937 9.84615 14.7692 9.57059 14.7692 9.23077V1.84615C14.7692 1.50631 14.4937 1.23077 14.1538 1.23077ZM1.23077 7.38462V3.69231H2.46154V7.38462H1.23077ZM0 1.84615V2.46154V3.69231V7.38462V8.61539V9.23077C0 10.2503 0.826548 11.0769 1.84615 11.0769H14.1538C15.1735 11.0769 16 10.2503 16 9.23077V1.84615C16 0.826622 15.1735 0 14.1538 0H1.84615C0.826548 0 0 0.826622 0 1.84615ZM6.76923 3.69231C7.10911 3.69231 7.38462 3.41677 7.38462 3.07692C7.38462 2.73708 7.10911 2.46154 6.76923 2.46154C6.42935 2.46154 6.15385 2.73708 6.15385 3.07692C6.15385 3.41677 6.42935 3.69231 6.76923 3.69231ZM7.38462 8C7.38462 8.33982 7.10911 8.61539 6.76923 8.61539C6.42935 8.61539 6.15385 8.33982 6.15385 8C6.15385 7.66018 6.42935 7.38462 6.76923 7.38462C7.10911 7.38462 7.38462 7.66018 7.38462 8ZM12.9231 3.69231C13.263 3.69231 13.5385 3.41677 13.5385 3.07692C13.5385 2.73708 13.263 2.46154 12.9231 2.46154C12.5832 2.46154 12.3077 2.73708 12.3077 3.07692C12.3077 3.41677 12.5832 3.69231 12.9231 3.69231ZM13.5385 8C13.5385 8.33982 13.263 8.61539 12.9231 8.61539C12.5832 8.61539 12.3077 8.33982 12.3077 8C12.3077 7.66018 12.5832 7.38462 12.9231 7.38462C13.263 7.38462 13.5385 7.66018 13.5385 8ZM8.61539 4.30769H11.0769V6.76923H8.61539V4.30769ZM7.38462 4.30769C7.38462 3.62801 7.93563 3.07692 8.61539 3.07692H11.0769C11.7567 3.07692 12.3077 3.62801 12.3077 4.30769V6.76923C12.3077 7.44892 11.7567 8 11.0769 8H8.61539C7.93563 8 7.38462 7.44892 7.38462 6.76923V4.30769Z" fill="#DD1F26"/>
              </g>
              <defs>
              <clipPath id="clip0_278_2647">
              <rect width="16" height="11.0769" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <p className='text-[12px] line-clamp-1 text-secondary'>{(arm.includes('HD') || arm.includes('SSD')) ? 
              armazenamento: `${tipoArm} ${arm}`}
            </p>
          </label>
        </div>
        {isAvailable ? (
        <div className='mt-4 w-full'>
          <p className='hidden re1:block line-through text-[11px]'>De: {precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
          <p className='text-lg font-bold text-success leading-3'>{salePricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} <span className='text-[11px] font-normal text-secondary'>no Pix</span></p>
          <p className='text-[11px]'>{parcelas}x {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} sem juros</p>
        </div>
      ) : (<p className='text-xl text-primary font-bold'>Produto Esgotado</p>)}
        <label className='flex gap-2 text-sm items-center'>
          <input ref={compareInput} type='checkbox' name='compare' id='COMPARE-PC' className='checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]' onChange={(event)=>{
              const Target=event.target as HTMLInputElement
              Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
          }}/>
          <p>Compare</p>
        </label>
      </div>
    </a>
  )
}

const replaceListInfo=globalThis.window.location.pathname

const Card=({product, item_list_id=replaceListInfo, item_list_name=replaceListInfo, descontoPix}:Props)=>{
  const PCGamer=product.categoriesIds.includes('/10/')
  const image=product.items[0].images[0].imageUrl
  const prodId=product.items[0].itemId
  const refId=product.productId
  const name=product.productName
  const priceVista=product.items[0].sellers[0].commertialOffer.Price
  const priceDe=product.items[0].sellers[0].commertialOffer.ListPrice
  const linkProduto='/'+product.linkText+'/p'
  const avaibility=product.items[0].sellers[0].commertialOffer.IsAvailable

  const installments=product.items[0].sellers[0].commertialOffer.Installments

  const maxInstallments=(()=>{
    let maxInstallments=0

    installments.forEach((installment:any)=>{
      installment.NumberOfInstallments > maxInstallments && (maxInstallments=installment.NumberOfInstallments)
    })

    return maxInstallments
  })()

  const valorParcela=installments.find((installment:any)=>installment.NumberOfInstallments===maxInstallments)?.value || priceVista/maxInstallments

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':prodId, 'average':0, 'count':0, 'product_name':name})
  const [trustPercent, setTrustPercent]=useState(0)
    
  useEffect(()=>{
    const handleTrust=async()=>{
      const data=await invoke['deco-sites/shp'].loaders.getTrustvox({productId:refId, storeId:'79497'})
      
      const {products_rates}:{products_rates:ObjTrust[]}=data
      const obj:ObjTrust=products_rates[0]
      console.log(obj)
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:prodId, average:0, count:0, product_name:name})
    }
    handleTrust()
  },[])


  const handleClick=()=>{
    sendEvent({name:'select_item', params:{
      item_list_id,
      item_list_name,
      items:[product]
    }})
  }

  if(PCGamer){
    return <PcCard  armazenamento={(product.SSD || product.HD) ?? ''} imgUrl={image} prodName={name} memoria={product.Memória ?? ''} objTrust={objTrust} trustPercent={trustPercent}
    placaVideo={product['Placa de vídeo'] ?? ''} linkProd={linkProduto} prodId={prodId} precoDe={priceDe} precoVista={priceVista} isAvailable={avaibility} seller={product.items[0].sellers[0].sellerId ?? '1'} groupId={refId ?? ''} 
    processador={product.Processador ?? ''} tipoArm={product.SSD ? 'SSD' : 'HD'} parcelas={maxInstallments}  valorParcela={valorParcela} pix={descontoPix} fonte={product.Fonte} GA4Func={handleClick}/>
  }else{
    return <ProdCard imgUrl={image} linkProd={linkProduto} precoDe={priceDe} precoVista={priceVista} parcelas={maxInstallments} objTrust={objTrust}
      trustPercent={trustPercent} prodId={prodId} prodName={name} valorParcela={valorParcela} isAvailable={avaibility} pix={descontoPix} GA4Func={handleClick}/>
  }
}

export default memo(Card)