import { useState, useEffect, useRef } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

const Share = () => {
  const [open, setOpen] = useState(false)
  const modalzinho=useRef<HTMLUListElement>(null)

  useEffect(()=>{
    if(open){
      const outsideTouch=(event:TouchEvent)=>{
        if(event.target && modalzinho.current){
          !modalzinho.current.contains(event.target as Node) && setOpen(false)
        }
      }

      document.addEventListener('touchend', outsideTouch)

      return () => {
        document.removeEventListener('touchend', outsideTouch)
      }
    }
  },[open])

  return (
    <>
      <button onClick={() => setOpen(true)}><svg class="share-logo" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25" fill="none"><path d="M5.8341 10.3629C5.8341 11.6152 4.75228 12.6968 3.33367 12.6968C1.91506 12.6968 0.833252 11.6152 0.833252 10.3629C0.833252 9.11064 1.91506 8.02905 3.33367 8.02905C4.75228 8.02905 5.8341 9.11064 5.8341 10.3629Z" stroke="white" stroke-width="1.5"></path><path d="M18.8358 3.16723C18.8358 4.41949 17.754 5.50108 16.3354 5.50108C14.9168 5.50108 13.835 4.41949 13.835 3.16723C13.835 1.91496 14.9168 0.833374 16.3354 0.833374C17.754 0.833374 18.8358 1.91496 18.8358 3.16723Z" stroke="white" stroke-width="1.5"></path><path d="M18.9777 17.8037C18.9177 19.0549 17.785 20.0885 16.368 20.0273C14.9511 19.966 13.9222 18.8389 13.9822 17.5878C14.0423 16.3366 15.175 15.303 16.5919 15.3642C18.0089 15.4255 19.0378 16.5525 18.9777 17.8037Z" stroke="white" stroke-width="1.5"></path><line y1="-0.75" x2="10.1366" y2="-0.75" transform="matrix(0.860425 -0.509576 0.549644 0.835399 5.50073 10.3629)" stroke="white" stroke-width="1.5"></line><line y1="-0.75" x2="9.63488" y2="-0.75" transform="matrix(0.883695 0.468063 -0.507143 0.861862 5.50073 12.4188)" stroke="white" stroke-width="1.5"></line></svg></button>
      <ul
        ref={modalzinho}
        onMouseLeave={() => setOpen(false)}
        className={`grid grid-cols-2 gap-2 p-[10px] rounded-lg -top-[4%] right-[12%] bg-[#272727]/80 absolute  ${!open && 'hidden'}`}
      >
        <li>
          <a href='/' className='flex items-center justify-center w-[35px] h-[35px] tooltip tooltip-top bg-slate-500 rounded-full' data-tip='Twitter'>
            <Image
              loading='lazy'
              fetchPriority='high'
              decoding='auto'
              width={21}
              height={18}
              src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-Twitter.png'
            />
          </a>
        </li>
        <li>
          <a href='/' className='flex items-center justify-center w-[35px] h-[35px] tooltip tooltip-top bg-slate-500 rounded-full' data-tip='Whatsapp'>
            <Image
              loading='lazy'
              fetchPriority='high'
              decoding='auto'
              width={21}
              height={18}
              src='https://shopinfo.vteximg.com.br/arquivos/shareIcon-whatsapp.png'
            />
          </a>
        </li>
        <li>
          <a href='/' className='flex items-center justify-center w-[35px] h-[35px] tooltip tooltip-top bg-slate-500 rounded-full' data-tip='Facebook'>
            <Image
              loading='lazy'
              fetchPriority='high'
              decoding='auto'
              width={21}
              height={18}
              src='https://shopinfo.vteximg.com.br/arquivos/shareIcon-facebook.png'
            />
          </a>
        </li>
        <li>
          <a href='/' className='flex items-center justify-center w-[35px] h-[35px] tooltip tooltip-top bg-slate-500 rounded-full' data-tip='Email'>
            <Image
              loading='lazy'
              fetchPriority='high'
              decoding='auto'
              width={21}
              height={18}
              src='https://shopinfo.vteximg.com.br/arquivos/shareIcon-email.png'
            />
          </a>
        </li>
      </ul>
    </>
  )
}

export default Share
