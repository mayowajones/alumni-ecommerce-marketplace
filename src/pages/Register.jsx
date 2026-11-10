import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", graduationYear: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-[0_30px_70px_rgba(17,32,24,0.08)] md:grid-cols-2">
        <div className="hidden bg-[#112018] p-10 text-cream md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Join us</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight">Build your alumni network.</h1>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm text-cream/75">Sell trusted items, discover great deals, and reconnect with your community.</p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-dark">Create account</p>
          <h2 className="mt-3 text-3xl font-bold text-forest-dark">Join the marketplace</h2>

          {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Full name</label>
              <input name="name" placeholder="Your full name" required onChange={handleChange}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Email address</label>
              <input name="email" type="email" placeholder="you@example.com" required onChange={handleChange}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Graduation year</label>
              <input name="graduationYear" type="number" placeholder="2005" onChange={handleChange}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Password</label>
              <input name="password" type="password" placeholder="At least 6 characters" required minLength={6} onChange={handleChange}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold" />
            </div>

            <button type="submit" className="w-full rounded-xl bg-gold px-6 py-3.5 text-base font-bold text-forest-dark transition hover:bg-[#e9bd6f]">
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-forest-dark/60">
            Already registered? <Link to="/login" className="font-semibold text-gold-dark">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
