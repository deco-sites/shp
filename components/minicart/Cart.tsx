import { lazy, Suspense } from "preact/compat";
import {IS_BROWSER} from '$fresh/runtime.ts'

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));

export interface Props {
  platform:string
  pix:number
}

function Cart({ platform='vtex', pix }: Props) {
  if(!IS_BROWSER){return <></>}
  if (platform === "vtex") {
    return (
      <Suspense fallback={<span class="loading loading-ring" />}>
        <CartVTEX pix={pix}/>
      </Suspense>
    )
  }

  return null;
}

export default Cart;