import ProductCompreJunto, {
  Props,
} from 'deco-sites/shp/components/product/ProductCompreJunto.tsx'
import { AppContext } from "deco-sites/shp/apps/site.ts";
import { SectionProps } from "deco/types.ts";

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props,
    descontoPix: ctx.descontoPix,
  }
}

function ProductCompreJuntoSection(props: SectionProps<typeof loader>) {
  return <ProductCompreJunto {...props}/>;
}

export default ProductCompreJuntoSection;