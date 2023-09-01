import { useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'


interface Props{
  categories:Array<{
    name:string,
    value:string
  }>,
  id:string
}

const CategoriaModal=({ categories, id }:Props)=>{
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
      <button className='bg-transparent border border-white w-full h-12 px-10 rounded-lg' onClick={openModal}>
        <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/filterIcon.png' width={35} height={30}/>
      </button>

      <dialog id={id} ref={modal} className='bg-[#111] min-h-full min-w-[100vw] overflow-x-hidden overflow-y-auto'>
        <form>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-[#3d3d3d] text-white border-transparent"
            onClick={(event)=>{
              event.preventDefault()
              if(modal.current){
                // const inputs=Array.from(modal.current.querySelectorAll('input[type="checkbox"]'))
                // const priceInputs=Array.from(modal.current.querySelectorAll('input[name="min"], input[name="max"]'))

                // const hasChecked=inputs.some(input=>(input as HTMLInputElement).checked===true)
                // const hasPriceInputed=priceInputs.some(input=>(input as HTMLInputElement).value.length>0)

                // if(hasChecked || hasPriceInputed){
                //   alert('Existem filtros selecionados, clique em Filtrar!\n Ou deselecione os filtros')
                // }else{
                //   closeModal()
                // }
                closeModal()
              }
            }}
          >✕</button>

          <div className='flex flex-col py-5 items-center gap-10 text-white'>
            <h2 className='text-2xl font-bold px-4'>Categorias</h2>
            <ul className='w-full'>
              {categories.map(category=>(
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input type="radio" name="category" id={category.name} className='radio radio-primary'/>
                  <span className='line-clamp-1 text-sm'>{category.name}</span>
                </label>
              ))}
            </ul>
            <div className='px-4 w-full'>
              <button onClick={()=>{
                // const priceInputs=Array.from(modal.current!.querySelectorAll('input[name="min"], input[name="max"]'))
                // const priceInputsLength=priceInputs.filter(input=>(input as HTMLInputElement).value.length===0).length
                // const hasInputPriceVoid=(priceInputsLength>0 && priceInputsLength!==2)
                // hasInputPriceVoid ? alert('Há somente um campo de preço preenchido!') : closeModal()
              }} id='filtrar' className='w-full bg-primary px-[5px] py-[10px] rounded-lg text-lg' type='button'>Filtrar</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default CategoriaModal