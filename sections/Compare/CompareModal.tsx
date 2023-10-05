import { useState, useEffect } from 'preact/hooks'
import {PcContextProps} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'

interface Props{
  PCs:PcContextProps[]
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
        className="bg-primary text-white font-bold px-2 py-1 re1:p-[18px] my-auto rounded-lg w-full"
        onClick={openModal}
      >
        Comparar
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content text-left">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Minha Modal</p>
                <button className="modal-close p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-300" onClick={closeModal}>
                  <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M1 1l6 6 6-6M1 17l6-6 6 6" fillRule="evenodd" stroke="none" strokeWidth="1"/>
                  </svg>
                </button>
              </div>
              <p>Conteúdo da modal aqui...</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CompareModal