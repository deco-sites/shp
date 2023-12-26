import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  open: string

  subCategs: Array<{
    imgUrl: string
    linkTo: string
  }>

  subCategsNoImg?: Array<{
    iconSvg: string
    name: string
    linkTo: string
  }>
}

const MenuItemDesk = ({ open, subCategs, subCategsNoImg }: Props) => {
  return (
    <div
      className={`w-full h-48 bg-base-100 absolute gap-8 justify-center items-center hover:flex ${open}`}
    >
      <div className='flex gap-2'>
        {subCategs.map((img) => (
          <div className='w-fit h-fit border-2 border-transparent hover:border-primary border-solid rounded-lg'>
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
          <div className='w-[2px] h-3/5 bg-neutral' />

          <div className='grid grid-cols-3 gap-4'>
            {subCategsNoImg.map((el)=>(
              <a href={el.linkTo} className='flex items-center content-center gap-2 hover:brightness-200'>
                {/* <Image src={el.iconUrl} alt='icon' width={28} height={22}             
                  preload fetchPriority='high' decoding='auto' loading='lazy'
                /> */}
                <div dangerouslySetInnerHTML={{__html:el.iconSvg}}/>
                <span className='text-neutral-content font-bold'>{el.name}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MenuItemDesk
