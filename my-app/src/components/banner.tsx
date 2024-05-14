import React from "react";

export default function Banner() {
  return (
    <div className="p-4">
      <div className="container mx-auto flex items-center justify-center">
        <img
          src="https://i.pinimg.com/originals/35/11/c5/3511c58b431fbe25950bf75cfbacf37d.png"
          alt="Promo Banner"
          className="w-full rounded-md"
          style={{
            borderRadius: "20px",
            marginBottom: "20px",
            marginTop: "80px",
            maxWidth: "1000px",
          }} // Mengatur lebar maksimum menjadi 300px
        />
      </div>
    </div>
  );
}
