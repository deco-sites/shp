// deno-lint-ignore-file no-window-prefix
import {useRef, useEffect} from 'preact/hooks'

interface Div{
  /**@description o id que será passado no link pra referenciar a div */
  id:string
  title:string
  /**@description Coloque o HTML, caso queira estilizar coloque uma tag <style> no começo*/
  text:string
}

export interface Props{
  Divs:Div[]
}

const Institucional=({Divs}:Props)=>{
  const accordionWrapper=useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const initialScrollY=0
    let scrolledDown=false
    
    const header=document.querySelector('body div.z-30.fixed')
    header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,.5)')
    
    const handleScroll=()=>{
      if(window.scrollY > initialScrollY && !scrolledDown){
        header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,1)')
        scrolledDown=true
      }else if(window.scrollY <= initialScrollY && scrolledDown){
        header && ((header.children[0] as HTMLElement).style.backgroundColor='rgba(0,0,0,.5)')
        scrolledDown=false
      }
    }
    
    if(typeof window!=='undefined'){
      if(window.location.hash){
        const id=window.location.hash.substring(1)
        const divId=accordionWrapper.current?.querySelector(`div#pai-${id}`)
        divId && ((divId.querySelector('input[type="radio"]') as HTMLInputElement).checked=true)
        divId?.querySelector(`div#${id}`)?.scrollIntoView({behavior:'smooth'})
        window.scrollBy(0, -100)
      }
    }

    window.addEventListener('scroll',handleScroll)

    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return (
    <>
      <div className='w-full h-[368px] bg-[length:235%] re1:bg-[length:100%] bg-[url(https://shopinfo.vteximg.com.br/arquivos/institucional-background.jpg)] bg-[top_center] bg-no-repeat absolute -top-2 -z-[1]'/>
      
      <div className='px-4 re1:px-[5%] re4:px-[15%]'>
        <div className='breadcrumbs mt-4 re1:mt-20'>
          <ul>
            <li className='underline'><a href='/'>Home</a></li>
            <li className='font-bold'>Institucional</li>
          </ul>
        </div>

        <div className='flex w-full mt-16 re1:mt-40 re1:justify-between'>
          <div className='hidden re1:flex flex-col border border-[#3d3d3d] items-center justify-around w-[20%] h-72 text-sm text-center p-[20px]'>
            <a href='https://api.whatsapp.com/send?phone=5519982013576' className='border border-[#dd1f26] rounded-lg p-[10px] font-black w-[140px] text-[#dd1f26] hover:text-white hover:bg-[#dd1f26]'>(19) 98201-3576</a>
            <p className='text-base text-white'>(19) 3308-7222</p>
            <p className='text-white'>De segunda à sexta das 08:30h às 18h e sábados de 08:30h às 13h</p>
            <a href='/institucional/contato' className='border border-[#dd1f26] rounded-lg p-[10px] font-black w-[140px] text-[#dd1f26] hover:text-white hover:bg-[#dd1f26]'>FALE CONOSCO</a>
          </div>

          <div ref={accordionWrapper} className='join join-vertical w-full re1:w-[70%] rounded-none'>
            {Divs.map((element)=>{
              return (
                <div id={'pai-'+element.id} className='collapse collapse-arrow join-item border-y border-y-[#3d3d3d] first:border-t-0 last:border-b-0'>
                <input type='radio' name='my-accordion' />
                <div id={element.id} className='collapse-title text-2xl font-medium'>{element.title}</div>
                <div className='collapse-content' dangerouslySetInnerHTML={{__html:element.text}}/>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Institucional