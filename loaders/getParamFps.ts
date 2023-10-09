export interface Props{
  processador:string
  placaVideo:string
}

const loader=async({ processador, placaVideo }:Props)=>{
  const formData=new FormData()
  formData.append('processador',processador)
  formData.append('placaVideo',placaVideo)
  const fps=await fetch('https://api.shopinfo.com.br/paramFps.php',{
    method: 'POST',
    body: formData 
  }).then(async (r)=>{ 
  const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return 
    }else if(text.split('')[0]==='<'){
      return
    }else{
      return resp.json()
    }
  }).catch(err=>console.error(err))
  return fps
}

export default loader