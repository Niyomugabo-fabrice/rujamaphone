import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Calculator,
  Check,
  Clock,
  HandCoins,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Store,
} from "lucide-react";

const processCards = [
  {
    image: "/image/rujamashop.jpeg",
    icon: Store,
    title: "Visit our shop",
    text: "Bring your current phone to Rujama Phones Shop in Kigali so our team can inspect it properly.",
  },
  {
    image: "/image/hero2.png",
    icon: Calculator,
    title: "Get a fair value",
    text: "We check model, storage, screen, battery, body condition, and market value before giving a clear offer.",
  },
  {
    image: "/image/hero1.png",
    icon: RefreshCw,
    title: "Top up and upgrade",
    text: "Choose a better device, pay only the difference, and leave with your upgraded phone the same day.",
  },
];

const checkItems = [
  { icon: Smartphone, title: "Phone condition", text: "Screen, body, camera, buttons, charging, and network are checked." },
  { icon: BatteryCharging, title: "Battery health", text: "A stronger battery gives your current phone a better trade value." },
  { icon: ShieldCheck, title: "Ownership check", text: "Bring your ID and make sure the phone is unlocked and ready to verify." },
  { icon: BadgeCheck, title: "Final offer", text: "You see the valuation before deciding. No pressure and no hidden fees." },
];

const upgradeSteps = [
  { icon: Calculator, title: "Value old phone" },
  { icon: HandCoins, title: "Top up balance" },
  { icon: Smartphone, title: "Take new device" },
];

const brands = ["iPhone", "Samsung", "Tecno", "Infinix", "Xiaomi", "Itel", "OPPO", "Huawei", "Realme", "Nokia"];

export default function UpgradePage() {
  return (
    <div className="bg-white text-slate-950">
      <section className="relative overflow-hidden bg-white text-slate-950">
        <div className="absolute inset-0">
          <Image
            src="/image/rujamashop.jpeg"
            alt="Rujama Phones Shop entrance"
            fill
            priority
            className="object-cover opacity-10"
            sizes="100vw"
          />
         
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
           {/* <h1 className="bg-white/10">welcome</h1> */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#820210]">
              <RefreshCw className="h-4 w-4" />
              Phone upgrade service
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Bring your old phone. Leave with a better one.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              We value your current device, subtract it from the price of your next phone,
              and you only top up the difference. Simple, visual, and handled in-store.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/250788773754?text=Hi,%20I%20want%20to%20upgrade%20my%20phone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#820210] px-6 py-3 font-bold text-white transition hover:bg-[#6b0110]"
              >
                <MessageCircle className="h-5 w-5" />
                Start on WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 font-bold text-[#820210] transition hover:bg-red-50"
              >
                Browse devices
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-4 text-slate-950 shadow-2xl">
            <div className="relative h-[360px] overflow-hidden rounded-xl bg-white">
              <Image
                src="/image/upgrade.jpeg"
                alt="New phone available for upgrade"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              {upgradeSteps.map(({ icon: Icon, title }) => (
                <div key={title} className="rounded-lg bg-red-50 px-3 py-3">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#e60023] text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



  

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-widest text-[#820210]">What we check</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
            Clear valuation before you decide
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {checkItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#820210]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-950">Example top-up</h2>
          <div className="mt-6 space-y-4 rounded-xl bg-white p-5 text-sm shadow-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Current phone value</span>
              <span className="font-bold text-slate-950">350,000 RWF</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">New device price</span>
              <span className="font-bold text-slate-950">900,000 RWF</span>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between gap-4">
                <span className="font-bold text-slate-950">You top up</span>
                <span className="text-xl font-extrabold text-[#e60023]">550,000 RWF</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Final prices depend on the exact device model, storage, condition, and available stock.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-4">
            <Clock className="h-6 w-6 text-[#820210]" />
            <p className="text-sm font-bold text-slate-800">Most upgrades can be completed in one shop visit.</p>
          </div>
        </aside>
      </section>

      <section className="border-y border-red-100 bg-[#820210] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-extrabold uppercase tracking-widest text-white/70">Accepted devices</p>
          <h2 className="mt-3 text-3xl font-extrabold">We trade major phone brands</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <span key={brand} className="rounded-xl bg-white/10 px-5 py-3 text-sm font-bold ring-1 ring-white/15">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-950">Ready to upgrade?</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Send us your current phone model and the device you want. We will guide you on the next step before you visit.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/250788773754?text=Hi,%20I%20want%20to%20upgrade%20my%20phone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#820210] px-7 py-3.5 font-bold text-white transition hover:bg-[#6b0110]"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp us
          </a>
          <a
            href="tel:+250788773754"
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-7 py-3.5 font-bold text-[#820210] transition hover:bg-red-50"
          >
            <Phone className="h-5 w-5" />
            Call now
          </a>
        </div>
      </section>
    </div>
  );
}
