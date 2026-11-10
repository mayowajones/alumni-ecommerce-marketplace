import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-[0_30px_70px_rgba(17,32,24,0.08)] md:grid-cols-2">
        <div className="hidden bg-[#112018] p-10 text-cream md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Community</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight">Welcome back.</h1>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm text-cream/75">Discover trusted finds shared by your alumni network.</p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-dark">Sign in</p>
          <h2 className="mt-3 text-3xl font-bold text-forest-dark">Access your account</h2>

          {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-forest-dark/70">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-forest/15 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold"
              />
            </div>

            <button type="submit" className="w-full rounded-xl bg-gold px-6 py-3.5 text-base font-bold text-forest-dark transition hover:bg-[#e9bd6f]">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-forest-dark/60">
            No account? <Link to="/register" className="font-semibold text-gold-dark">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
