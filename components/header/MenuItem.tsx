import { useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  rounded?:string
  iconLink: string
  itemName: string
  links: Array<{
    name: string
    link: string
  }>
}

const menuItem = ({ rounded ,iconLink, itemName, links }: Props) => {
  const [open, setOpen] = useState('hidden')

  const handleOpen = () => {
    open === 'hidden' ? setOpen(' ') : setOpen('hidden')
  }

  return (
    <>
      <button onClick={handleOpen} className={`flex w-[95%] bg-[#333] ${rounded} border-2 border-transparent h-12 text-secondary font-bold justify-between p-5 my-[2px] mx-auto items-center`}>
        <div className='flex gap-2'>
          <Image className='h-auto my-auto' src={iconLink} alt='iconLink' width={18} height={12}
            preload fetchPriority='low' decoding='auto' loading='lazy'
          />

          <span>{itemName}</span>
        </div>

        <div className='w-fit h-fit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='Layer_1'
            enable-background='new 0 0 128 128'
            height='20'
            viewBox='0 0 128 128'
            width='20'
          >
            <path
              fill='white'
              id='Down_Arrow_3_'
              d='m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z'
            />
          </svg>
        </div>
      </button>
      <div className={`w-[95%] mx-auto flex flex-col ${open}`}>
        {links.map((obj) => (
          <div className='bg-[#222] text-primary mb-1 p-3'>
            <a href={obj.link}>{obj.name}</a>
          </div>
        ))}
      </div>
    </>
  )
}

export default menuItem
