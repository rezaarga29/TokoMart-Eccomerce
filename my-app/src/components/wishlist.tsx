"use client";
import { ObjectId } from "mongodb";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Wishlist({ productId }: { productId: ObjectId }) {
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
      className={`absolute bottom-2 right-2 text-gray-500  hover:text-red-700`}
      onClick={() => handleWishlist(productId)}
    >
      <FaHeart size={24} />
    </button>
  );
}
