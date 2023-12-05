import { useWishlist } from "deco-sites/std/packs/vtex/hooks/useWishlist.ts";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import { useEffect } from 'preact/hooks'

const WishlistTeste=()=>{
  const { user } = useUser();
  const { loading, addItem, removeItem, getItem, wishlist } = useWishlist()

  useEffect(()=>{
    console.log(wishlist)
  },[])

  return null
}

export default WishlistTeste