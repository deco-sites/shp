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
      <h4 className='text-secondary text-lg re1:text-xl font-bold'>{title}</h4>
      <ul className='flex flex-col gap-2'>
        {list.map((anchor) => (
          <li>
            <a href={anchor.link} className='text-left text-sm re1:text-base text-neutral-content'>
              {anchor.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListSomething
