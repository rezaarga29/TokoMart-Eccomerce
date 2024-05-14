"use client";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";

export default function WishlistDetail({ productId }: { productId: ObjectId }) {
  const router = useRouter();
  const handleWishlist = async (productId: ObjectId) => {
    try {
      const response = await fetch(
        "https://toko-mart.vercel.app/api/wishlist",
        {
          method: "POST",
          body: JSON.stringify({
            productId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      console.log(data);
      router.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => handleWishlist(productId)}
      className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Add to Wishlist
    </button>
  );
}
