export default function About() {
  return (
    <section className="bg-white text-gray-900 py-2 lg:py-5">
      <div className="mx-auto max-w-screen-xl px-1 lg:flex lg:h-screen lg:items-center rounded-lg shadow-xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            TokoMart
            <span className="sm:block">
              Quality, Affordable, Fast, and Reliable.{" "}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            &quot;Being the ultimate destination for all online shopping needs,
            providing an enjoyable, secure, and seamless shopping experience for
            all our customers. We are committed to delivering a wide range of
            high-quality products with excellent customer service, thus adding
            value to their lives.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
