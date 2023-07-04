import type { BreadcrumbList } from 'deco-sites/std/commerce/types.ts'

interface Props {
  itemListElement: BreadcrumbList['itemListElement']
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: 'Home', item: '/' }, ...itemListElement]
  const itemsFiltered = items.filter(({ name, item }) => name && item)

  return (
    <div class='text-caption hidden re1:breadcrumbs'>
      <ul>
        {itemsFiltered.map(({ name, item }, index) => 
          index === itemsFiltered.length - 1 ? (
            <li>
              <p className='truncate w-60 font-bold'>{name}</p>
            </li>
          ) : (
            <li className='underline decoration-solid'><a href={item}>{name}</a></li>
          )
        )}
      </ul>
    </div>
  )
}

export default Breadcrumb
