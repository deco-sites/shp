// deno-lint-ignore-file no-explicit-any
import { Offer, Product, PropertyValue } from 'apps/commerce/types.ts'
import { useState, useEffect, useRef } from 'preact/hooks'
import { invoke } from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import { useCompareContext, CompareContextType, PcContextProps } from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { useOffer } from 'deco-sites/fashion/sdk/useOffer.ts'

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
  brinde?:{
    imageUrl:string
    productName:string
  }
} 

interface CardPCProps extends CardProps{
  NLI:string
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  frete?:string
  fonte:string
  groupId:string
  seller:string
}

export type Props={
  product:Product
  frete?:string
  brinde:any
  descontoPix:number
}

const CardProd=(props:CardProps)=>{
  const salePricePix=DescontoPIX(props.precoVista, props.pix)
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/props.precoDe)-100))

  return (
    <a href={props.linkProd} className='flex flex-col re1:flex-row w-full h-[215px] re1:h-[245px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
    hover:transition-shadow hover:duration-75 hover:ease-in text-secondary p-[10px] re1:p-0 justify-between'
    >
      {/* Mobile */}
      <div className='flex re1:hidden h-[40px] gap-1'>
        {/* Vazia pra prods normais */}
        <div className='flex w-[27.5%]'/>
        
        <div className='rounded-lg bg-[#00a74c] w-[15%] font-bold text-lg flex flex-col items-center'>
          <span>{diffPercent}%</span>
          <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.62872" y1="1.25068" x2="9.28916" y2="7.67856" stroke="white" stroke-width="2"/>
            <line x1="8.35721" y1="7.66181" x2="16.0177" y2="1.23394" stroke="white" stroke-width="2"/>
          </svg>
        </div>
      </div>

      <div className='flex re1:block re1:w-[20%] h-full'>
        <div className='w-[32%] re1:w-full re1:h-full flex items-center justify-center'>
          <Image src={props.imgUrl} width={180} height={180} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%]' alt={props.prodName} title={props.prodName}/>
        </div>

        {/* Mobile */}
        <div className='flex re1:hidden flex-col w-[68%] justify-around'>
          <div>
            <div className='flex items-center justify-start mb-2'>
              {/* Trustvox */}
              <div className='flex justify-center items-center absolute'>
                <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                  <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
                </div>
                {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
              </div>
            </div>

            <p className='text-sm line-clamp-2'>{props.prodName}</p>
          </div>

          <div>
            <p className='line-through text-sm'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
            <p className='text-[#00a74c] text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}<span className='text-xs text-secondary'> No Pix</span></p>
            <p className='text-sm'>ou em {props.parcelas}x de {props.valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
          </div>

        </div>
      </div>
  
      {/* Desktop */}
      <div className='hidden re1:flex w-[40%] p-[10px] flex-col justify-around'>
        <div className='flex items-center justify-start'>
          {/* Trustvox */}
          <div className='flex justify-center items-center absolute'>
            <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
              <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
            </div>
            {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
          </div>
        </div>
  
        <p className='line-clamp-3'>{props.prodName}</p>
  
        <div className='flex h-[60px]'>
          <div className='bg-[#1e1e1e] p-[10px] flex items-center justify-center gap-2'>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/pix-icon.png' height={30} width={30} loading='lazy' decoding='sync' fetchPriority='low'/>
            <span className='font-bold'>{props.pix}% no PIX</span>
          </div>
          <div className='flex items-center justify-around bg-primary p-[10px] gap-2'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={30} width={30}  x="30px" y="30px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
            <p className='text-center font-bold re1:text-sm re5:text-base leading-5'>ESTA OFERTA<br/>ESTÁ ATIVA</p>
          </div>
        </div>
      </div>
  
      {/* Desktop */}
      <div className='hidden re1:grid grid-cols-2 w-[40%]'>
        <div className='flex flex-col items-center justify-center border-l-2 border-l-[#353535] py-[10px]'>
          <div className='flex items-center justify-center gap-2 w-[85px] py-1 bg-primary rounded-lg mb-8'>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/downPrice-arrow.png' className='max-h-[15px]'
              width={15} height={15} decoding='sync' loading='lazy' fetchPriority='low'
            />
            <span className='font-bold text-2xl'>{diffPercent}%</span>
          </div>
          <p className='line-through'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
          <span className='text-[#00a74c] text-4xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</span>
          <span>No Pix</span>
          <p className='mt-5'>ou em {props.parcelas}x de {props.valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
        </div>
  
        <div className='flex flex-col items-center justify-around bg-[#353535] py-[10px] text-center'>
        {props.brinde && (
          <div className='flex flex-col items-center justify-between w-[80%]'>
            <Image src={props.brinde.imageUrl} width={130} height={130}/>
            <p>{props.brinde.productName}</p>
            <div className='w-full py-2 flex gap-3 justify-center bg-primary border-primary hover:border-primary hover:bg-primary rounded-lg'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png' className='h-[18px] my-auto'
                width={22} height={18} decoding='auto' fetchPriority='high' loading='eager'
              />
              <p className='font-bold text-base re1:text-lg text-secondary capitalize'>Compre e Ganhe</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </a>)
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

  return (
  <a href={props.linkProd} className='flex flex-col re1:flex-row w-full h-[215px] re1:h-[245px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
    hover:transition-shadow hover:duration-75 hover:ease-in text-secondary p-[10px] re1:p-0 justify-between'
  >
    {/* Mobile */}
    <div className='flex re1:hidden h-[40px] gap-1'>
      <div className='flex rounded-lg border border-[#00a74c] w-[27.5%] justify-around items-center'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-frete-white.png' width={23} height={15} className='max-h-[15px]'/>
        <p className='text-left font-bold text-sm leading-4'>FRETE<br/>GRÁTIS</p>
      </div>
      <div className='rounded-lg bg-[#00a74c] w-[15%] font-bold text-lg flex flex-col items-center'>
        <span>{diffPercent}%</span>
        <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.62872" y1="1.25068" x2="9.28916" y2="7.67856" stroke="white" stroke-width="2"/>
          <line x1="8.35721" y1="7.66181" x2="16.0177" y2="1.23394" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    </div>

    <div className='flex re1:block re1:w-[10%]'>
      <div className='w-[32%] re1:w-full re1:h-full flex items-center justify-center'>
        <Image src={props.imgUrl} width={150} height={150} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%]' alt={props.prodName} title={props.prodName}/>
      </div>

      {/* Mobile */}
      <div className='flex re1:hidden flex-col w-[68%]'>
        <div className='flex items-center justify-start mb-2'>
          {/* Trustvox */}
          <div className='flex justify-center items-center absolute'>
            <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
              <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
            </div>
            {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
          </div>
        </div>

        <p className='flex text-sm'><span className='line-clamp-1 max-w-[75%]'>{props.prodName}</span> {NLI}</p>

        <div>
          <label className='flex gap-2 items-center'>
            <Image
              className='max-h-[15px]'
              src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg'
              width={15}
              height={15}
              loading='lazy'
            />
            <span className='font-bold text-xs line-clamp-2'>{placaVideo}</span>
          </label>

          <div className='flex gap-6'>
            <label className='flex gap-2 items-center'>
              <Image
                className='max-h-[15px]'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
                width={15}
                height={15}
                loading='lazy'
              />
              <span className='text-[10px] line-clamp-2'>{processador}</span>
            </label>
            <label className='flex gap-2 items-center'>
              <Image
                className='max-h-[15px]'
                src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
                width={15}
                height={15}
                loading='lazy'
              />
              <span className='text-[10px] line-clamp-2'>{memoria}</span>
            </label>
            
            <span className='text-[10px] line-clamp-2'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}</span>
          </div>
        </div>

        <div>
          <p className='line-through text-sm'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
          <p className='text-[#00a74c] text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}<span className='text-xs text-secondary'> No Pix</span></p>
          <p className='text-sm'>ou em {props.parcelas}x de {props.valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
        </div>

      </div>
    </div>

    {/* Desktop */}
    <div className='hidden re1:flex w-[40%] p-[10px] flex-col justify-around'>
      <div className='flex items-center justify-start'>
        {/* Trustvox */}
        <div className='flex justify-center items-center absolute'>
          <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
            <div style={{width:`${props.trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
          </div>
          {props.objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({props.objTrust.count})</span>}
        </div>
      </div>

      <p className='line-clamp-3 text-sm'>{props.prodName}</p>
      <label className='flex gap-2 items-center'>
        <Image
          className='max-h-[15px]'
          src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg'
          width={15}
          height={15}
          loading='lazy'
        />
        <span className='font-bold text-sm'>{placaVideo}</span>
      </label>

      <div className='flex gap-6'>
        <label className='flex gap-2 items-center'>
          <Image
            className='max-h-[15px]'
            src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
            width={15}
            height={15}
            loading='lazy'
          />
          <span className='text-sm'>{processador}</span>
        </label>
        <label className='flex gap-2 items-center'>
          <Image
            className='max-h-[15px]'
            src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
            width={15}
            height={15}
            loading='lazy'
          />
          <span className='text-sm'>{memoria}</span>
        </label>
        <label className='flex gap-2 items-center'>
          <Image
            className='max-h-[15px]'
            src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
            width={15}
            height={15}
            loading='lazy'
          />
          <span className='text-sm'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}</span>
        </label>
      </div>

      <div className='flex h-[60px] w-full'>

        <div className='form-control h-full justify-center'>
          <label className='label cursor-pointer gap-2'>
            <input ref={compareInput} type='checkbox' id='COMPARE-PC' className='toggle toggle-sm toggle-primary' onChange={(event)=>{
              const Target=event.target as HTMLInputElement
              Target.checked ? (PCs.length<4 ? addPC(pcObj) : (Target.checked=false, alert('Só é possível comparar 4 items por vez!'))) : removePC(pcObj.name, pcObj.id)
            }}/>
            <span className='text-xs'>Compare com<br/>outros PCs</span> 
          </label>
        </div>
      </div>
    </div>

    <div className='hidden re1:grid grid-cols-2 w-[50%]'>
      <div className='flex flex-col items-center justify-around bg-[#353535] py-[10px] text-center'>
        {props.brinde && (
          <div className='flex items-center justify-between w-[80%]'>
            <Image src={props.brinde.imageUrl} width={60} height={60}/>
            <div>
              <p className='text-sm'>{props.brinde.productName}</p>
              <p className='py-2 flex gap-1 justify-start items-center'>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_259_113)">
                  <path d="M12.2938 4.86166L10.9215 4.36217C11.4176 3.95218 11.6295 3.30186 11.4776 2.68389C11.1791 1.46975 9.69872 1.00884 8.76346 1.83564L7.81594 2.67323L7.6285 1.41706C7.44316 0.180327 6.01136 -0.414673 5.0041 0.322241C4.50046 0.690698 4.23254 1.32587 4.35135 1.9708L3.0575 1.49988C2.42094 1.26814 1.7144 1.59758 1.48266 2.23423L0.92239 3.7736C0.845034 3.98614 0.954628 4.22119 1.1672 4.29851C1.25341 4.32988 7.47655 6.59492 7.56793 6.62817C7.30893 6.62817 1.63699 6.62817 1.38745 6.62817C1.16126 6.62817 0.977898 6.81154 0.977898 7.03773V12.7714C0.977898 13.4489 1.52907 14 2.20653 14H5.48292H7.12111H10.3975C11.075 14 11.6261 13.4489 11.6261 12.7714V8.10526L11.943 8.22059C12.1545 8.29765 12.3902 8.18923 12.4679 7.97581L13.0282 6.43644C13.2598 5.7998 12.9304 5.09337 12.2938 4.86166ZM5.07334 13.1809H2.20651C1.98067 13.1809 1.79695 12.9972 1.79695 12.7714V7.44728H5.07334V13.1809ZM6.71153 13.1809H5.89244V7.44728H6.71153V13.1809ZM9.30593 2.44934C9.78103 2.02931 10.5311 2.26493 10.6822 2.87948C10.8433 3.53472 10.21 4.10287 9.57609 3.87253C9.03692 3.67628 8.78427 3.58432 8.24436 3.3878L9.30593 2.44934ZM5.4877 0.983358C5.99958 0.608913 6.72465 0.912756 6.81847 1.53852L7.02847 2.94522C6.87731 2.8902 5.84552 2.51464 5.69685 2.46055C5.06292 2.22969 4.94318 1.38165 5.4877 0.983358ZM5.68064 5.06961L1.83217 3.66887L2.25239 2.51436C2.32964 2.30215 2.56515 2.19239 2.77734 2.26958C3.208 2.42631 6.1081 3.48187 6.24091 3.53021L5.68064 5.06961ZM7.22004 5.62994L6.45034 5.34977L7.01064 3.8104L7.78034 4.09056L7.22004 5.62994ZM10.807 12.7714C10.807 12.9972 10.6233 13.1809 10.3974 13.1809H7.53064V7.44728H9.81838L10.807 7.80713V12.7714H10.807ZM12.2584 6.15625L11.8382 7.31078L7.98974 5.91005L8.55004 4.37067L12.0136 5.6313C12.2259 5.70855 12.3356 5.94406 12.2584 6.15625Z" fill="#DD1F26"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_259_113">
                  <rect width="14" height="14" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <span className='font-bold text-sm text-secondary capitalize'>Brinde Exclusivo</span>
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className='flex flex-col items-start justify-center border-l-2 border-l-[#353535] p-[10px]'>
        <div className='flex items-center justify-start gap-2 w-[85px]'>
          <div className='bg-[#C44604] px-2 py-1 rounded-lg'>
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5625 3.125H7.875L8.4375 4.25H1.125L0.5625 3.125ZM1.3125 5.375H8.625L9.1875 6.5H1.875L1.3125 5.375ZM13.5 11.375C14.1225 11.375 14.625 10.8725 14.625 10.25C14.625 9.6275 14.1225 9.125 13.5 9.125C12.8775 9.125 12.375 9.6275 12.375 10.25C12.375 10.8725 12.8775 11.375 13.5 11.375ZM14.625 4.625H12.75V6.5H16.095L14.625 4.625ZM6 11.375C6.6225 11.375 7.125 10.8725 7.125 10.25C7.125 9.6275 6.6225 9.125 6 9.125C5.3775 9.125 4.875 9.6275 4.875 10.25C4.875 10.8725 5.3775 11.375 6 11.375ZM15 3.5L17.25 6.5V10.25H15.75C15.75 11.495 14.745 12.5 13.5 12.5C12.255 12.5 11.25 11.495 11.25 10.25H8.25C8.25 11.495 7.2375 12.5 6 12.5C4.755 12.5 3.75 11.495 3.75 10.25H2.25V7.625H3.75V8.75H4.32C4.7325 8.2925 5.3325 8 6 8C6.6675 8 7.2675 8.2925 7.68 8.75H11.25V2H2.25C2.25 1.1675 2.9175 0.5 3.75 0.5H12.75V3.5H15Z" fill="white"/>
            </svg>
          </div>

          <span className='bg-success font-bold text-sm rounded-lg px-2 py-1'>-{diffPercent}%</span>
        </div>

        <p className='line-through text-xs'>de: {props.precoDe.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
        <span className='text-[#00a74c] text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</span>
        <span className='text-xs'>No Pix ou em {props.parcelas}x de {props.valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>

        <div className='bg-primary w-full rounded-lg font-bold flex gap-1 items-center justify-center'>
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20.8" height="17.06" transform="translate(0 0.300049)" fill="url(#pattern0_243_76)"/>
            <defs>
            <pattern id="pattern0_243_76" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_243_76" transform="scale(0.00111111 0.00135318)"/>
            </pattern>
            <image id="image0_243_76" width="900" height="739" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAALjCAMAAAB9FjtfAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAYOdPDL9+Cv02LZnNm7OBImZYCDwkQCq1A1EAAAAJcEhZcwAACxMAAAsTAQCanBgAAB4ASURBVHja7d2Jcts4FoXhWDIlSpZ3O3r/Nx3ZWcZJJw5AEsT2/emerppUySKMg3MXAPzy5Reezitz/QXA/xW42WzOOdhsbq6oEXjKpMAPWrw5+DWgXx7uckvwhxKvrpki+rTBc0EITkGDRRiiXwtoMLcfyhDRTz5YpAbf7dAvB31wdy4WMoRgNL8M5YZon6I1+JYb+hWBEeaGGYIR5kZmCCLMHpIyQ4hG1WeARJxrgQpBhLmxgQZESIVA5yIUkYIIs+PXBSLMXSP1+wIR2sIG9C1CxRk0yH4UkAJ5GQWkQF52lQWk+hQQjwpIgYUZ1GYAVqhlj77ZVqZCR3zRYEA6skKAClkhqJAVAjnZjUQI5K7OVCRD22bQqhlWI0MNezTrhkMtOvS7Qrvst9vdB7a//fmV6L8dhkF9FMgs8uNFiqN4FMjLcTtbhwYRmOuIM8tADjQBC5SB5shQkwLILENJIbAM0zfqGDtgodxwaonG0V4gsxlKCoHFOE7KDCWFwIJMCknFo0DmkNTONSCzCiWFwKLEXzblLfZAbhVKCoHMKpQUAplVqEkBLE1sdSZJUni4urr595+bq0U4HC7/HN7/8+ufw8d/rz7967f/XYBrfOefQ/X9d/D2z0d+TI6332vF9Yohc1J42JyBxW5CuqmxbBH5VoyFmxRXpg2WV2J1pYu4tHDRpPDafEGqGzrrik7jNrAt+Gw3pgro8BtRIryiQVQTlx7aDEgXi0cVZECGEyukfBBkuDzHGCtcJtA+mB1YKzdszwqXeSRTA+txaM4KBaNghpkLpIwQ9WWGjcWjV4wQ9dFWPLphhKiQa/Go7WqgwuXi0dkPY9s2qHDerpkbKSHkhZXHo3asQY2UCNElhfcLdxGPMrdJYTIgE2Uf992v2KTghJAWZo5HiRDSwrlNipkbYlVHkY2iN3Nv18tvnWMCK5ybFM6NR00FqM1k3jQjKQQrzNykEI9CVvjHkxQrriZmAlhh5k4hK0Q+rhtJCudauqwQ2Sh589p2zecwFZANx+sd7IV4tIyTvdJCiEfznqSgQohHcyeFqjMgwrxNindcNoMsHBpJCpd5DgcqICnMmBR+L5PeiEohHp0Uj6ZaTK5/+xP1t0txOFz/9ufw279hf7s6V0UT/zy/DPMv/PLLv/zGrm42myZEuG6TAliWw00LIoyJRw9+6SiN6039DhKzaebKrxzl0YAVrt2kAJblRlIIZM4L6xdhzDspJIUokE31IvxSQJMCIMIW6rwgwmrn7k5SiA4qM0U/wl6TAkRYTzyqSQEizB2P+o2DCDPHo5oUIELxKNCgCAfxKCpm08LMjdk0o0kBIswcj9o0AyIUjwK/0MbE3RIhquXQxsS1aQb1ctWIe2hSoFqCOhTjvvjnsGkGbddlxvKf46hJASKsJx7VpEB9dZmhgicZJIVouS5Tgwg1KdByNHreVvAkmhSolHMjxVHxKNpOCccqnmVHhGg3JaxDhEcne9FuSrir42E0KVAh1+dm6jLiUbQcjZ73dTxNRJNiY9MMqopGx0pEqEmBZqPRoZbnGSSFqI2bplJCSSEq5NxUSqhJgWaj0bEaEcbEo5JC1FOWqaVLKClEs0Z4PtbzSBHXj2pSoJ6yTEXRaNSmGSJENWWZoaZnkhSiQSOsp0HxhiYFGjTC8VjTQ+3Fo2jPCIe6HkunEM0ZYU0Nish4VJMCeblqMhqN2zRjFiArmzajUU0KNGeEtUWjmhRozgir6tS/E7NpxjxAPg7nVqPRqHjUREA+QvsT47a+ZxskhWjJCMcKH243alKgISPc1fh04lGUz3XLRkiEqIGrhssyX6I2zWhSIBPnZvsT7+w1KdBMWWao9AHFoyidTdtGGNWkcJICjDAFRycpwAirSQrFo8jAdfNGGBWPmhBYn+BG/bHeZ9xqUqBk2m7Uf49HXfeEBozwvK1ZhOJRtGCE+5qfcqdJgWJp90T91KRQkwKMMEk8qkkBRpgZJ3tRKpsO+hOxSaEmBdbk0EGj/htHJynACKuJR4kQK3LdjRFqUqBQWr5j7Xe2rnsCI8yMpBA1G+GuhafVpEDNZZkmnlaTAuXRTaP+G3tJIeo1wn0bz6tJgdI4dFWW+aJJgYrLMo0YYcymGUkh1uC6NyOMaVJIClGUER6beWRNCpTFuav+xDsRm2aIEOm56s8IxaNghBXFo5oUSM6ho63b/yfinb2mCFKz6dEIY+JRnUIk5rqvHWsTRCgeRSlGuG/ruSM2zZgkKKMs05gRxmzi1qRAGUZ4bO3JNSlQmREOzT25JgXK4KbL/sQ7R00KMMJq4lFNCqTjqteyjHgU1ZVl9g0+/FaTAowwL5oUYIT1JIWaFEjEoeeyzBebZlAAN9026r+hSYHcXHduhDHxqOuekNcIt62OwE6TApWUZZodAU0K5CX4aplds0OgSQFGmJtBkwIZOTBCSSEqKcu0PAiSQmREf+I9KRw0KVC+Ee6bHoadpBCMsJZ4VFKIhbnqfMfaz3hUkwK5OCvLfENSiEwcut+xFp8UikexKBr1Pwg/SUGEyFKW2bU/Fq57QtlGuG9/LOxcQ9FlmQ6MMOKdveJRZDDCYw+joUmBgo1w6GI0BkkhVueGEX4k/J29kkIwwszx6EY8imW4UpaRFKKOssyw72RAdnauYV0OjPA39poUKNMIx303Q+IOYKyKg4T/ZZAUYk30J/7LUZMCjLCWeFRSiPkEn6jf9jQqg6QQBZZluhqV8E3cdq5hLk7Ui0fBCOsWoXgUK5Vlxl1nA7PTpMBKuPr+L+w1KVCWEfbVnxCPokQj3Hc3NDsixCowwr9ydJICa+Dq+yWSQk0KMMI02DSDFQg+SLjtcXS2mhRIj4OEy8SjmhSYiqvvxaOoxQiPfY6PJgWKKct0aoQRSaEmBabhRP1iSaEmBdIa4dDtCEkKUYgRbrsdIicpUEZZpl8jdN0T0hK8Y23X8SANkkIUYIRjz4OkSYGEuPo+BNc9oYSyzL7rYZIUIr8RDn2Pk6QQ+Y3w2Pc4aVIgFdfKMmGEb5qxcw1xOFEvKURmGOHi8aikEEnKMh3vWPvBUZMCjLCWeFRSiJiyjB1r4WhSIAWuvk8SjxorhKNRnyQelRRieSPcG6uYeFSTAowwDcGbuCWFCEWjPlU8aucaGKGkEFWgUR+LTTNYGI36WPaaFFgUV99LClGLEepP/GSwcw05yjKM8P/YNIMlcaI+aTxqqLCcEepPTIpHNSmwnBHqT3xkq0mB9csyhuojmhRYDFffp04KNSnACNMQvGnGSQp8jht/p3L0TgqsXJbRqJcUIgnXjDB9PGrTDBhhGjQpsAhnZZnpSaF4FAvgRP0cBk0KzEd/YpWkUJMCf8WJekkhGGHN7AdJIWbi6vu1kkJNCvwFV99LCpEZJ+rnxqOaFFjJCDXqZ8ejmhSYZYR2rM2PRyWF+BMa9fM5eicFGGFmiBAzCD5IqFG/RFIoHsV/cePvEgS/I02TAtONUH9CPApG2EQ8qkmB33CifiE0KTAVV98vxF5SiIkwwtWTQvEophmh/sRi8SgRYlpZxlAtFo9KCvERV99niEclhWCEiXC8HhM4MMIFCd4040WFmFCWMVTiUSRBoz5PPGrnGuKN0I61IHaSQjDCvOwlhYjEiXpJITKjPyEeRV5cfb84wTfN2LkGRpg5HrVzDTFlGUYYgU0zYISZ2RIhInC1TAI0KRCBRn3WeNSmGThRnwhNCixvhBr1UWhSgBHmxqYZBHKlPyEpBCNsE00KLGuE+hPpkkJNis5x9b14FHk5iEbToUmBRY1Qf2JCUqhJgX/jRH1SNCnwb1x9LylEZkKN0PkJSSHSoFGfFicpsFxZxlCljUclhd3i6vtS4lFJISNkhIlwkgKfc80Ik+O6JzBCSSEaMEKN+hmEbpqRFPaJq2VKikc1KbqEEUoKkRfvgFmFnaQQjDAve00KzDXCsx1rkkLkNUJlmZXiUUlhdxwY4UocNSnwZ1wtU1w8KilkhO5YS8QgKcQsI9SfmE3ophlNir6wY63EeNRIdYV3wJQYj0oKu4IRrokmBWYYof7EEuw1KTC9LGOoJIVIQvDWbf2JdeNRSSEjZISJODpJgV9xx1qpSaF4lBEywlQMRIgpRqg/sRxbTQp8xNUyGZJCTQp8wI418SgYYYdoUuADXoZWclKoSdED7ljLgiYFGKGkENUZoa3beZJCTQpGyAgToUmB79ixJh4FIyRCTQpG6I61LGhS4B2XjebD8Xq8YceapBC1GKFGfQJCmxTuAGaEjDBzPCopZIQa9amQFIIRVpIUalK0y41GfV5CN83YucYINeozx6OSwu6NUKM+dzwqKWSEGvWpCH1HmiZFo1wpy1QTj0oKG8WOtXpEKB5lhEjFzs41RsgI87KXFHaMW7clhajFCG3dToomBSPUqM9MaJPCzjVGiMzxqKSQESJzPGrnWnMEa9AZptTsJIWMkBHmZS8pZISMUFIIRigelRQyQmeYMhLapDBSLRF8jtCOtZLiUQPFCJGKwc41RqhRnzke1aTojWtGWBhHx5l6Y8MIC8Nxpt4IPsvrDNNqaFJ0FowywmqTQvFob1UZRlhePGqkmiB4r4wda2uiSaEqwwjrSAo1KRghkiWF4tF+ODPCMnGcSVWGEdaRFGpSVE/4XhlnmCSFyFyV0SNcGU2KTrhihNXHo3audVOVYYSSQuQNRpVG10eTQjDKCHOjSdE+EZVRRlhwPGrnWhcJoZtlsqBJISF0oD4zgU0KIqyVw5kRtpIUalI0X5O5aJARFp0UalJUKcGYUFRVJhtH8WirgehNnATt3C49HiXCmri+CDBSgYywhnj0+oCCubpwc2EzQX369LkJ3TSDtlGVqaA+isZFSAlEiLwaVJXJyc4MhKpMXvasEPbKiEehKqNJAVUZ5GxSmIS9a1CLUFKIvBpUlZEUQjCqSWEeCkaRlyMrVBmFeBSCUU0KdKpBbXpJIfJq0J5RSSEkhJAU6hBCUghFGdi5pigDSSFoUDwKGoQmBWhQUoh+JEiDkkLoTUBS2LMG9eiJEHk1aK+aygzyhqLSQUkhslZk2KB4FLJBEGHHEhSJSgqRMxAlQUkhspZj5ILlQ4RNV2OYoKQQ+QQ4UKCkENn0Nw47t4pWhNvw25LfRX+ywFaTwsuv1yQvVHfvDBf1sb+2k8Lhyx4lYgY3wHYMFCGArPGo94cAuZNCuw+BVOzO4lEgK3vxKCAeBcSjIVaoGg4kIvQkhZ0YQOZ4VGkGSMUgHgXqiEeVZoDM8aj32gGpCK2PKs0AmeNRVgjkjkftmgHyxqOsEEjFnhUCmRlYIZCX0Hf2skIgczzKCoFUBJdm9AqBNBxZIZCZ4NKMHaRA3njUYQogEeH34bNCILcVqs0Ama3QEXsgDcGvKlSbAdIQ/upstRkgsxUKSIE0bEcBKZCX8PeA2sgNZM4K7V4DsluhtBDIbYXSQiAF4QVSG2eAJIRvm1GcAbJboZ49kNsKqRBIwe5MhUA9VkiFQAK2cSo0YMDiDFEi5IXA4hyjrFCnAlieqNqMrj2wPHG1GTvYgOXZxqpwkBgCyzKcz0JSoKaAlBkCuQNSmSGweEA6QYVkCCxJvAjfZCg1BBbjOEWF3BBYkN0kFV5kONhCAyyUFp4nQofAMuzH83mGDneECORJCz8I8aLE3fa4/zNfPvzrb2f87Ze3f8xWaeEkif7819/O+NvxGyIPKkR2LjpkiE0WZ6iwKh3q0yqRIrsbMkMlUuSWodRQiRRUiKXZUmFlKhSRUiEy4611VIjcVmgTPRVCQAoq7BxWSIVghaDCzrFzRr8QCqRIwN4+0oriUfO1UahQUojcONlUDfauKc9AZQapEsORDIkQEkMQocQQckLoVeBzVEeZIbQowAy7xo6ZLpoVboBSl0FuM9zqVohGkT81JMMycZ5QhQaZjVCDoquglBsWqEFGKCiF0ijWrpSSoWAUBfQN6ZAGkZkjHdIg8utwZyNNbgl6KxP2W0JUF0V+IR7flEiK61dFt2wQv8Sm2+1Fi4MtpisJcNgdSRB/tkWsg6kGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOuy338/U//Fke90Y7w3xvjDvDget7vdMIzjt5ue3v47DsNutz26AmWpQb6M8cfre76P8bDbbo+uueibd/V9fifmZZqYJHMH+fO7s960aLnrc3HehV43+qZEc2QS4RdJvinReHU3OSKvid65qz12lYu8yfUtB7DY9aLAadf8jiMdRilw2p34LuTuYHbMuWh7dGd76DI3Y4wHcWnbs2PuVfeXKcIO/8Fu/iBb68yOf0wRMkwUaXxc62SHJPj5FBEw/Znjcu+3IkMS5IaTXNCLC7GOBMlwBQl+e3chGSrHfL5Qk+EHCe6SvN1RiUaeYqEOXudSjbH8u4lINOW7ns2QtOuc1LCFFTrx6+jNkNTrnJjU9GCGGQoyljrTI3aGWOcsdVi5WPCf2kHH6/Sw1iAPJrQl2jr9p1hjXG2QhaSWaKWDjLHG90HWl7VEi5byxRoSw/o4rjw93hJDGhRwIFeY1Gl5ZsgxyFRoiZazZNWgIikNUmFuDVIhDVLhj7rXkG2QqZAGqfDdB3OOMRXSIBV+GbIOMhWqi/5jhuxpkAq75phbg5cZQoM6FT2zz6/B9rv2uxIG2d6ZYilgejQfLO3KGGQqFCd1Gywdyxjj8+hMBQ12ukzvSxnj82jCK4z2uUwP5YyxEmmLcdLpdPuN02nuR7U6QZZICO/e2Ww2on5r9Ef1PT5+fX19/vlZz8+vXx/naLHRCTJnodvc3T+9vDxc+P5hDy9P9/d3M6TokG8ra/TF/r4+/+Uzn6cLsc20cOIYby4CfHn480c+vNxP9kRpYQsJ4cUCn//xwa8TddhiWjit8rXZPP3jcx8m6lBAWn8werp9Dfrsx0kybG+CTAlGN5v7h5DPfribokPdwsqD0dPtc/DHv06QYXsZyzhFguEfP8UOVUhrXqNjJDhRhmPvC12UBKfJUEBabzAaK8E3vsbKsLEJEt2mj5XgG9HFUhXSSqsyp9PXST/m8dSzFUYudJu7lyk/5SFWhgLSKpOV0+3Un/N8GyXDpvZ0RC50/6yI/pWnDStsPlmZaINTzLClNsW4gg1OMkNWWN38mJIN/poZ9hmQRi10U7LBXws02hQNz4/T49yf9nzbZawUpcGXuT8tKiS1b6au+TErFJ2SGI4dLnSbh/k/72XDCquq2o2rajAuMWxkgkS0JzZ3D0v8xIeIliErrMgIT68L/cgYFbZhhBEaXOpnhquQFdYTKC2mwRgVtpEVhvcI75b7oaywPSNcKBb9Rnhe2EIFPbxHuHlY7qc+bPqrfzVuhItqMEKFLfQKhxwajFGhXmEVRji/N/G7CvuZIMHb4+f3Jn4luEYqHq1iftwu/ZOfT92IMLQsM32r2t8I7do7TFFDoHR6XvxHh+6dqb52F9qf2Nwt/7PvWGEz0ejCCWFcWli7FW5DjTDBzw5NC5Vmii/bLZ4QfuPUR2lml6MoE5sWKs2UHo2e0vz010AV1h2PBkajczdtzwxIxaOFR6NJgtGIgLTuVfqYLxiNCEjtmik7Gj3dJvsCpw7i0SFLd+L/BFZIxaNFZyundF8gsEJa9SodFm3cp/sCd+LR6hfpRFWZGCusuYsVlhKmqcp8I+xwofpopmxlzGyEoVY4VByP7nIbYehObv36PClh0C/nMel3CLPCilfpMW9GGG6FksKCo9HnpN8hzAq3jYvwLu132LRf/qo2WwkS4W3ib3FqO1QKSwlf0n6JMCvUpMiREq58kvfPPLadFAalhHcPib/FRlJYc0p4Sv0twrbNVCvCIXtZ5o07SWHNi/Rj8q9x27QIx+xlmTeCts0QYaGLdOKyTHA8um1ZhHfpv8ZGZabeusxt+u8RFI/Wmq8EtWLv03+Pe5WZMkVYRjQaFo/WGiqFhPzLH6j/L0EnmlRmyhThayEirDVUCok2Nmt8ESIsM1IqoUHxxteGtxcXkhKG1UdVZlZnW0ZKGJYU1uqEhaSEYUkhERaZrjyu8k1C4tFjuyJ8WuOLvCiP1pqufC1GhNtmRbh5WOOLBHUKiZAI2ysahOwc3azzVTbthhsVMxZSHA1r19cpwuOZCDFvkV5hv8wbX5stGmxLKY6GlUd16wt0wtsvxYiwzh7FrpTiaFh5lAj7FeErERIhERJh8yJ8smWGCD/huWsRPhEhERJhOgYixCeEVEcfibAZEb4QIScUjhIhiFBOSIRESIRlV0e1KPoVoRbFCugTEuFn9L1tjQiJsIC9o49di9De0Y4JKZ87RTGPck5RPBBhrSJ0nnAe5ZwnfGj85VcNi/CRCJPH/CudrA8pfhHh2pRzx8yp3UW6rjtmiKLEosHtGpUZt62tgNvWqi0arFKZeWx4kR5KKY96I0yZRYNzIZWZlm/gDroG/6EQEdq1tr4Ix0KSwlPDi3TQOyC9i6Jfgl6NVkZKWO382BeSFN7pUNQbKq3wMgrvJ/R+wn4JCpXSx6Ntvy476E29yePRF3WZmkVYxjvrR++sTx+NEmGp+copdX30se35EbTS3aWuj4YYobpMuat06uNMp7bnR9BKl7o+eh+UEqrLlFqZSX2c6fHUdF0mLClMXZoJMkKb1soNlRJbYZAGa67bBYUbm5eUX+FpIyUsluOY3Qq/nlqfH2ErXVIrDNKglLDkVTqpFZ6anx9hSWFKKwwzQilhyUlhyoZ9WEZY94nvMbcVhhmhlLDoeDRdr/A5TIN1b+UIW+nSNezvw0QoJSw7Hj2l2jZze+4gWwlc6VLdcvEQaITulyl7lU5VmwmrylR//1CgCBMFpHdn0WgTq3Si2kygBmvfWBy40qWpzYRVZUSj5a/SaQLS21Mf8yN0pUsRkAYGo2qjFazSKSqkj6FGWH22MpyzBaSBwahoNCf78ZwpLXwN1GADgVLoSrdZ/DTFfagR6tRXsEovnhY+h2qwgZ0cwSvd0n2K0ISQEdaRsCydFt6GarCF897BK92yxZmXUA0qy9RRmllYhbennuZH8Eq3qArDNehii8xsc6gwXINtzI9gK1zw/sOHYA0ywnqscDkVhmuwkfkRvtItpsJwH9SfqGqCLKTCCA22Mj/Cx3ihiPQpXIOMsK4JclqgRvococFm5sc2RoVP62qQEVY2QU6zXxHzGiHBhioGEWO8QL/wPkKDjLC6CTL3+rXHGA02ND+2USqcuXfmLkaDjLAIjnEqnJMY3kZpsKXS+RDz4Js5ieHLZnNmhG1PkBkh6espToMtbabaR610M0LSqFCUEVZqhZPNMM4GW9tMNUSqcJoZRtqg+53KYXeOVOGEUxVfT7EabOywd+RKd8kM41uGd5EStFmm2ljpPSZ9TSvB9pKVbfQgb+6jZPhwv4nWICOseYJcZPg1NDd8niDBBpOVIXoMYmT4cr+J/3xVmconyPl8+xhih6+Ppwmf3eAaHR9vvAelTwE6fHi620wZZMFo9RPkzQ4fn/+hwNvTpE9ucY3eTRvkzf3nOpyoQMFoCwHpDx3+LS69CHCiAlutnA8TR+Pih/dPfxHg/UQFCkZLnCBTVfheLb29ffz6/EOLz69f3/R3mv6Bja7R+xljvNncXZT48sMTHx5e7u/upgtQMFokMybITy1+Z/YntbpGb2cP8uYHs8fYfb+NLdML0+4avStmkCWEjS7TS82PhrdSDaWMsYTQMt3rGl1KvOGCtRaLM9boMI6jYAOFB0vNx0klRP2KMoKlvnOV/FG/ooxgqfdcJbcKaZAKNZDzqpAGqZAG86pQc0LhgAbzqpAGeSEN5lUhDVLhZ9Ojrw3FeVQoH6yG/ThaoltUIQ3WxOoq7DBMWj/51qOvi5V3sHW5RK+tQnvVREs0+J+wf82lbhwc4rVOf1KS6XaJXk+FyqLWadMjb8ChJGOGmB5/47jGUicUrXmGJK+Smh4rLHVs0AwxPbKa4agqygzZYNalzjrXxgwZE63QesfJi2DWuVZIMkOs0OkjDpGoGWKFzhpxjNY5xYPPJGiFTi1DEmyQ7WIyJMH0MiRBbvhpLkiCn8lwiUEeBxJsV4Zzp8hldsgF/xVyzG1YjDtlZ1PkbwxmRxD7GaH/ZZkTafQwRSbp8BKGMsHwmGOSDsdha4y70eFbXDpGVAkuUajZET/IMWWakQI7TRDHIAGKj+YEpv8e5JEAew9N/zJL3v7/SxJobiyz2n02yBY5XAKn7W43DO9T5W1WDMNutzUzFl/v3gZ5/DnIlzG2xAGYxv8Ap0cOQcJkHCEAAAAASUVORK5CYII="/>
            </defs>
          </svg>
          COMPRE E GANHE
        </div>
      </div>
    </div>
  </a>)
}

const Card=({product, frete, brinde, descontoPix}:Props)=>{
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
    
  useEffect(()=>{
    const handleTrust=async()=>{
      const data=await invoke["deco-sites/shp"].loaders.getTrustvox({productId:refId, storeId:'79497'})
      const {products_rates}:{products_rates:ObjTrust[]}=data
      const obj:ObjTrust=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:prodId, average:0, count:0, product_name:prodName})
    }
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
      frete={frete!}
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
      brinde={brinde ? {imageUrl:brinde.ImageUrl as string, productName:brinde.ProductName as string} : undefined}
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
      brinde={brinde ? {imageUrl:brinde.ImageUrl as string, productName:brinde.ProductName as string} : undefined}
    />
  }
}

export default Card