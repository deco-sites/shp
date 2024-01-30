//criado a partir da lógica do arquivo:
//api da shopinfo/getQtdItems/hotsiteDataProducts.php

import { Product } from 'apps/commerce/types.ts'

type PreQtd={
  [key:string]:{
    qtd:number
  }
}

import DataJson from 'deco-sites/shp/static/prodInitialQtd_test.json' with { type: 'json' } 

const calculoComNli=(nli:string)=>{
  const NLI=nli.split('')
  
  //comentei pq n tá sendo usado
  // let p1=parseInt(NLI.slice(2,3).join(''))

  let p2=parseInt(NLI[NLI.length-1]) + parseInt(NLI[NLI.length-2])

  if(p2 > 9){p2 /= 2}

  let qtdInit=parseFloat(`${NLI[NLI.length-1]}${p2}`)

  if(qtdInit < 10){qtdInit += 5}

  return qtdInit
}

const calculaComAData=(qtdInit:number, diasAtivos:number, diasAteAcabar:number)=>{
  const qtdInitForDay=qtdInit / diasAtivos
  
  let qtdProd=qtdInitForDay* diasAteAcabar

  qtdProd+=3

  return qtdProd
}

const prodQntd=(prod:Product, initialDate:Date, finalDate:Date)=>{
  const actualDate=new Date()

  const diasAtivos=Math.floor((finalDate.getTime() - initialDate.getTime())/ (1000 * 60 * 60 * 24))

  let diasAteAcabar=Math.floor((finalDate.getTime() - actualDate.getTime())/ (1000 * 60 * 60 * 24)) 

  if(diasAteAcabar < 1){diasAteAcabar = 1}

  const preQtd= DataJson as PreQtd

  let qtdInitial:number

  const temNLI=prod.name!.includes('NLI')

  let finalQuantity:number

  if(temNLI){
    const NLI=prod.name!.slice(prod.name!.indexOf('NLI'),prod.name!.length).split(' ')[0]
    if(preQtd[NLI]){
      qtdInitial=preQtd[NLI].qtd
    }else{
      qtdInitial=calculoComNli(NLI.replace('NLI',''))
    }

    finalQuantity= calculaComAData(qtdInitial, diasAtivos, diasAteAcabar)
  }else{
    let prodStockCount=prod.offers!.offers[0]!.inventoryLevel!.value

    if(prodStockCount){
      if(prodStockCount > 250) prodStockCount=250
      
      finalQuantity= calculaComAData(prodStockCount, diasAtivos, diasAteAcabar)
    }else{
      qtdInitial=calculoComNli(prod.inProductGroupWithID || prod.sku)

      finalQuantity= calculaComAData(qtdInitial, diasAtivos, diasAteAcabar)
    }
  }

  return Math.floor(finalQuantity)
}

export default prodQntd