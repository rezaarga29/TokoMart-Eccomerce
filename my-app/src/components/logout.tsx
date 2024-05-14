"use client";
import { logout } from "@/actions/logout";

export default function ButtonLogout() {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => {
          logout();
        }}
        className="text-white focus:outline-none"
      >
        Log Out
      </button>
    </div>
  );
}
