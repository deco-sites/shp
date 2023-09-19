import { useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import type { Filtros } from 'deco-sites/shp/types/CampanhaTypes.ts'


interface Props{
  filters:Filtros['tipoDeFiltro']
}



const FiltroMob=({ filters }:Props)=>{
  const modal=useRef<HTMLDialogElement>(null)
  const [modalOpen, setModalOpen]=useState(false)

  const openModal=()=>{
    if(modal.current && !modalOpen){
      modal.current.showModal()
      setModalOpen(true)
    }
  }

  const closeModal=()=>{
    if(modal.current && modalOpen){
      modal.current.close()
      setModalOpen(false)
    }
  }

  return(
    <>
      <label className='w-[45%]'>
        <p className='font-bold'>Filtros</p>
        <button className='bg-transparent border border-white w-full h-12 px-10 rounded-lg' onClick={openModal}>
          <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/filterIcon.png' width={35} height={30}/>
        </button>
      </label>

      <dialog ref={modal} className='bg-[#111] min-h-full min-w-[100vw] overflow-x-hidden overflow-y-auto'>
        <form>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-[#3d3d3d] text-white border-transparent"
            onClick={(event)=>{
              event.preventDefault()
              if(modal.current){
                const inputs=Array.from(modal.current.querySelectorAll('input[type="checkbox"]'))
                const priceInputs=Array.from(modal.current.querySelectorAll('input[name="min"], input[name="max"]'))

                const hasChecked=inputs.some(input=>(input as HTMLInputElement).checked===true)
                const hasPriceInputed=priceInputs.some(input=>(input as HTMLInputElement).value.length>0)

                if(hasChecked || hasPriceInputed){
                  alert('Existem filtros selecionados, clique em Filtrar!\n Ou deselecione os filtros')
                }else{
                  closeModal()
                }
              }
            }}
          >✕</button>

          <div className='flex flex-col py-5 items-center gap-10 text-white'>
            <h2 className='text-2xl font-bold px-4'>Filtros</h2>
            <ul className='w-full'>
              {filters.map((filtro,index)=>
                <li className='text-lg font-bold text-white border-y border-y-[#1e1e1e] py-3 px-4' data-index={index} data-value={filtro.value} data-fq={filtro.fqType}
                  onClick={()=>closeModal()}
                >
                  {filtro.name}
                </li>
              )}
              <li className='text-lg font-bold text-white border-y border-y-[#1e1e1e] py-3 px-4' data-index={777} data-value='' data-fq=''
                onClick={()=>closeModal()}
              >
                Ver Todos
              </li>
            </ul>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default FiltroMob