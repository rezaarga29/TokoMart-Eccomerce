"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import { Product } from "@/db/models/product";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://toko-mart.vercel.app/api/products", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => setProducts([]);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products.slice(0, 4));
      setHasMore(true);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered.slice(0, 4));
    setHasMore(true);
  }, [searchTerm, products]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setFilteredProducts((prevProducts) =>
        prevProducts.concat(
          products.slice(prevProducts.length, prevProducts.length + 4)
        )
      );
    }, 500);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered.slice(0, 4));
    setHasMore(true);
  };

  return (
    <>
      <div className="text-center">
        <div className="flex items-center justify-end">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 rounded-l-full border outline-none focus:border-green-500 mr-2 mb-10"
            placeholder="Search..."
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-r-full flex items-center mr-20 mb-10"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-10">All Products</h1>
      </div>

      {loading && products.length === 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div>
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
        </div>
      )}

      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! Kamu telah melihat semua produk!</b>
          </p>
        }
      >
        <ProductCard products={filteredProducts} />
      </InfiniteScroll>
    </>
  );
}
