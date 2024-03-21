import { useContext, useState, useCallback, useEffect } from 'preact/hooks'
import { createContext, FunctionalComponent } from 'preact'
import Compare from 'deco-sites/shp/sections/Compare/Compare.tsx'

export interface PcContextProps{
  name:string
  id:string
  precoVista:number
  valorParcela:number
  parcelas:number
  linkProd:string
  imgUrl:string
  precoDe:number
  placaVideo:string
  processador:string
  memoria:string
  armazenamento:string
  tipoArm:string
  pix:number
  flagPercent:number
  fonte:string
  groupId:string
  seller:string
}

export interface CompareContextType {
  PCs: Array<PcContextProps>
  addPC: (pc: PcContextProps) => void
  removePC: (name:string, id:string) => void
  removeAll:() => void
}

const CompareContext=createContext<CompareContextType | undefined>(undefined)

export const useCompareContext=():CompareContextType=>{
  const context=useContext(CompareContext)
  if (!context) {
    throw new Error('useCompareContext must be used within a CompareContextProvider')
  }
  return context
}

const CompareContextProvider:FunctionalComponent=({children})=>{
  const [PCs, setPCs]=useState<PcContextProps[]>([])

  const addPC= useCallback((pc:PcContextProps)=>{
    setPCs(prevPCs=> [...prevPCs, pc])
    // console.log(`Adding: name:${pc.name}, id:${pc.id}`)
  },[])

  const removePC=useCallback((name:string, id:string)=>{
    setPCs(prevPCs=>prevPCs.filter(PC=>(PC.name!==name && PC.id!==id)))
    // console.log(`Removing: name:${name}, id:${id}`)
  },[])

  const removeAll=useCallback(()=>{
    setPCs([])
  },[])

  const value:CompareContextType={
    PCs,
    addPC,
    removePC,
    removeAll
  }

  return <CompareContext.Provider value={value}>{children}{PCs.length>=1 && <Compare PCs={PCs}/>}</CompareContext.Provider>
}

export default CompareContextProvider