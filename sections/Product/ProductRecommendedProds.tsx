import ProductRecommendedProds, {
  Props,
} from 'deco-sites/shp/components/product/ProductRecommendedProds.tsx'
import { SectionProps } from 'deco/types.ts'
import { AppContext } from 'deco-sites/shp/apps/site.ts'

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

function ProductRecommendedProdsSection(props: SectionProps<typeof loader>) {
  return <ProductRecommendedProds {...props} />;
}

export default ProductRecommendedProdsSection;