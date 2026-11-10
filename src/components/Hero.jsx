import React from "react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="bg-[#f5f5f5] py-3 sm:py-4">
    <div className="mx-auto max-w-[1300px] px-4">
      <div
        className="relative overflow-hidden rounded-2xl border border-[#0d372d]/10 shadow-[0_14px_28px_rgba(13,55,45,0.1)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10,54,45,0.94) 0%, rgba(10,54,45,0.86) 48%, rgba(10,54,45,0.18) 100%), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center 42%",
        }}
      >
        <div className="flex min-h-[290px] items-center px-6 py-8 sm:min-h-[330px] sm:px-10">
          <div className="flex max-w-[600px] flex-col justify-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#f5c76a]">
              The Command Ojo '98 marketplace
            </p>

            <h1 className="max-w-[550px] font-serif text-4xl font-bold leading-[1.02] text-[#f7efe3] sm:text-5xl">
              Good finds.
              <br />
              <span className="text-[#f5c76a]">Closer connections.</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#f7efe3]/90 sm:text-base">
              Shop quality finds shared by the people in your alumni community.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg bg-[#f5c76a] px-6 py-3 text-sm font-bold text-[#0d372d] shadow-[0_12px_24px_rgba(214,160,77,0.3)] transition hover:bg-white"
            >
              Shop the marketplace
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
