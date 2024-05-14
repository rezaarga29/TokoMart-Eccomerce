import Link from "next/link";
import Wishlist from "./wishlist";
import { Product } from "@/db/models/product";

function formatCurrency(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface ProductCardProps {
  products: Product[];
}

export default function ProductCard({ products }: ProductCardProps) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.slug}
            className="max-w-sm rounded overflow-hidden shadow-lg relative"
          >
            <Link href={`/products/${product.slug}`}>
              {/* Tambahkan tautan ke detail produk */}
              <img
                src={product.images !== undefined ? product.images[0] : "N/A"}
                alt={product.name}
                className="w-full cursor-pointer"
              />
            </Link>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">
                Price: {formatCurrency(product.price || 0)}
              </p>
              <p className="text-gray-700 text-base">Desc: {product.excerpt}</p>
              <div className="flex flex-wrap">
                {product.tags &&
                  product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
            <Wishlist productId={product._id} />
          </div>
        ))}
      </div>
    </div>
  );
}
