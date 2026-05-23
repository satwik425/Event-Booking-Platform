import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, Ticket } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
const Register = ({setIsLoggedIn}) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${API_URL}/api/user/register`,
        form,
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      navigate("/events");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center px-6 py-16">

      {/* CARD */}
      <div
        className="
          w-full max-w-md
          bg-[#1a1a1d]
          border border-white/10
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >

        {/* TOP GRADIENT BANNER */}
        <div className="h-2 bg-gradient-to-r from-white/30 via-white/10 to-white/5" />

        <div className="p-8">

          {/* LOGO / BRAND */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white text-black p-2 rounded-xl">
              <Ticket size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">EventBook</span>
          </div>

          {/* HEADING */}
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Create account
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Join to discover and book amazing events.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="
                    w-full
                    bg-[#0f0f11]
                    border border-white/10
                    rounded-xl
                    pl-10 pr-4 py-3
                    text-sm text-white
                    placeholder-gray-600
                    focus:outline-none focus:border-white/40
                    transition
                  "
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="
                    w-full
                    bg-[#0f0f11]
                    border border-white/10
                    rounded-xl
                    pl-10 pr-4 py-3
                    text-sm text-white
                    placeholder-gray-600
                    focus:outline-none focus:border-white/40
                    transition
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="
                    w-full
                    bg-[#0f0f11]
                    border border-white/10
                    rounded-xl
                    pl-10 pr-12 py-3
                    text-sm text-white
                    placeholder-gray-600
                    focus:outline-none focus:border-white/40
                    transition
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-white text-black
                font-semibold
                py-3 rounded-xl
                hover:bg-gray-200
                hover:scale-[1.02]
                active:scale-100
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                mt-2
              "
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">already have an account?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* LOGIN LINK */}
          <Link
            to="/login"
            className="
              block w-full text-center
              border border-white/10
              text-gray-300
              font-medium text-sm
              py-3 rounded-xl
              hover:border-white/30 hover:text-white
              transition
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
