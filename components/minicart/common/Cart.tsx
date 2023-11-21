import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import { DescontoPIX } from "../../../FunctionsSHP/DescontoPix.ts";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const productsPricePix:number[]|undefined=items.map(item=>DescontoPIX(item.price.sale, 12))
  const totalPix=productsPricePix?.reduce((acc, item)=>acc+item,0)

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden h-[90vh]"
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl text-secondary">Sua sacola está vazia</span>
            <Button
              class="btn-outline btn-primary"
              onClick={() => {(document.querySelector('#close-minicart') as HTMLElement).click()}}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            {/* <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div> */}

            {/* Cart Items */}
            <ul
              role="list"
              class="px-2 flex-grow overflow-y-auto flex flex-col h-full max-h-[66vh] scrollbar-shp"
            >
              {items.map((item, index) => (
                <li key={index} className='py-4 border-y border-y-[#292929]'>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="border-t border-base-200 py-2 flex flex-col">
                <div class="w-full flex justify-between px-4 text-sm">
                  <span>Subtotal</span>
                  <span class="px-4">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                {/* <Coupon onAddCoupon={onAddCoupon} coupon={coupon} /> */}
              </div>

              {/* Total */}
              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4 text-secondary">
                <div class="flex justify-between items-center w-full">
                  <span>Total</span>
                  <span class="font-medium text-xl">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p className='block'>
                    <span>Total no PIX</span>
                    <span class="flex justify-between items-center text-sm">
                      (Economize: {formatPrice((total-totalPix), currency, locale)})
                    </span>
                  </p>
                  <span class="font-bold text-xl">
                    {totalPix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
                  </span>
                </div>
                <span class="text-sm text-neutral-content">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div>

              <div class="p-4">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="w-full bg-primary hover:bg-primary text-secondary border-none outline-none"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          // discounts tem sinal negativo ent soma-se ao total
                          value: total + discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Ir para Checkout
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;