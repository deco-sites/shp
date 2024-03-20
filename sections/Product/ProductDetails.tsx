import ProductDetails, {
  Props,
} from "deco-sites/fashion/components/product/ProductDetails.tsx";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

function ProductDetailsSection(props: SectionProps<typeof loader>) {
  return <ProductDetails {...props} />
}

export default ProductDetailsSection
