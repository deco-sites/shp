import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import Image from 'apps/website/components/Image.tsx'

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  url,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            quantity: 1,
            price,
            item_url: url,
            item_name: name,
            discount: discount,
            item_id: productID,
            item_variant: name,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button data-deco="add-to-cart" {...btnProps} class="w-full re1:w-[200px] re4:w-[250px] flex gap-3 bg-[#dd1f26] border-[#dd1f26] hover:border-[#dd1f26] hover:bg-[#dd1f26]">
      <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png'
        width={22} height={20} decoding='auto' fetchPriority='high' loading='eager' 
      />
      <p className='font-bold text-xl text-white capitalize'>Comprar</p>
    </Button>
  );
}