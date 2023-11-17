import {useState} from 'preact/hooks'
import Cart from 'deco-sites/shp/components/minicart/Cart.tsx'
import Image from 'deco-sites/std/components/Image.tsx'

const Teste=()=>{
  const [openMinicart, setOpenMinicart]=useState(false)

  return(
    <>
      <div id='minicartWrapper' className={`${openMinicart ? 'flex' : 'hidden'} flex-col z-30 fixed w-full items-end bg-[#000]/80`}
        onClick={(event:MouseEvent)=>{
          if(window.innerWidth>768){
            (!document.querySelector('#minicartContent')?.contains(event.target as Node) && event.target===document.querySelector('#minicartWrapper')) && setOpenMinicart(false)
          }
        }}
      >
        <div id='minicartContent' className='bg-base-100 w-screen re1:w-[400px] h-screen'>
          <div className='flex justify-between h-[10vh] items-center px-8 text-xl font-bold text-secondary'>
            <label className='flex gap-2'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png' width={22} height={20} decoding='sync' loading='lazy' class='max-h-[22px] m-auto'/>
              <p>Carrinho</p>
            </label>
            <p id='close-minicart' className='font-bold cursor-pointer' onClick={()=>{setOpenMinicart(false)}}>✕</p>
          </div>
          <Cart platform="vtex"/>
        </div>
      </div>
      <button onClick={()=>setOpenMinicart(true)}>Abrir carrinho</button>
    </>
  )
}

export default Teste