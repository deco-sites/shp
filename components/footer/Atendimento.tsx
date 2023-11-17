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
        <p className='text-primary leading-4'>{title}</p>
        {Anchor ?
          (<a className='text-sm text-secondary' href={link}>{text}</a>)
        :
          (<p className='text-sm text-secondary'>{text}</p>)
        }
      </div>
    </div>
  )
}

export default Atendimento
