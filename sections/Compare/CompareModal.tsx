import { useState, useEffect } from 'preact/hooks'
import {PcContextProps, useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Icon from "deco-sites/shp/components/ui/Icon.tsx";

interface Props{
  PCs:PcContextProps[]
}

const PCCard=({PC}:{PC:PcContextProps})=>{
  const {removePC}=useCompareContext()

  return(
    <div className='flex flex-col relative w-[180px] items-center gap-1'>
      <svg className='absolute -right-[10%] re1:-right-[12px] top-[25%] re1:-top-[12px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
        onClick={()=>removePC(PC.name, PC.id)}
      >
        <circle cx="12.5" cy="12.5" r="12.5" fill="#DD1F26"></circle>
        <rect x="6" y="11" width="13" height="3" fill="white"></rect>
      </svg>
      <Image width={150} height={150} src={PC.imgUrl} fetchPriority='high' decoding='sync' loading='eager'/>
      <p className='line-clamp-3 text-sm text-center'>{PC.name}</p>
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
    <div className='w-full text-white border border-[#1b1b1b] py-[15px] bg-[#141414]'>
      <div className='flex w-full justify-start items-center gap-1'
        onClick={()=>setIsOpen(prevState=>!prevState)}
      >
        <p className='text-2xl font-bold'>Especificações</p>
        <Icon 
          id={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          strokeWidth={3}
          loading='eager'
        />
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} w-full`}>
        <div className='p-[8px] grid grid-cols-5 gap-7 bg-[#1b1b1b]'>
          <p>Placa de Vídeo</p>
          {PCs.map(pc=><p>{pc.placaVideo}</p>)}
        </div>
        <div className='p-[8px] grid grid-cols-5 gap-7'>
          <p>Processador</p>
          {PCs.map(pc=><p>{pc.processador}</p>)}
        </div>
        <div className='p-[8px] grid grid-cols-5 gap-7 bg-[#1b1b1b]'>
          <p>Memória</p>
          {PCs.map(pc=><p>{pc.memoria}</p>)}
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
        <div className='fixed inset-0 flex items-center justify-center z-20 text-white'>
          <div className='absolute w-full h-full bg-black/50' onClick={closeModal}></div>

          <div className='flex flex-col gap-10 p-10 re1:p-12 h-screen re1:h-[70vh] w-4/5 bg-[#1e1e1e] ml-auto re1:m-auto re1:mt-[15vh] rounded-lg overflow-y-scroll z-[21]'>
            <div className='flex justify-center items-center pb-3 relative'>
              <p className='text-3xl font-bold'>Comparação dos Produtos</p>
              <button className='absolute right-0 top-0 cursor-poiter btn btn-sm btn-circle bg-[#3d3d3d] border-transparent' onClick={closeModal}>✕</button>
            </div>
            <div className='grid grid-cols-5 gap-7'><div/>{PCs.map((PC)=><PCCard PC={PC}/>)}</div>
            <Especificacoes PCs={PCs} />
          </div>
        </div>
      )}
    </>
  )
}

export default CompareModal