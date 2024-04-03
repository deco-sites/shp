// deno-lint-ignore-file no-explicit-any
import { useState, useEffect, useRef } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import { invoke } from 'deco-sites/shp/runtime.ts'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx'

const searchMenuBarLoader = async (term:string, signal:AbortSignal)=>{
  const url=`https://api.shopinfo.com.br/Deco/getAutoComplete.php?ft=${encodeURI(term)}`

  const autocomplete=await fetch(url, {signal}).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return
    }else if(text.split('')[0]==='<'){
      return
    }else{
      return resp.json()
    }
  }).catch(err=>console.error('Error: '+err))

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
  const finalInputValue = useRef<string>('')
  const [categories, setCategories]=useState([])

  const fetchData=async ()=>{
    currentController.current = new AbortController()
    try {
      const valueInputed=finalInputValue.current
      const data = await searchMenuBarLoader(valueInputed, currentController.current.signal)
      const filteredData=data.map((suggestion:any)=>{
        if(!suggestion.thumbUrl){
          const possibleCategoryName=suggestion.name.replace(valueInputed.trim(),'').trim().toLowerCase()
          const possibleCategoryObj:any=categories.find((obj:any)=>obj.name.toLowerCase()===possibleCategoryName)
          if(possibleCategoryObj){
            if(possibleCategoryObj.children.some((child:any)=>child.name.toLowerCase()===valueInputed.toLowerCase().trim())){
              return suggestion
            }
          }
        }else{
          return suggestion
        }
      }).filter((item:any)=>item!==undefined)

      setAutoComplete(filteredData)
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
  
  const redirectSearchPage= async()=>{
    await new Promise<void>((resolve)=>{
      sendEvent({name:'search', params:{search_term:inputValue} })
      resolve()
    })
    globalThis.window.location.href='/s?q='+inputValue
}

  const handleClickLupaDesk = (event:MouseEvent) => {
    if (globalThis.window.innerWidth <= 768) {
      setOpenSearch(true)
    } else {
      redirectSearchPage()
    }
  }

  //useEffect input search
  useEffect(() => {
    if (globalThis.window.innerWidth <= 768) {
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

    // Cancelar requisição pendente caso inputValue seja vazio
    if (inputValue.length < 2) {
      if (currentController.current) {
        currentController.current.abort();
      }
        setAutoComplete([])
        return
    }

    // Adicionar um pequeno atraso antes de reenviar a solicitação, devido a atualizações do inputMob e inputDesk
    const delay = setTimeout(() => {

      //necessário devido ao delay atrasar a filtragem dos nomes das sugestions
      finalInputValue.current=inputValue

      // Reenviar solicitação apenas se inputValue tiver 2 ou mais caracteres
      if (inputValue.length >= 2) {
        if (currentController.current) {
            currentController.current.abort();
            currentController.current = null;
        }
        fetchData()
      }
    }, 200)

  // Limpar o timeout anterior ao reexecutar o efeito
  return () => clearTimeout(delay)

  },[inputValue])

  useEffect(() => {
    // aqui eu abro as sugestões caso haja produtos ou autocomplete
    autoComplete.length ? setOpenSuggestions(true) : setOpenSuggestions(false)
  }, [autoComplete])

  useEffect(()=>{
    (async()=>{
      const data=await invoke['deco-sites/shp'].loaders.getSubCategories()
      setCategories(data)
    })()
  },[])

  return(
    <>
      <div className='hidden re1:flex gap-2 re1:ml-20 items-center w-[35%] relative'>
        <div className='w-full relative'>
          <input
            ref={inputDesk}
            type='text'
            name='search'
            placeholder='O que você procura...'
            className='hidden re1:block text-secondary bg-base-100 placeholder:text-neutral
            p-2 border-neutral border-[2px] outline-none rounded-lg focus:shadow-[0_0_5px_2px] focus:shadow-primary/30 
            focus:border-primary transition-all duration-700 w-full'
            onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
            onBlur={()=>(setTimeout(()=>setOpenSuggestions(false),500),currentController.current && currentController.current.abort())}
            onKeyUp={(event:KeyboardEvent)=>event.key==='Enter' && redirectSearchPage()}
          />

          <div ref={suggestionsDesk} className={`${openSuggestions ? 're1:flex' : 'hidden'} flex-col w-full absolute top-full border border-neutral border-t-transparent bg-base-100 rounded-b-lg`}>
            {autoComplete.map((suggestion:any)=>{
              const handleClick=()=>{
                sendEvent({name:'search_details', params:{
                  content_type:suggestion.name,
                  path:globalThis.window.location.pathname
                }})
              }

              if(suggestion.thumbUrl){
                return(
                  <a href={suggestion.href} className='flex flex-row items-center py-1 px-1 hover:bg-[#272727]' rel='nofollow' onClick={handleClick}>
                    <Image src={suggestion.thumbUrl.replace('25-25/1','32-32/1')} width={32} height={32} loading='eager' decoding='async' fetchPriority='high'/>
                    <p className='line-clamp-1 text-sm text-secondary ml-1'>{suggestion.name}</p>
                  </a>
                )
              }else{
                const fqName=suggestion.name.replace(finalInputValue.current.trim(),'').trim()
                const href=`/s?q=${finalInputValue.current}&fqName=${fqName}`

                return(
                <a href={href} className='flex flex-row items-center py-1 px-1 hover:bg-[#272727] line-clamp-1 text-sm text-secondary ml-1' rel='nofollow' onClick={handleClick}>
                  {suggestion.name}
                </a>
                )
              }
            })}
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
          className='flex w-full h-12 items-center justify-between absolute top-[5.5rem] bg-base-100 re1:hidden'
        >
          <label className='flex justify-between items-center w-[90%] m-auto bg-black rounded-md px-4 py-2'>
            <input
              ref={inputMob}
              type='text'
              name='search'
              placeholder='O que você procura...'
              className='placeholder:text-neutral w-4/5 bg-transparent outline-none text-secondary'
              onInput={(event)=>setInputValue((event.target as HTMLInputElement).value)}
              onClick={(event)=>setInputValue((event.target as HTMLInputElement).value)}
              onKeyUp={(event:KeyboardEvent)=>event.key==='Enter' && redirectSearchPage()}
            />
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
              alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
              onClick={redirectSearchPage} className='h-fit'
            />
          </label>
        </div>

        <div ref={suggestionsMob} className={`${openSuggestions ? 'flex' : 'hidden'} re1:hidden flex-col w-full absolute border-b border-b-neutral top-28 bg-base-100 rounded-b-lg rounded-br-lg`}>
          {autoComplete.map((suggestion:any)=>{
            if(suggestion.thumbUrl){
              return(
                <a href={suggestion.href} className='flex flex-row items-center py-1 px-1 hover:bg-[#272727]'>
                  <Image src={suggestion.thumbUrl.replace('25-25/1','32-32/1')} width={32} height={32} loading='eager' decoding='async' fetchPriority='high'/>
                  <p className='line-clamp-1 text-sm text-secondary ml-1'>{suggestion.name}</p>
                </a>
              )
            }else{
              const fqName=suggestion.name.replace(finalInputValue.current.trim(),'').trim()
              const href=`/s?q=${finalInputValue.current}&fqName=${fqName}`

              return(
              <a href={href} className='flex flex-row items-center py-1 px-1 hover:bg-[#272727] line-clamp-1 text-sm text-secondary ml-1'>
                {suggestion.name}
              </a>
              )
            }
          })}
        </div>
    </>
  )
}

export default SearchMenuBar
