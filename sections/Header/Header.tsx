import Header, { Props } from 'deco-sites/shp/components/header/Header.tsx'
import { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    descontoPix: ctx.descontoPix
  }
}

const FinalHeader=(props:  SectionProps<typeof loader>)=>{
  return <Header {...props} />
}

export default FinalHeader