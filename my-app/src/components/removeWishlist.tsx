import { ObjectId } from "mongodb";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Wishlist } from "@/db/models/wishlist";

export default function RemoveWishlist({
  productId,
}: {
  productId: ObjectId | string;
}) {
  const handleRemoveWishlist = async (productId: ObjectId | string) => {
    try {
      console.log(productId);
      const response = await fetch(
        "https://toko-mart.vercel.app/api/wishlist",
        {
          method: "DELETE",
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
      if (response.ok) {
        window.location.reload(); // Reload halaman jika wishlist berhasil dihapus
      } else {
        console.error("Failed to delete wishlist:", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={`absolute bottom-2 right-2 text-gray-500  hover:text-gray-700`}
      onClick={() => handleRemoveWishlist(productId)}
    >
      <FaTrash size={24} />
    </button>
  );
}
