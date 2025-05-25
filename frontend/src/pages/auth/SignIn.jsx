import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual auth logic
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="hidden md:flex md:w-5/12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-pink-500 to-blue-500 opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] mix-blend-overlay bg-cover bg-center"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <div>
            <p className="uppercase text-xs tracking-wider">A WISE QUOTE</p>
          </div>
          <div className="mb-16">
            <h1 className="text-6xl font-bold mb-2 leading-tight">
              Get
              <br />
              Everything
              <br />
              You Want
            </h1>
            <p className="text-sm mt-6">
              You can get everything you want if you work hard,
              <br />
              trust the process, and stick to the plan.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-3">Welcome Back</h2>
          <p className="text-gray-600 mb-8">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <a href="#forgot-password" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Sign In
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full mt-4 border border-gray-200 py-3 rounded-md flex items-center justify-center hover:bg-gray-50 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5 mr-2"
              >
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.344 4.337-17.694 10.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Sign In with Google
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
