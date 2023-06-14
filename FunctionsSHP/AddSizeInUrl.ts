export const putSizeInUrl=(url:string, size:number[])=>{ 
  const sizeEncoded='-'+size.join('-')
  const [parte1, parte2]=url.split('/1.png')
  return `${parte1}${sizeEncoded}/1.png${parte2}`
}