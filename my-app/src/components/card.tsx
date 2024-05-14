"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/db/models/product";

function formatCurrency(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function Card() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function getData(): Promise<Product[]> {
    const res = await fetch("https://toko-mart.vercel.app/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <div
            key={product.slug}
            className="max-w-sm rounded overflow-hidden shadow-lg"
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
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link href={"/products"}>
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-gray-600"
            style={{ marginBottom: "32px" }} // Memberikan margin bottom
          >
            See All
          </button>
        </Link>
      </div>
    </div>
  );
}
