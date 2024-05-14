import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import NotificationError from "@/components/NotificationError";
import { Suspense } from "react";

export default function Login() {
  async function login(formData: FormData) {
    "use server";
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("https://toko-mart.vercel.app/api/login", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      const data = await response.json();
      redirect(`/login?error=${data.message}`);
    }

    const data = (await response.json()) as {
      message: string;
      access_token: string;
    };

    cookies().set("Authorization", `Bearer ${data.access_token}`);

    redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold mb-8">Login</h2>
          <form action={login} className="space-y-6">
            <NotificationError />
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="text-green-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
