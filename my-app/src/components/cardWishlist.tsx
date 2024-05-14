"use client";
import { useEffect, useState } from "react";
import RemoveWishlist from "./removeWishlist";
import { Wishlist } from "@/db/models/wishlist";
import Link from "next/link";
import { ObjectId } from "mongodb";

function formatCurrency(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CardWishlist() {
  const [products, setProducts] = useState<Wishlist[]>([]);

  useEffect(() => {
    getData()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function getData(): Promise<Wishlist[]> {
    const res = await fetch("https://toko-mart.vercel.app/api/wishlist", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  if (products.length === 0) {
    // Jika produk kosong, tampilkan pesan bahwa Wishlist kosong
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Wishlist Kamu Kosong</p>
          {/* Tambahkan link kembali ke halaman utama atau halaman produk */}
          <Link href="/products">
            <p className="text-blue-500 underline">
              Kembali ke Halaman Products
            </p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item.Product?.slug}
            className="max-w-sm rounded overflow-hidden shadow-lg relative"
          >
            <Link href={`/products/${item.Product?.slug}`}>
              <img
                src={item.Product?.thumbnail}
                alt={item.Product?.name}
                className="w-full"
              />
            </Link>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.Product?.name}</div>
              <p className="text-gray-700 text-base">
                Price: {formatCurrency(item.Product?.price || 0)}
              </p>
              <p className="text-gray-700 text-base">
                Desc: {item.Product?.excerpt}
              </p>
            </div>
            <RemoveWishlist productId={item._id as string | ObjectId} />
          </div>
        ))}
      </div>
    </div>
  );
}
