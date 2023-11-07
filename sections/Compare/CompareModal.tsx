import { useState, useEffect } from 'preact/hooks'
import {PcContextProps, useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Icon from "deco-sites/shp/components/ui/Icon.tsx";
import {Runtime} from 'deco-sites/shp/runtime.ts'

interface Props{
  PCs:PcContextProps[]
}

const PCCard=({PC}:{PC:PcContextProps})=>{
  const {removePC}=useCompareContext()

  return(
    <div className='flex flex-col relative w-[180px] items-center gap-1 mx-auto'>
      <svg className='absolute -right-[10%] re1:-right-[12px] top-0 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
        onClick={()=>removePC(PC.name, PC.id)}
      >
        <circle cx="12.5" cy="12.5" r="12.5" fill="#DD1F26"></circle>
        <rect x="6" y="11" width="13" height="3" fill="white"></rect>
      </svg>
      <Image width={150} height={150} src={PC.imgUrl} fetchPriority='high' decoding='sync' loading='eager'/>
      <a href={PC.linkProd} className='line-clamp-3 text-sm text-center'>{PC.name}</a>
      <span className='text-[#25d366] text-lg font-bold'>{PC.parcelas}x {PC.valorParcela.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</span>
      <span className='text-xs text-[#b4b4b4]'>ou por {PC.precoVista.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</span>
      <button className='bg-primary text-white font-bold py-[10px] px-[15px] rounded-lg w-[80%]'>Comprar</button>
      <a className='text-xs text-[#b4b4b4] underline cursor-pointer'>Adicionar aos favoritos</a>
    </div>
  )
}

const Especificacoes=({PCs}:Props)=>{
  const [isOpen, setIsOpen]=useState(true)
  
  return(
    <div className='w-full text-white border border-[#1b1b1b] bg-[#141414] min-w-max re1:min-w-[unset]'>
      <div className='flex w-full justify-start items-center gap-1'
        onClick={()=>setIsOpen(prevState=>!prevState)}
      >
        <p className='text-2xl font-bold p-[8px]'>Especificações</p>
        <Icon 
          id={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          strokeWidth={3}
          loading='eager'
        />
      </div>
      <div className={`w-full transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[9999px]' : 'max-h-0'}`}>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b] bg-[#1b1b1b]'>
          <p className='w-[180px]'>Placa de Vídeo</p>
          {PCs.map(pc=><p title={pc.name} className='line-clamp-3 mx-auto w-[180px] text-center'>{pc.placaVideo}</p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b]'>
          <p className='w-[180px]'>Processador</p>
          {PCs.map(pc=><p title={pc.name} className='line-clamp-3 mx-auto w-[180px] text-center'>{pc.processador}</p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b] bg-[#1b1b1b]'>
          <p className='w-[180px]'>Memória</p>
          {PCs.map(pc=><p title={pc.name} className='line-clamp-3 mx-auto w-[180px] text-center'>{pc.memoria}</p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b]'>
          <p className='w-[180px]'>Armazenamento</p>
          {PCs.map(pc=>
          <p title={pc.name} className='line-clamp-3 mx-auto w-[180px] text-center'>{(pc.armazenamento.includes('HD') || pc.armazenamento.includes('SSD')) ? 
            pc.armazenamento: `${pc.tipoArm} ${pc.armazenamento}`}
          </p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b] bg-[#1b1b1b]'>
          <p className='w-[180px]'>Fonte</p>
          {PCs.map(pc=><p title={pc.name} className='line-clamp-3 mx-auto w-[180px] text-center'>{pc.fonte}</p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b]'>
          <p className='w-[180px]'>Garantia</p>
          {PCs.map(__=><p className='mx-auto w-[180px] text-center'>1 Ano</p>)}
        </div>
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b]'>
          <div className='w-[180px]'/>
          {PCs.map(__=>
            <div className='w-[180px] flex items-center justify-center mx-auto'>
              <button className='text-base bg-primary text-white font-bold py-[10px] px-[15px] rounded-lg w-[80%]'>Comprar</button>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

const Games=({PCs}:Props)=>{
  const [isOpen, setIsOpen]=useState(true)
  const [fps,setFps]=useState<Array<Record<string,number>|undefined>>([])
  const [games, setGames]=useState<string[]>([])
  const [hide,setHide]=useState(true)
  
  useEffect(()=>{
    const fetchFPS=async(PC:PcContextProps)=>{
      return await Runtime.invoke({
        key:'deco-sites/shp/loaders/getParamFps.ts',
        props:{processador:PC.processador ,placaVideo:PC.placaVideo}
      })
    }

    (async()=>{
      const arrayFPS=PCs.map(PC=>fetchFPS(PC))
      const promisesFPS=await Promise.all(arrayFPS)
      setFps(promisesFPS)
    })()
  },[PCs])

  useEffect(()=>{
    if(fps.some(item=>item!==undefined)){
      setGames(Object.keys(fps.find(item=>item!==undefined) as Record<string,number>))
      setHide(false)
    }
  },[fps])

  return(
    <div className={`${hide ? 'hidden' : ''} w-full text-white border border-[#1b1b1b] bg-[#141414] min-w-max re1:min-w-[unset]`}>
      <div className='flex w-full justify-start items-center gap-1'
        onClick={()=>setIsOpen(prevState=>!prevState)}
      >
        <p className='text-2xl font-bold p-[8px]'>Desempenho</p>
        <Icon 
          id={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          strokeWidth={3}
          loading='eager'
        />
      </div>
      <div className={`w-full transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[9999px]' : 'max-h-0'}`}>
        {games.map((game)=>{
          return (
            <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b] odd:bg-[#1b1b1b]'>
              <p className='w-[180px] capitalize'>{game}</p>
              {fps.map((gamesFps,idx)=>{
                if(gamesFps){
                  return <p title={PCs[idx].name} className='line-clamp-3 mx-auto w-[180px] text-center'>{gamesFps[game]===0 ? '' : gamesFps[game] + ' FPS'}</p>
                }else{
                  return <div className='w-[180px]' />
                }
              })}
            </div>
          )
        })}
        
        <div className='text-xs re1:text-base items-center p-[8px] grid grid-cols-5 gap-7 border border-[#1b1b1b]'>
          <div className='w-[180px]'/>
          {PCs.map(__=>
            <div className='w-[180px] flex items-center justify-center mx-auto'>
              <button className='text-base bg-primary text-white font-bold py-[10px] px-[15px] rounded-lg w-[80%]'>Comprar</button>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

const CompareModal = ({PCs}:Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        className='bg-primary text-white font-bold px-2 py-1 re1:p-[18px] my-auto rounded-lg w-full re1:w-auto'
        onClick={()=>{PCs.length<2 ? alert('Você deve selecionar pelo menos 2 items para comparar!') : openModal()}}
      >Comparar</button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-40 text-white'>
          <div className='absolute w-full h-full bg-black/50' onClick={closeModal}></div>
      
          <div className='absolute flex flex-col gap-10 p-6 re1:p-12 h-[90vh] re1:h-[70vh] w-[90%] re1:w-4/5 bg-[#111] ml-auto re1:m-auto rounded-lg z-[41]'>
            <div className='flex justify-center items-center pb-3 relative re1:w-full'>
              <p className='text-xl re1:text-3xl font-bold text-center'>Comparação dos<br/>Produtos</p>
              <button className='absolute -right-[5%] re1:right-0 -top-[5%] re1:top-0 cursor-poiter btn btn-sm btn-circle bg-[#3d3d3d] border-transparent' onClick={closeModal}>✕</button>
            </div>
            <div className='flex flex-col gap-10 relative re1:static overflow-y-auto overflow-x-auto w-full re1:scrollbar-shp'>
              <div className='grid grid-cols-5 gap-7 min-w-max re1:min-w-[unset]'><div className='w-[180px]'/>{PCs.map((PC)=><PCCard PC={PC}/>)}</div>
              <Especificacoes PCs={PCs} />
              <Games PCs={PCs} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CompareModal