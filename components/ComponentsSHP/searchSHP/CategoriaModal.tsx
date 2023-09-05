import { useRef, useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'


interface Props{
  categories:Array<{
    name:string,
    value:string
  }>,
  id:string,
  showFqOption?:{
    name:string,
    value:string
  }
}

const CategoriaModal=({ categories, id, showFqOption }:Props)=>{

  const modal=useRef<HTMLDialogElement>(null)
  const [modalOpen, setModalOpen]=useState(false)
  const [openedValue, setOpenedValue]=useState('')
  const [selectedValue,setSelectedValue]=useState(showFqOption ? showFqOption.value.toString() : '')

  const categsList=useRef<HTMLUListElement>(null)

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

  useEffect(()=>{
    if(modalOpen && categsList.current){
      if(!categsList.current.querySelector('input:checked')){(categsList.current.querySelector('input#nenhuma') as HTMLInputElement).click()}
      const alreadySelectedValue=(categsList.current.querySelector('input:checked') as HTMLInputElement).value
      setOpenedValue(alreadySelectedValue)
    }
  },[modalOpen])

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
              if(openedValue!=selectedValue){
                alert('Você selecionou um valor diferente do anterior, portanto clique no botão para filtrar ou volte para o anterior!')
              }else{
                closeModal()
              }
            }}
          >✕</button>

          <div className='flex flex-col py-5 items-center gap-10 text-white'>
            <h2 className='text-2xl font-bold px-4'>Categorias</h2>
            <ul ref={categsList} className='w-full'>
              {showFqOption && (
                <li className='py-1 px-2'>
                  <label className='flex justify-start gap-2 cursor-pointer items-center'>
                    <input checked disabled type="radio" name="category" id={showFqOption.name} className='radio radio-primary' value={showFqOption.value}/>
                    <span className='line-clamp-1 font-bold'>{showFqOption.name.replaceAll('/',' ')}</span>
                  </label>
                </li>
              )}
              <li className='py-1 px-2'>
                <label className='flex justify-start gap-2 cursor-pointer items-center'>
                  <input type="radio" name="category" id='nenhuma' className='radio radio-primary' value=''
                    onInput={(event)=>setSelectedValue((event.target as HTMLInputElement).value)}
                  />
                  <span className='line-clamp-1 font-bold'>Nenhuma</span>
                </label>
              </li>
              {categories.map(category=>(
                <li className='py-1 px-2'>
                  <label className='flex justify-start gap-2 cursor-pointer items-center'>
                    <input type="radio" name="category" id={category.name} className='radio radio-primary' value={category.value}
                      onInput={(event)=>setSelectedValue((event.target as HTMLInputElement).value)}
                    />
                    <span className='line-clamp-1 font-bold'>{category.name.replaceAll('/',' ')}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className='px-4 w-full'>
              <button onClick={()=>{
                closeModal()
              }} id='filtrar' className='w-full bg-primary px-[5px] py-[10px] rounded-lg text-lg' type='button'>Filtrar</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default CategoriaModal