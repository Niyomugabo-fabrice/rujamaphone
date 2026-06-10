"use client";

import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Clock,
  Award,
  Phone,
  MessageCircle,
  ChevronRight,
  Smartphone,
  Info,
} from "lucide-react";

// ─── Brand data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: 1,
    emoji: "📱",
    title: "Bring your phone",
    desc: "Visit our shop in Kigali with your current device in working condition. We accept all major brands.",
  },
  {
    num: 2,
    emoji: "💰",
    title: "Get instant valuation",
    desc: "Our team assesses your phone on the spot and gives you a fair, transparent trade-in price.",
  },
  {
    num: 3,
    emoji: "🎉",
    title: "Top up & upgrade",
    desc: "Pay only the difference between your trade-in value and your chosen new device. Done!",
  },
];

const BRANDS = [
  { name: "Apple iPhone", hot: true },
  { name: "Samsung", hot: true },
  { name: "Tecno", hot: false },
  { name: "Infinix", hot: false },
  { name: "Xiaomi", hot: false },
  { name: "Itel", hot: false },
  { name: "Huawei", hot: false },
  { name: "OPPO", hot: false },
  { name: "Realme", hot: false },
  { name: "Nokia", hot: false },
  { name: "OnePlus", hot: false },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Fair & transparent pricing",
    desc: "No hidden fees. You see the valuation before you decide.",
  },
  {
    icon: Clock,
    title: "Same-day upgrade",
    desc: "Walk in with your old phone, walk out with a new one — same visit.",
  },
  {
    icon: Award,
    title: "Warranty included",
    desc: "Every device sold comes with a warranty for your peace of mind.",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function TopUpService() {
  return (
    <div className="bg-[#FFE4E8] min-h-screen font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-red-100 px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-[#FFE4E8] border border-red-200 text-[#820210] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest mb-7">
              <span className="relative flex items-center justify-center w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#820210] opacity-40" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#820210]" />
              </span>
              Phone Exchange Service
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.1] mb-5">
              Upgrade Your{" "}
              <span className="text-[#820210]">Device Today</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Bring your current phone, get a fair valuation, top up the
              difference, and walk out with a brand-new device — same day,
              no hassle.
            </p>

            <a
              href="https://wa.me/250788773754?text=Hi,%20I%20want%20to%20learn%20more%20about%20the%20phone%20exchange%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#820210] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#6b0110] transition-colors shadow-lg shadow-red-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right — exchange card */}
          <div className="bg-[#FFE4E8] rounded-2xl p-7 border border-red-100">

            {/* Device swap row */}
            <div className="flex items-center justify-between gap-3 mb-6">
              {/* Old phone */}
              <div className="text-center flex-1">
                <div className="w-20 h-20 bg-white border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Smartphone className="w-9 h-9 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 font-medium">Your phone</p>
              </div>

              {/* Swap icon */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full bg-white border border-red-200 flex items-center justify-center shadow-sm">
                  <RefreshCw className="w-5 h-5 text-[#820210] animate-spin [animation-duration:4s]" />
                </div>
                <span className="text-[9px] font-semibold text-[#820210] tracking-widest uppercase">
                  Exchange
                </span>
              </div>

              {/* New phone */}
              <div className="text-center flex-1">
                <div className="w-20 h-20 bg-[#820210] rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-red-900/30">
                  <Smartphone className="w-9 h-9 text-white" />
                </div>
                <p className="text-xs text-[#820210] font-semibold">New device</p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-white border border-red-100 rounded-xl p-4 space-y-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Your phone value</span>
                <span className="font-medium text-gray-700">
                  XXX,XXX <span className="text-xs text-gray-400">RWF</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">New device price</span>
                <span className="font-medium text-gray-700">
                  XXX,XXX <span className="text-xs text-gray-400">RWF</span>
                </span>
              </div>
              <hr className="border-red-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">You pay</span>
                <span className="text-xl font-bold text-[#820210]">
                  XXX,XXX{" "}
                  <span className="text-xs font-medium text-gray-400">RWF</span>
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="flex items-start gap-1.5 text-[11px] text-gray-500 mt-3 leading-relaxed">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              Exact valuation done in-store. Prices vary by model &amp; condition.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#820210] mb-2">
          How it works
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Three simple steps
        </h2>
        <p className="text-gray-500 mb-10">
          From your old phone to a new device in under an hour.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative bg-white rounded-2xl p-7 border border-red-100 shadow-sm">
              {/* Step number */}
              <div className="w-10 h-10 rounded-full bg-[#820210] text-white flex items-center justify-center font-bold text-lg mb-4">
                {step.num}
              </div>

              <div className="text-3xl mb-3">{step.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>

              {/* Arrow connector (hidden on last) */}
              {i < STEPS.length - 1 && (
                <ChevronRight className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCEPTED BRANDS ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border border-red-100 px-8 py-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#820210] mb-2">
              Accepted devices
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              We buy &amp; trade all major brands
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Good condition phones accepted — any network, any storage size.
            </p>
          </div>

          {/* Hot picks row */}
          <div className="flex flex-wrap gap-3 justify-center mb-5">
            {BRANDS.filter((b) => b.hot).map((brand) => (
              <span
                key={brand.name}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#820210] text-white shadow-md shadow-red-900/20"
              >
                <span className="w-2 h-2 rounded-full bg-red-300" />
                {brand.name}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-red-100" />
            <span className="text-xs text-gray-400 font-medium">and many more</span>
            <div className="flex-1 h-px bg-red-100" />
          </div>

          {/* Other brands */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {BRANDS.filter((b) => !b.hot).map((brand) => (
              <span
                key={brand.name}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-red-100 bg-[#FFE4E8] text-[#820210]"
              >
                {brand.name}
              </span>
            ))}
            <span className="px-4 py-2 rounded-xl text-xs font-semibold border border-dashed border-red-200 bg-transparent text-gray-400">
              + more brands
            </span>
          </div>
        </div>
      </section>

      {/* ── WHY RUJAMA ────────────────────────────────────────────────────── */}
      <section className="bg-[#820210] px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Why upgrade with Rujama Phones?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-red-300" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Ready to upgrade?
        </h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          Come visit us in Kigali or send us a WhatsApp message — we'll guide
          you through the process and answer any questions.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/250788773754?text=Hi,%20I%20want%20to%20upgrade%20my%20phone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#820210] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#6b0110] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us
          </a>
          <a
            href="tel:+250788773754"
            className="inline-flex items-center gap-2 bg-white text-[#820210] border border-red-200 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call now
          </a>
        </div>
      </section>

    </div>
  );
}