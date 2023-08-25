// deno-lint-ignore-file no-explicit-any
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'

const searchMenuBarLoader = async (term:string, signal:AbortSignal)=>{
  const url='https://api.shopinfo.com.br/Deco/getProductsMenuSearch.php?ft='+term

  //tentar criar uma rota do tinyFileManager
  const urlAutocomplete=`https://www.shopinfo.com.br/buscaautocomplete/?productNameContains=${term}`

  const [prods, autocomplete]:any[]=await Promise.all(
    [
      fetch(url, {signal}).then(async (r)=>{
        const resp=r.clone()
        const text=await r.text()
        if(text==='empty'){
          return text
        }else{
          return resp.json()
        }
      }).catch(err=>console.error(err)),

      fetch(urlAutocomplete, {signal}).then(async (r)=>{
        const resp=r.clone()
        const text=await r.text()
        if(text==='empty'){
          return text
        }else{
          return resp.json()
        }
      }).catch(err=>console.error(err))
    ]
  )
  return {prods,autocomplete}
}

const SearchMenuBar=()=>{

  const divInputSearchMobile = useRef<HTMLDivElement>(null)
  const inputDesk=useRef<HTMLInputElement>(null)
  const inputMob=useRef<HTMLInputElement>(null)
  const suggestionsDesk=useRef<HTMLDivElement>(null)
  const suggestionsMob=useRef<HTMLDivElement>(null)
  const currentController=useRef<AbortController | null>(null)

  const [openSearch, setOpenSearch] = useState(false)
  const [inputValue, setInputValue]=useState('')
  const [products,setProducts]=useState<any>([])
  const [autoComplete,setAutoComplete]=useState<any>({})
  const [openSuggestions, setOpenSuggestions]=useState(false)

  const fetchData=async ()=>{
    currentController.current = new AbortController()

    try {
      const data = await searchMenuBarLoader(inputValue, currentController.current.signal);
      setProducts(data.prods)
      setAutoComplete(data.autocomplete)
      currentController.current = null; // Limpa a referência após a conclusão
    } catch (error) {
        // Verificar se o erro é um erro de aborto
        if (error.name === 'AbortError') {
            console.log('Fetch foi cancelado')
        } else {
            console.error(error)
        }
    }
  }

  const handleClickLupaDesk = (event:MouseEvent) => {
    if (window.innerWidth <= 768) {
      setOpenSearch(true)
    } else {
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
            setProducts([])
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

    //aqui eu limpo as sugestões
    inputValue.length>=2 ? fetchData() : (currentController.current && (currentController.current.abort(), currentController.current=null),setProducts([]))
  },[inputValue])

  useEffect(() => {
    // aqui eu abro as sugestões caso haja produtos
    products.length ? setOpenSuggestions(true) : setOpenSuggestions(false)
    console.log(products)
  }, [products])

  useEffect(()=>console.log(autoComplete),[autoComplete])

  return(
    <>
      <div className='flex-row gap-2 re1:ml-60'>
        <div className='hidden re1:flex flex-row-reverse'>
          <input
            ref={inputDesk}
            type='text'
            name='search'
            placeholder='O que você procura...'
            className='hidden re1:block w-48 text-white bg-[#111] placeholder:text-[#3d3d3d] mr-[3%]
            p-2 border-[#3d3d3d] border-[2px] outline-none top-[26px] rounded-lg focus:shadow-[0_0_5px_2px] focus:shadow-[#dd1f26]/30 
          focus:border-[#dd1f26] absolute focus:w-2/5 transition-all duration-700'
            onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
            onBlur={()=>(setTimeout(()=>setOpenSuggestions(false),500),currentController.current && currentController.current.abort())}
          />

          <div ref={suggestionsDesk} className={`${openSuggestions ? 're1:flex' : ''} hidden flex-col w-2/5 mr-[3%] absolute border border-[#3d3d3d] border-t-transparent bg-[#111] top-3/4 rounded-b-lg rounded-br-lg`}>
            {products.map((product:any)=>(
              <a href={'/'+product.linkText+'/p'} className='flex flex-row items-center py-1 px-1'>
                <Image src={putSizeInUrl((product.items[0].images[0].imageUrl as string),[32,32])} width={32} height={32} />
                <p className='line-clamp-1 text-sm text-white ml-1'>{product.productName!}</p>
              </a>
            ))}
          </div>
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
          className={`${openSearch ? 'flex' : 'hidden'} w-full h-16 p-4 items-center justify-between absolute top-0 bg-[#111] z-[1] re1:hidden`}
        >
          <input
            ref={inputMob}
            type='text'
            name='search'
            placeholder='O que você procura...'
            className='placeholder:text-[#3d3d3d] w-4/5 bg-transparent outline-none p-4 text-white'
            onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
            onClick={(event)=>setInputValue((event.target as HTMLInputElement).value)}
          />
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
            alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
          />
        </div>

        <div ref={suggestionsMob} className={`${openSuggestions ? 'flex' : 'hidden'} re1:hidden flex-col w-full re1:w-2/5 absolute border border-[#3d3d3d] top-16 re1:top-24 bg-[#111] rounded-b-lg rounded-br-lg`}>
          {products.map((product:any)=>(
            <a href={'/'+product.linkText+'/p'} className='flex flex-row items-center py-1 px-1'>
              <Image src={putSizeInUrl((product.items[0].images[0].imageUrl as string),[32,32])} width={32} height={32} />
              <p className='line-clamp-1 text-sm text-white ml-1'>{product.productName!}</p>
            </a>
          ))}
        </div>
    </>
  )
}

export default SearchMenuBar
