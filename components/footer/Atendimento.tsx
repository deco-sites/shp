import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  Anchor: boolean
  link?: string
  iconUrl: string
  text: string
  title: string
}

const Atendimento = ({ link, iconUrl, text, title, Anchor }: Props) => {
  return (
    <div className='flex gap-1 h-[40px] items-center'>
      <Image
        src={iconUrl} width={36} height={36} loading='lazy' decoding='sync' fetchPriority='low'
      />
      <div className='flex flex-col font-bold'>
        <p className='text-[#dd1f26] leading-4'>{title}</p>
        {Anchor ?
          (<a className='text-sm text-white' href={link}>{text}</a>)
        :
          (<p className='text-sm text-white'>{text}</p>)
        }
      </div>
    </div>
  )
}

export default Atendimento
