import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Image from 'deco-sites/std/components/Image.tsx'
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class="w-full re1:w-[250px] flex gap-3 bg-[#dd1f26] border-[#dd1f26] hover:border-[#dd1f26] hover:bg-[#dd1f26]">
      <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png'
        width={22} height={20} decoding='auto' fetchPriority='high' loading='eager' 
      />
      <p className='font-bold text-xl text-white capitalize'>Comprar</p>
    </Button>
  );
}

export default AddToCartButton;
