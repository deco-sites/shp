interface SpecObj{
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
  Slug?:string
}

const removeDot:(filters:SpecObj[])=>SpecObj[]=(filters)=>{
  return filters.map((filter:SpecObj)=>{
    filter.Value=filter.Value.replace('%40dot%40','.')
    return filter
  })
}

export default removeDot