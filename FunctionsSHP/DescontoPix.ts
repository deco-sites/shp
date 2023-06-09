export const DescontoPIX=(valor:number,percent:number)=>{
  const multiplier=(100-percent)/100

  return valor*multiplier
}
