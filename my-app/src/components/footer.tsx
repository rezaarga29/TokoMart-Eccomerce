"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-600 py-4">
      <div className="container mx-auto flex justify-center">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-white text-sm">
            &quot;Remember TokoMart for all your online shopping needs,
            don&apos;t think of anything else.&quot;
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-white text-sm">Connect with us:</p>
            <Link href={"/"}>
              <FaInstagram className="text-white text-2xl" />
            </Link>
            <Link href={"/"}>
              <FaFacebook className="text-white text-2xl" />
            </Link>
            <Link href={"/"}>
              <FaEnvelope className="text-white text-2xl" />
            </Link>
            <Link href={"/"}>
              <FaPhone className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
