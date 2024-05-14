import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
  async function register(formData: FormData) {
    "use server";
    const rawFormData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("https://toko-mart.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      const data = await response.json();
      redirect(`/register?error=${data.message}`);
      // throw new Error("Failed to add user");
    }

    const data = await response.json();
    console.log(data);

    redirect("/login");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url('https://assets.tokopedia.net/assets-tokopedia-lite/v2/icarus/kratos/e2fd1dea.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
        <form action={register} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link href={"/login"} className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
