import { useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx'
import PriceFilter from 'deco-sites/shp/sections/PagCategEDepto/PriceFilter.tsx'


interface Props{
  filters:FilterObj[]
  id:string
}

interface FilterObj{
  label:string
  values:SpecObj[]
}

interface SpecObj{
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
}

const FiltroMob=({ filters, id }:Props)=>{
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
    <div className='re1:hidden' >
      <button className='flex bg-transparent border border-secondary w-full h-12 px-10 items-center justify-center gap-2' onClick={openModal}>
        <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/filterIcon.png' width={15} height={15}/>
        <p>Filtros</p>
      </button>

      <dialog id={id} ref={modal} className='bg-base-100 min-h-full min-w-[100vw] overflow-x-hidden overflow-y-auto'>
        <form>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-neutral text-secondary border-transparent"
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

          <div className='flex flex-col py-5 items-center gap-10 text-secondary'>
            <span className='text-2xl font-bold px-4'>Filtros</span>
            <ul className='w-full'>
              {filters.map((filtro,index)=>index!==filters.length-1 ?
                (<Filtro title={filtro.label} values={filtro.values} />) :
                (<PriceFilter filtro={filtro}/>)
              )}
            </ul>
            <div className='px-4 w-full'>
              <button onClick={()=>{
                const priceInputs=Array.from(modal.current!.querySelectorAll('input[name="min"], input[name="max"]'))
                const priceInputsLength=priceInputs.filter(input=>(input as HTMLInputElement).value.length===0).length
                const hasInputPriceVoid=(priceInputsLength>0 && priceInputsLength!==2)
                hasInputPriceVoid ? alert('Há somente um campo de preço preenchido!') : closeModal()
              }} id='filtrar' className='w-full bg-primary px-[5px] py-[10px] rounded-lg text-lg' type='button'>Filtrar</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default FiltroMob