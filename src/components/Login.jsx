import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const BASE_URL = "https://employee-management-django-v61v.onrender.com";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginForm((old) => ({ ...old, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login/`, loginForm);
      console.log(response.data);
      if (response.data.success || response.data.token) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials — check your email/password.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error: please check backend or network.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={inputHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={inputHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300">
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <Footer />
      </div>
    </div>
  );
}

export default Login;
