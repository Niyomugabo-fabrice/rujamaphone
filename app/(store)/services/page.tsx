import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Store,
  Wallet,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Phone Services",
  description:
    "Explore Rujama Phones Shop services in Kigali, including phone upgrades, installment payment plans, device support, and in-store guidance.",
  path: "/services",
});

const services = [
  {
    title: "Upgrade Your Phone",
    href: "/upgrade",
    image: "/image/upgrade.jpeg",
    
    action: "View Upgrade Service",
    highlights: [
      { icon: BadgeCheck, label: "Instant valuation" },
      { icon: RefreshCw, label: "Same-day exchange" },
      { icon: Smartphone, label: "Major brands accepted" },
    ],
  },
  {
    title: "Pay in Installments",
    href: "/installment",
    image: "/image/parts.jpeg",
   
    action: "View Installment Plans",
    highlights: [
      { icon: CalendarDays, label: "Flexible payment terms" },
      { icon: CreditCard, label: "Clear first payment" },
      { icon: ShieldCheck, label: "Support from our team" },
    ],
  },
];

const process = [
  { icon: Store, title: "Visit the shop", text: "Come to Rujama Phones Shop in Kigali with your ID and current phone if upgrading." },
  { icon: Smartphone, title: "Choose your device", text: "Our team helps you compare phones, accessories, storage, and condition." },
  { icon: CreditCard, title: "Pick your option", text: "Upgrade with a top-up or choose an installment plan that fits your budget." },
  { icon: BadgeCheck, title: "Leave connected", text: "Walk out with your device, warranty guidance, and after-sale support." },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-red-100 bg-white text-slate-950">
        <div className="absolute inset-0">
          <Image
            src="/image/rujamashop.jpeg"
            alt="Rujama Phones Shop service counter"
            fill
            priority
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-[#820210]">
              <ShieldCheck className="h-4 w-4" />
              Trusted phone services in Kigali
            </div>
            <h1 className="mt-6 text-xl md:text-3xl font-bold leading-tight">
              Upgrade, Parts payment, and phone support made simple.
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-slate-600">
              Rujama Phones Shop helps clients get the device they need with clear service options,
              fair guidance, and flexible ways to pay.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/upgrade"
                className="inline-flex items-center gap-2 rounded-xl bg-[#820210] px-6 py-3 font-semibold text-white transition hover:bg-[#6b0110]"
              >
                Upgrade phone
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/installment"
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 font-semibold text-[#820210] transition hover:bg-red-50"
              >
                Installment plans
                <CalendarDays className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#820210]">Our services</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-950">
            Two easy ways to get your next phone
          </h2>
          <p className="mt-3 text-gray-600 leading-7">
            Choose the service that matches your situation. Each service page explains the steps,
            requirements, and how to get started.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {services.map(({ title, href, image,  action, highlights }) => (
            <Link
              key={title}
              href={href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-72">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {highlights.map(({ icon: HighlightIcon, label }) => (
                    <div key={label} className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700">
                      <HighlightIcon className="mb-2 h-4 w-4 text-[#820210]" />
                      {label}
                    </div>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-[#820210]">
                  {action}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#820210]">How we help</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">A clear service process</h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#820210] px-5 py-3 font-semibold text-white transition hover:bg-[#6b0110]"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {process.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFE4E8] text-[#820210]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
