// deno-lint-ignore-file no-explicit-any
const RemakeItemsForSwiper:(
  items:any,
  itemsPerSlide:number
)=>any=(items, itemsPerSlide)=>{
  const totalItems = items.length;
  const expandedItems = [];
  let currentStartIndex = 0;

  while (expandedItems.length < totalItems * itemsPerSlide) {
    for (let i = 0; i < itemsPerSlide; i++) {
      expandedItems.push(items[(currentStartIndex + i) % totalItems])
    }
    currentStartIndex = (currentStartIndex + itemsPerSlide) % totalItems
  }

  return expandedItems.slice(0, totalItems * itemsPerSlide)
}

export default RemakeItemsForSwiper