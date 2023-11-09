import { lazy } from "preact/compat";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));
// const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));
// const CartWake = lazy(() => import("./wake/Cart.tsx"));
// const CartLinx = lazy(() => import("./linx/Cart.tsx"));
// const CartShopify = lazy(() => import("./shopify/Cart.tsx"));

export interface Props {
  // platform: ReturnType<typeof usePlatform>;
  platform:string
}

function Cart({ platform='vtex' }: Props) {
  if (platform === "vtex") {
    return <CartVTEX />;
  }

  // if (platform === "vnda") {
  //   return <CartVNDA />;
  // }

  // if (platform === "wake") {
  //   return <CartWake />;
  // }
  
  // if (platform === "linx") {
  //   return <CartLinx />;
  // }

  // if (platform === "shopify") {
  //   return <CartShopify />;
  // }

  return null;
}

export default Cart;