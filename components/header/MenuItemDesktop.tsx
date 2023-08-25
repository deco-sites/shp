import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  open: string

  subCategs: Array<{
    imgUrl: string
    linkTo: string
  }>

  subCategsNoImg?: Array<{
    iconUrl: string
    name: string
    linkTo: string
  }>
}

const MenuItemDesk = ({ open, subCategs, subCategsNoImg }: Props) => {
  return (
    <div
      className={`w-full h-48 bg-[#111] absolute gap-8 justify-center items-center hover:flex ${open}`}
    >
      <div className='flex gap-2'>
        {subCategs.map((img) => (
          <div className='w-fit h-fit border-2 border-transparent hover:border-[#dd1f26] border-solid rounded-lg'>
            <a href={img.linkTo}>
              <Image
                className='rounded-lg' src={img.imgUrl} alt='FotoCateg' width={120} height={120}
                preload fetchPriority='high' decoding='auto' loading='lazy'
              />
            </a>
          </div>
        ))}
      </div>

      {subCategsNoImg && (
        <>
          <div className='w-[2px] h-3/5 bg-[#3d3d3d]' />

          <div className='grid grid-cols-3 gap-4'>
            {subCategsNoImg.map((el)=>(
              <a href={el.linkTo} className='flex items-center content-center gap-2 hover:brightness-200'>
                <Image src={el.iconUrl} alt='icon' width={28} height={22}             
                  preload fetchPriority='high' decoding='auto' loading='lazy'
                />
                <span className='text-[#828282] font-bold'>{el.name}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MenuItemDesk
