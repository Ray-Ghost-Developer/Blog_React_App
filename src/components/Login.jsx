import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      toast.success("Welcome!", { position: "top-center" });
      window.location.href = '/profile'
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg-login.jpg')"
      }}
    >
      <form
        onSubmit={onHandleSubmit}
        className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4 relative translate-x-95"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-4">Log In</h2>

        <div>
          <label className="block text-white font-medium mb-1">Email</label>
          <div className="flex items-center bg-white/30 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <EnvelopeIcon className="h-5 w-5 text-white mr-2" />
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-white outline-none placeholder-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-1">Password</label>
          <div className="flex items-center bg-white/30 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <LockClosedIcon className="h-5 w-5 text-white mr-2" />
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-white outline-none placeholder-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600/70 hover:bg-blue-700/70 text-white py-2 rounded-xl font-semibold transition-all duration-300"
        >
          Log In
        </button>

        <p className="text-center text-white/80 mt-2">
          New User?{" "}
          <Link to='/Register' className="text-blue-200 hover:underline font-medium">Register Here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
