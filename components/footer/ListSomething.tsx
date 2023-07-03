export interface Props {
  title: string
  list: Array<{
    link: string
    text: string
  }>
}

const ListSomething = ({ title, list }: Props) => {
  return (
    <div>
      <h1 className='text-white text-lg re1:text-xl font-bold'>{title}</h1>
      <ul className='flex flex-col gap-2'>
        {list.map((anchor) => (
          <li>
            <a href={anchor.link} className='text-left text-sm re1:text-base text-[#828282]'>
              {anchor.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListSomething
