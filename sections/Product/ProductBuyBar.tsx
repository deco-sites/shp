import ProductBuyBar, {
  Props,
} from 'deco-sites/shp/components/product/ProductBuyBar.tsx'
import { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";

export const loader = (props: Omit<Props,'descontoPix'>, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props,
    descontoPix: ctx.descontoPix,
  }
}

function ProductBuyBarSection(props: SectionProps<typeof loader>) {
  return <ProductBuyBar {...props} />;
}

export default ProductBuyBarSection;