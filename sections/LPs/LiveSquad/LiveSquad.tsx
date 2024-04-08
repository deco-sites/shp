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
            src='https://shopinfo.vteximg.com.br/arquivos/mobile-lpliveabril-banner1.jpg'
            width={350}
            height={248}
          />
          <Source
            media='(min-width: 768px)'
            fetchPriority='high'
            src='https://shopinfo.vteximg.com.br/arquivos/desktop-lpliveabril-banner1.jpg'
            width={1920}
            height={468}
          />

        <Image width={1920} height={468} loading='eager' src='https://shopinfo.vteximg.com.br/arquivos/desktop-lpliveabril-banner1.jpg' className='w-full'/>

        </Picture>
      </div>
      <div className='bg-[#f9375a] w-full'>
        <FormRD />
      </div>
      <div className='bg-[url(https://shopinfo.vteximg.com.br/arquivos/mobile-lpliveabril-banner2.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/desktop-lpliveabril-banner2.jpg)] bg-center bg-cover w-full h-screen
        flex flex-col justify-between py-4'
      >
        <div className='grid justify-center items-center grid-cols-[1fr_1fr] re1:max-w-[40%] re1:ml-auto re1:mr-20'>
          <Image width={226} height={326} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/lp-live-04abr.png' className='w-[65%] m-auto'/>
          <Image width={226} height={326} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/lp-live-11abr.png' className='w-[65%] m-auto'/>
          <Image width={226} height={326} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/lp-live-18abr.png' className='w-[65%] m-auto'/>
          <Image width={226} height={326} loading='lazy' src='https://shopinfo.vteximg.com.br/arquivos/lp-live-25abr.png' className='w-[65%] m-auto'/>
        </div>
        <div className='text-white mx-auto font-bold items-center'>
          <p className='text-lg uppercase'>Apresentação</p>
          <p className='text-6xl'>Nádia</p>
        </div>
      </div>
    </div>
  )
}

export default LiveSquad