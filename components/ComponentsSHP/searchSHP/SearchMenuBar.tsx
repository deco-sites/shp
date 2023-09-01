// deno-lint-ignore-file no-explicit-any
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'

const searchMenuBarLoader = async (term:string, signal:AbortSignal)=>{
  const url=`https://api.shopinfo.com.br/Deco/getAutoComplete.php?ft=${term}`

  const autocomplete=await fetch(url, {signal}).then(async (r)=>{
        const resp=r.clone()
        const text=await r.text()
        if(text==='empty'){
          return text
        }else{
          return resp.json()
        }
      }).catch(err=>console.error(err))

  const finalAutocomplete=autocomplete ? autocomplete.itemsReturned.map((item:any)=>{
    item.href=item.href.split('https://www.shopinfo.com.br')[1]
    return item
  }) : []
  return finalAutocomplete
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
  const [autoComplete,setAutoComplete]=useState<any>([])
  const [openSuggestions, setOpenSuggestions]=useState(false)

  const fetchData=async ()=>{
    currentController.current = new AbortController()
    try {
      const data = await searchMenuBarLoader(inputValue, currentController.current.signal)
      setAutoComplete(data)
      currentController.current = null // Limpa a referência após a conclusão
    } catch (error) {
        // Verificar se o erro é um erro de aborto
        if (error.name === 'AbortError') {
            console.log('Fetch foi cancelado')
        } else {
            console.error(error)
        }
    }
  }
  
  const redirectSearchPage=()=>{
    console.log(inputValue)
    window.location.href='/s?q='+inputValue
  }

  const handleClickLupaDesk = (event:MouseEvent) => {
    if (window.innerWidth <= 768) {
      setOpenSearch(true)
    } else {
      redirectSearchPage()
    }
  }

  //useEffect input search
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const outsideClick = (event: MouseEvent) => {
        if (divInputSearchMobile.current && event.target) {
          if (!divInputSearchMobile.current.contains(event.target as Node) && openSearch) {
            setOpenSearch(false)
            setAutoComplete([])
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

    //aqui eu limpo as sugestões quando input.length >=2 e cancela qlqr request antigo pra focar no ultimo q o usuário inputa
    inputValue.length>=2 ? ((currentController.current && (currentController.current.abort(), currentController.current=null)),fetchData()) : (currentController.current && (currentController.current.abort(), currentController.current=null),setAutoComplete([]))
  },[inputValue])

  useEffect(() => {
    // aqui eu abro as sugestões caso haja produtos ou autocomplete
    (autoComplete.length) ? setOpenSuggestions(true) : setOpenSuggestions(false)
  }, [autoComplete])

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
            onKeyUp={(event:KeyboardEvent)=>event.key==='Enter' && redirectSearchPage()}
          />

          <div ref={suggestionsDesk} className={`${openSuggestions ? 're1:flex' : ''} hidden flex-col w-2/5 mr-[3%] absolute border border-[#3d3d3d] border-t-transparent bg-[#111] top-3/4 rounded-b-lg rounded-br-lg`}>
            {autoComplete.map((suggestion:any)=>suggestion.thumbUrl ? (
                <a href={suggestion.href} className='flex flex-row items-center py-1 px-1'>
                  <Image src={suggestion.thumbUrl.replace('25-25/1','32-32/1')} width={32} height={32} loading='eager' decoding='async' fetchPriority='high'/>
                  <p className='line-clamp-1 text-sm text-white ml-1'>{suggestion.name}</p>
                </a>
              ) : (
                <a href={suggestion.href} className='flex flex-row items-center py-1 px-1 line-clamp-1 text-sm text-white ml-1'>
                  {suggestion.name}
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
            onKeyUp={(event:KeyboardEvent)=>event.key==='Enter' && redirectSearchPage()}
          />
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
            alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
            onClick={redirectSearchPage}
          />
        </div>

        <div ref={suggestionsMob} className={`${openSuggestions ? 'flex' : 'hidden'} re1:hidden flex-col w-full re1:w-2/5 absolute border border-[#3d3d3d] top-16 re1:top-24 bg-[#111] rounded-b-lg rounded-br-lg`}>
          {autoComplete.map((suggestion:any)=>suggestion.thumbUrl ? (
              <a href={suggestion.href} className='flex flex-row items-center py-1 px-1'>
                <Image src={suggestion.thumbUrl.replace('25-25/1','32-32/1')} width={32} height={32} loading='eager' decoding='async' fetchPriority='high'/>
                <p className='line-clamp-1 text-sm text-white ml-1'>{suggestion.name}</p>
              </a>
            ) : (
              <a href={suggestion.href} className='flex flex-row items-center py-1 px-1 line-clamp-1 text-sm text-white ml-1'>
                {suggestion.name}
              </a>
          ))}
        </div>
    </>
  )
}

export default SearchMenuBar