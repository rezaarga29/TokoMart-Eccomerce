import Link from "next/link";
import { cookies } from "next/headers";
import ButtonLogout from "./logout";
import Image from "next/image";

export default function HomeNavbar() {
  const auth = cookies().get("Authorization");

  return (
    <nav className="bg-green-600 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center mr-4">
          <Link href="/">
            <Image
              src="/TokoMart-5-11-2024.png"
              alt="TokoMart"
              width={200}
              height={100}
            />
          </Link>
        </div>
        {/* Menu Home, Products, Wishlist */}
        <div className="flex items-center space-x-4 flex-grow">
          <div className="flex items-center space-x-4">
            <Link href={"/"}>
              <span className="text-white hover:text-gray-200 cursor-pointer">
                Home
              </span>
            </Link>
            <Link href={"/products"}>
              <span className="text-white hover:text-gray-200 cursor-pointer">
                Products
              </span>
            </Link>
            <Link href={"/wishlist"}>
              <span className="text-white hover:text-gray-200 cursor-pointer">
                Wishlist
              </span>
            </Link>
          </div>
        </div>
        {/* Input Pencarian dan Menu Log Out */}
        <div className="flex items-center space-x-4">
          {auth?.value ? (
            <ButtonLogout />
          ) : (
            <div className="flex items-center space-x-4">
              <Link href={"/login"}>
                <button className="text-white focus:outline-none">
                  Log In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
