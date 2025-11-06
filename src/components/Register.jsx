import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://employee-management-django-v61v.onrender.com";

function Register() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee((old) => ({ ...old, [name]: value }));
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/register/`, employee)
      .then(() => {
        alert("Registered successfully!");
        reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to register. Please try again.");
      });
  };

  const reset = () => {
    setEmployee({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <form
        onSubmit={register}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={inputHandler}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={inputHandler}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={inputHandler}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
          Register
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
