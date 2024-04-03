import Header from 'deco-sites/shp/components/header/Header.tsx'
import { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";
import { GravataProps } from 'deco-sites/shp/components/header/GravataTopo.tsx'

export const loader = (props: {gravata:GravataProps}, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props,
    descontoPix: ctx.descontoPix
  }
}

const FinalHeader=(props:  SectionProps<typeof loader>)=>{
  return <Header {...props} />
}

export default FinalHeader