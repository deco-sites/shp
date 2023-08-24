import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

const searchMenuBar = async (term:string)=>{
  const url='https://api.shopinfo.com.br/Deco/getProductsMenuSearch.php?ft='+term
  return (await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return text
    }else{
      return resp.json()
    }
  }).catch(err=>console.error(err))) || []
}

const SearchMenuBar=()=>{

  const divInputSearchMobile = useRef<HTMLDivElement>(null)
  const inputDesk=useRef<HTMLInputElement>(null)
  const inputMob=useRef<HTMLInputElement>(null)

  const [openSearch, setOpenSearch] = useState(false)
  const [inputValue, setInputValue]=useState('')
  const [products,setProducts]=useState([])

  const fetchData=async ()=>{
    const data=await searchMenuBar(inputValue)
    setProducts(data)
  }

  const handleClickLupaDesk = (event:MouseEvent) => {
    if (window.innerWidth <= 768) {
      setOpenSearch(true)
    } else {
      // executa o search caso seja PC
      const Target=event.target as HTMLButtonElement

      fetchData()
    }
  }

  //useEffect input search
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const outsideClick = (event: MouseEvent) => {
        if (divInputSearchMobile.current && event.target) {
          if (!divInputSearchMobile.current.contains(event.target as Node) && openSearch) {
            setOpenSearch(false)
            if (divInputSearchMobile.current.firstChild instanceof HTMLInputElement) {
              divInputSearchMobile.current.firstChild.value = ''
            }
          }
        }
      }

      document.addEventListener('click', outsideClick)

      return () => {
        document.removeEventListener('click', outsideClick)
      }
    }
  }, [openSearch])

  useEffect(()=>{  
    const InputDesk=inputDesk.current! as HTMLInputElement
    const InputMob=inputMob.current! as HTMLInputElement
    InputDesk.value=inputValue
    InputMob.value=inputValue

    if(inputValue.length>3) fetchData()
  },[inputValue])

  useEffect(()=>console.log(products),[products])

  return(
    <>
      <div className='flex-row gap-2 re1:ml-60'>
        <div className='hidden re1:flex flex-row-reverse'>
          <input
            ref={inputDesk}
            type='text'
            name='search'
            placeholder='O que você procura...'
            className='hidden re1:block w-48 text-white bg-zinc-800 placeholder:text-neutral-600 mr-[3%]
            p-2 border-neutral-600 border-[2px] outline-none top-[26px] rounded-lg focus:shadow-[0_0_5px_2px] focus:shadow-[#dd1f26]/30 
          focus:border-[#dd1f26] absolute focus:w-2/5 transition-all duration-700'
            onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
          />
        </div>

        <button className='w-fit h-fit' onClick={handleClickLupaDesk}>
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
            alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
          />
        </button>
      </div>

      <div
          ref={divInputSearchMobile}
          className={`${openSearch ? 'flex' : 'hidden'} w-full h-16 p-4 items-center justify-between absolute top-0 bg-zinc-900 z-[1] re1:hidden`}
        >
          <input
            ref={inputMob}
            type='text'
            name='search'
            placeholder='O que você procura...'
            className='placeholder:text-neutral-600 w-4/5 bg-zinc-900 outline-none p-4 text-white'
            onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
          />
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
            alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
          />
        </div>
    </>
  )
}

export default SearchMenuBar
