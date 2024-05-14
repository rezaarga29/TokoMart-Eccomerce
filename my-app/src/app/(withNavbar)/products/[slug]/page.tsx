"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/db/models/product";
import WishlistDetail from "@/components/wishlistDetail";

function formatCurrency(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function DetailProduct() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getData()
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function getData(): Promise<Product | null> {
    const path = window.location.pathname;

    const pathParts = path.split("/");

    const slug = pathParts[pathParts.length - 1];

    const res = await fetch(`https://toko-mart.vercel.app/api/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.708 4.44l1.48 1.48A6 6 0 104 14.292v-2.001zm5.121 1.457A8.017 8.017 0 0116.56 20.29l1.479-1.48a9.963 9.963 0 000-14.019l-1.479-1.48a8.017 8.017 0 01-7.438 13.289l1.48 1.48zm6.67-2.414l1.48-1.48a8.004 8.004 0 01-5.25-12.848l-1.48 1.48a6 6 0 108.25 8.848z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={product.images !== undefined ? product.images[0] : "N/A"}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        {/* Details */}
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-700 text-lg mb-2">{product.description}</p>
          <p className="text-gray-700 text-lg mb-4">Tags:</p>
          <div className="flex flex-wrap mb-4">
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
          <div className="flex items-center justify-between">
            <span className="text-2xl text-gray-900 font-bold">
              Price: {formatCurrency(product.price || 0)}
            </span>
            {/* Add to Wishlist Button */}
            <WishlistDetail productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
