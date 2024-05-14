import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import FormRD from './FormRD.tsx'

const LiveSquad=()=>{
  return (
    <div className='flex flex-col w-screen items-center'>
      <div className='w-screen'>
        <Picture preload>
          <Source
            media='(max-width: 767px)'
            fetchPriority='high'
            src='https://shopinfo.vteximg.com.br/arquivos/LP-Mobile-da-live-Maio_01.jpg'
            width={350}
            height={248}
          />
          <Source
            media='(min-width: 768px)'
            fetchPriority='high'
            src='https://shopinfo.vteximg.com.br/arquivos/LP-da-live-Maio_01.jpg'
            width={1920}
            height={468}
          />

        <Image width={1920} height={468} loading='eager' src='https://shopinfo.vteximg.com.br/arquivos/LP-da-live-Maio_01.jpg' className='w-full'/>

        </Picture>
      </div>
      <div className='bg-[#f9375a] w-full'>
        <FormRD />
      </div>
      <div className='bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-Mobile-da-live-Maio_04.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LPdesktop-da-live-Maio_02.jpg)] bg-center bg-cover w-full h-max py-4'>
        <div className='flex flex-col justify-center items-center gap-3 mx-auto relative'>
          <Image width={200} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Programa%C3%A7%C3%A3o.png' className='w-[50%] re1:w-[30%] m-auto mb-[5%]'/>
          <Image width={300} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Live 02-05.png' className='w-[50%] re1:w-[30%] m-auto mb-[5%]'/>
          <Image width={300} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Live 09-05.png' className='w-[50%] re1:w-[30%] m-auto mb-[5%]'/>
          <Image width={200} height={200} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Live 16-05.png' className='w-[70em] mr-[30%] absolute re1:mt-[10%] mt-[15%]'/>
          <Image width={300} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Live 24-05.png' className='w-[50%] re1:w-[30%] m-auto mt-[10%] mb-[5%]'/>
          <Image width={300} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Live 29-05.png' className='w-[50%] re1:w-[30%] m-auto mb-[5%]'/>
          <Image width={200} height={300} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/Apresentando Nádia.png' className='w-[50%] re1:w-[30%] m-auto'/>
        </div>
      </div>
    </div>
  )
}

export default LiveSquad