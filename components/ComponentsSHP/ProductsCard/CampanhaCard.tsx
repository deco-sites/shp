import { Offer, Product, PropertyValue } from 'deco-sites/std/commerce/types.ts'
import { useState, useEffect } from 'preact/hooks'
import {Runtime} from 'deco-sites/shp/runtime.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

//promoção baseada entre o listPrice e o salePrice com desconto do pix

interface CardProps{
  prodId:string
  prodName:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  pix:string
  objTrust:ObjTrust
  trustPercent:number
  timeRemaining: TimeRemaining
  quantidade:number
} 

interface CardPCProps extends CardProps{
  NLI:string
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  frete?:string
}

export type Props={
  product:Product
  frete?:string
  timeRemaining: TimeRemaining
  quantidade:number
}

const CardProd=(props:CardProps)=>{
  const {days, hours, minutes, seconds} = props.timeRemaining || {days:'00', hours:'00', minutes:'00', seconds:'00'}
  const salePricePix=DescontoPIX(props.precoVista, parseFloat(props.pix))
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/props.precoDe)-100))

  return (
    <a href={props.linkProd} className='flex flex-col re1:flex-row w-full h-[215px] re1:h-[245px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
    hover:transition-shadow hover:duration-75 hover:ease-in text-white p-[10px] re1:p-0 justify-between'
    >
      {/* Mobile */}
      <div className='flex re1:hidden h-[40px] gap-1'>
        <div className='flex flex-col items-center justify-center rounded-lg bg-[#00a74c] w-[15%] text-[10px]'>
          <span>Restam</span>
          <span className='text-base leading-3 font-bold'>{props.quantidade}</span>
          <span>UN</span>
        </div>
        {/* Vazia pra prods normais */}
        <div className='flex w-[27.5%]'/>
        <div className='rounded-lg bg-primary flex w-[42.5%] justify-around items-center p-1'>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={20} width={20}  x="0px" y="0px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
          <div className='flex flex-col items-center justify-center font-bold w-[80%]'>
            <span className='text-[9px]'>A OFERTA EXPIRA EM:</span>
            <span className='text-sm leading-4'>{`${days}D ${hours}:${minutes}:${seconds}`}</span>
          </div>
        </div>
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
          <Image src={props.imgUrl} width={180} height={180} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%] re1:w-[60%]'/>
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
            <p className='text-[#00a74c] text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}<span className='text-xs text-white'> No Pix</span></p>
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
        <div>
          <span className='text-sm'>Restam:</span>
          <div className='bg-[#00a74c] text-2xl font-bold rounded-lg w-fit p-[10px] mx-auto'>{props.quantidade}</div>
          <span className='text-sm'>Itens Disponíveis</span>
        </div>
      
        <div>  
          <span>Essa oferta<br/>termina em:</span>
          <div className='bg-primary rounded-lg flex justify-around p-1 items-center w-44'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={25} width={25}  x="0px" y="0px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
            <span className='font-bold text-xl w-[80%]'>{`${days}D ${hours}:${minutes}:${seconds}`}</span>
          </div>
        </div>
      </div>
      </div>
    </a>)
}

const CardPC=({NLI, placaVideo, processador, memoria, armazenamento, tipoArm,...props}:CardPCProps)=>{
  const {days, hours, minutes, seconds} = props.timeRemaining || {days:'00', hours:'00', minutes:'00', seconds:'00'}
  const salePricePix=DescontoPIX(props.precoVista, parseFloat(props.pix))
  const diffPercent=Math.ceil(-1*(((100*salePricePix)/props.precoDe)-100))

  return (
  <a href={props.linkProd} className='flex flex-col re1:flex-row w-full h-[215px] re1:h-[245px] bg-[#171717] hover:shadow-[0_10px_25px_0] hover:shadow-[rgba(0,0,0,.85)]
    hover:transition-shadow hover:duration-75 hover:ease-in text-white p-[10px] re1:p-0 justify-between'
  >
    {/* Mobile */}
    <div className='flex re1:hidden h-[40px] gap-1'>
      <div className='flex flex-col items-center justify-center rounded-lg bg-[#00a74c] w-[15%] text-[10px]'>
        <span >Restam</span>
        <span className='text-base leading-3 font-bold'>{props.quantidade}</span>
        <span >UN</span>
      </div>
      <div className='flex rounded-lg border border-[#00a74c] w-[27.5%] justify-around items-center'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-frete-white.png' width={23} height={15} className='max-h-[15px]'/>
        <p className='text-left font-bold text-sm leading-4'>FRETE<br/>GRÁTIS</p>
      </div>
      <div className='rounded-lg bg-primary flex w-[42.5%] justify-around items-center p-1'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={20} width={20}  x="0px" y="0px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
        <div className='flex flex-col items-center justify-center font-bold w-[80%]'>
          <span className='text-[9px]'>A OFERTA EXPIRA EM:</span>
          <span className='text-sm leading-4'>{`${days}D ${hours}:${minutes}:${seconds}`}</span>
        </div>
      </div>
      <div className='rounded-lg bg-[#00a74c] w-[15%] font-bold text-lg flex flex-col items-center'>
        <span>{diffPercent}%</span>
        <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.62872" y1="1.25068" x2="9.28916" y2="7.67856" stroke="white" stroke-width="2"/>
          <line x1="8.35721" y1="7.66181" x2="16.0177" y2="1.23394" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    </div>

    <div className='flex re1:block re1:w-[20%]'>
      <div className='w-[32%] re1:w-full re1:h-full flex items-center justify-center'>
        <Image src={props.imgUrl} width={180} height={180} loading='lazy' decoding='sync' fetchPriority='low' className='w-[78%] re1:w-[60%]'/>
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
          <p className='text-[#00a74c] text-xl font-bold'>{salePricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}<span className='text-xs text-white'> No Pix</span></p>
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
        <div className='flex h-full'>
          <div className='bg-[#1e1e1e] p-[10px] flex items-center justify-around gap-2'>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-frete-white.png' width={46} height={30}/>
            {props.frete ? (<p className='text-center font-bold re1:text-sm re5:text-base leading-5' dangerouslySetInnerHTML={{__html:props.frete}}/>) : (<p className='text-center font-bold re1:text-sm re5:text-base leading-5'>Frete Grátis</p>)}
          </div>
          <div className='flex items-center justify-around bg-primary p-[10px] gap-2'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={30} width={30}  x="30px" y="30px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
            <p className='text-center font-bold re1:text-sm re5:text-base leading-5'>ESTA OFERTA<br/>ESTÁ ATIVA</p>
          </div>
        </div>

        <div className='form-control h-full justify-center'>
          <label className='label cursor-pointer gap-2'>
            <input type='checkbox' className='toggle toggle-sm toggle-primary' />
            <span className='text-xs'>Compare com<br/>outros PCs</span> 
          </label>
        </div>
      </div>
    </div>

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
        <div>
          <span className='text-sm'>Restam:</span>
          <div className='bg-[#00a74c] text-2xl font-bold rounded-lg w-fit p-[10px] mx-auto'>{props.quantidade}</div>
          <span className='text-sm'>Itens Disponíveis</span>
        </div>
      
        <div>  
          <span>Essa oferta<br/>termina em:</span>
          <div className='bg-primary rounded-lg flex justify-around p-1 items-center w-44'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" height={25} width={25}  x="0px" y="0px" viewBox="0 0 31.802 31.802" enable-background="new 0 0 31.802 31.802;" ><g><path d="M29.484,9.939l-3.896-4.673l-2.703,2.255c-1.198-0.8-2.539-1.396-3.969-1.771V3.609h2.164V0h-8.868v3.609h2.475v1.74 C7.792,5.805,2.317,11.545,2.317,18.553c0,7.307,5.943,13.249,13.248,13.249c7.307,0,13.249-5.942,13.249-13.249 c0-2.396-0.649-4.64-1.767-6.581L29.484,9.939z M16.081,29.301v-3.109h-0.515v3.137c-2.809,0-5.361-1.09-7.282-2.857 c0.229-0.148,0.391-0.396,0.391-0.691c0-0.465-0.378-0.842-0.843-0.842c-0.276,0-0.51,0.143-0.664,0.349 c-1.481-1.845-2.373-4.181-2.375-6.726H7.47v-0.515H4.818c0.123-2.621,1.183-4.996,2.856-6.803 c0.155,0.184,0.378,0.309,0.638,0.309c0.465,0,0.842-0.377,0.842-0.843c0-0.236-0.099-0.448-0.255-0.601 c1.836-1.453,4.149-2.328,6.666-2.328v3.615h0.515V7.806c2.266,0.107,4.348,0.914,6.038,2.216 c-0.119,0.145-0.203,0.325-0.203,0.53c0,0.466,0.377,0.843,0.844,0.843c0.236,0,0.449-0.101,0.603-0.258 c1.729,1.818,2.828,4.236,2.953,6.908h-2.535v0.514h2.562c-0.002,2.106-0.619,4.066-1.668,5.729 c-0.144-0.114-0.316-0.192-0.514-0.192c-0.466,0-0.843,0.378-0.843,0.843c0,0.285,0.151,0.524,0.368,0.679 C21.813,27.762,19.11,29.157,16.081,29.301z"></path><path d="M16.234,10.708v4.16c1.786,0.315,3.153,1.817,3.276,3.662l4.089-0.669C23.163,14.051,20.079,11.035,16.234,10.708z"></path></g></svg>
            <span className='font-bold text-xl w-[80%]'>{`${days}D ${hours}:${minutes}:${seconds}`}</span>
          </div>
        </div>
      </div>
    </div>
  </a>)
}

const Card=({product, frete, timeRemaining, quantidade}:Props)=>{
  const avaibility=product.offers!.offers[0].availability==='https://schema.org/InStock'

  if(!avaibility){return null}

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
  const pix=offer.teasers!.find(item=>item.name.toUpperCase().includes('PIX'))!.effects.parameters[0].value!
  const prodName=product.name!

  //na vdd RefId pra passar no trustvox
  const prodId=product.inProductGroupWithID!
  const precoDe=offer.priceSpecification.find(item=>item.priceType==='https://schema.org/ListPrice')!.price!
  const precoVista=offer.price!
  const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)!.billingIncrement!

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':prodId, 'average':0, 'count':0, 'product_name':prodName})
  const [trustPercent, setTrustPercent]=useState(0)
    
  useEffect(()=>{
    const handleTrust=async()=>{
      const data=await Runtime.invoke({
        key:'deco-sites/shp/loaders/getTrustvox.ts',
        props:{productId:prodId, storeId:'79497'}
      })
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
    
    return <CardPC 
      NLI={prodName.slice(prodName.indexOf('NLI'),prodName.length).split(' ')[0]}
      placaVideo={additionalProp.find(item=>item.name==='Placa de vídeo')!.value!}
      processador={additionalProp.find(item=>item.name==='Processador')!.value!}
      armazenamento={armaz!.value!}
      tipoArm={armaz!.name!}
      memoria={additionalProp.find(item=>item.name==='Memória')!.value!}
      frete={frete!}
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={pix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      objTrust={objTrust}
      trustPercent={trustPercent}
      timeRemaining={timeRemaining}
      quantidade={quantidade}
    />
  }else{
    return <CardProd
      parcelas={maxInstallments}
      imgUrl={imgUrl}
      pix={pix}
      linkProd={linkProd}
      prodName={prodName}
      prodId={prodId}
      precoDe={precoDe}
      precoVista={precoVista}
      valorParcela={valorParcela}
      objTrust={objTrust}
      trustPercent={trustPercent}
      timeRemaining={timeRemaining}
      quantidade={quantidade}
    />
  }
}

export default Card