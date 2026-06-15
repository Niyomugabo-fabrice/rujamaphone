import Image from "next/image";
import {
  BadgePercent,
  Calendar,
  CalendarDays,
  Check,
  Headphones,
  IdCard,
  ShieldCheck,
  Smartphone,
  Sun,
  Wallet,
  Handshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: IdCard,
    title: "Visit the Shop",
    text: "Come with your National ID",
  },
  {
    icon: Wallet,
    title: "Pay the First Part",
    text: "Make the initial payment",
  },
  {
    icon: Calendar,
    title: "Choose a Plan",
    text: "Daily, Weekly, or Monthly",
  },
  {
    icon: Handshake,
    title: "Agree on Terms",
    text: "We agree on total amount and schedule",
  },
  {
    icon: Smartphone,
    title: "Take Your Device",
    text: "Enjoy your device and pay the rest",
  },
];

const plans = [
  {
    icon: Sun,
    title: "Daily",
    description: "Small payments every day",
    color: "emerald",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    button: "border-emerald-500 text-emerald-600 hover:bg-emerald-600",
    features: ["Easy daily payments", "Flexible & convenient", "Perfect for tight budgets"],
  },
  {
    icon: CalendarDays,
    title: "Weekly",
    description: "Pay once every week",
    color: "blue",
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-600",
    button: "border-blue-500 text-blue-600 hover:bg-blue-600",
    features: ["Balanced payments", "Manageable weekly plan", "Great for regular earners"],
  },
  {
    icon: Calendar,
    title: "Monthly",
    description: "Pay once every month",
    color: "purple",
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-600",
    button: "border-purple-500 text-purple-600 hover:bg-purple-600",
    features: ["Lower monthly payments", "Plan your budget better", "Best for long-term comfort"],
  },
];

const supportItems = [
  {
    icon: IdCard,
    title: "Bring National ID",
    text: "Required for verification",
  },
  {
    icon: ShieldCheck,
    title: "Secure Process",
    text: "Your data is safe with us",
  },
  {
    icon: BadgePercent,
    title: "Flexible Plans",
    text: "Choose what fits you",
  },
  {
    icon: Headphones,
    title: "Need Help?",
    text: "Our team is here for you",
  },
];

export default function InstallmentPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Pay in Installments
            </h1>
            <p className="mt-2 text-2xl font-medium text-slate-800">
              Simple, <span className="font-bold text-[#d90429]">Flexible & Affordable</span>
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Get the device you want today. Pay in parts over time with a plan that works for you.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <ShieldCheck className="h-16 w-16 shrink-0 text-[#d90429]" strokeWidth={1.8} />
              <div>
                <h2 className="text-xl font-extrabold text-[#b80020]">Trusted & Secure</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Bring your National ID, pay the first part, and choose a payment plan that fits you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-center text-2xl font-extrabold text-slate-950">How It Works</h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="relative text-center">
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute left-[calc(50%+4rem)] top-7 hidden h-9 w-9 text-slate-300 lg:block" />
                )}
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#e60023] text-lg font-bold text-white shadow-sm">
                  {index + 1}
                </div>
                <Icon className="mx-auto mt-4 h-14 w-14 text-[#c9001e]" strokeWidth={1.6} />
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                <p className="mx-auto mt-1 max-w-[190px] text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-950">Choose Your Payment Plan</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {plans.map(({ icon: Icon, title, description, border, bg, text, button, features }) => (
                <div key={title} className={`rounded-xl border ${border} bg-white p-5 shadow-sm`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                      <Icon className={`h-8 w-8 ${text}`} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-extrabold ${text}`}>{title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-600">{description}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                        <Check className={`h-4 w-4 ${text}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`mt-7 w-full rounded-xl border py-2.5 text-sm font-extrabold transition hover:text-white ${button}`}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-950">Example Summary</h2>
            <div className="mt-6 grid grid-cols-[96px_1fr] gap-6">
              <div className="relative h-28 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src="/image/hero1.png"
                  alt="iPhone 14 Pro example device"
                  fill
                  className="object-cover object-[42%_48%]"
                  sizes="96px"
                />
              </div>

              <div className="space-y-3 text-sm">
                {[
                  ["Device", "iPhone 14 Pro"],
                  ["Total Price", "1,500,000 RWF"],
                  ["First Payment", "300,000 RWF", true],
                  ["Remaining", "1,200,000 RWF"],
                  ["Plan", "Weekly"],
                  ["Weekly Payment", "150,000 RWF"],
                  ["Duration", "8 Weeks"],
                ].map(([label, value, red]) => (
                  <div key={label as string} className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">{label}</span>
                    <span className={`text-right font-bold ${red ? "text-[#d90429]" : "text-slate-950"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/250788773754?text=Hi,%20I%20want%20to%20get%20a%20phone%20on%20installment"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center rounded-md bg-[#e60023] px-5 py-3.5 text-base font-extrabold text-white shadow-sm transition hover:bg-[#c9001e]"
            >
              Get Started
            </a>
          </aside>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white px-5 py-5 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-4">
                <Icon className="h-9 w-9 shrink-0 text-[#c9001e]" strokeWidth={1.7} />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-950">{title}</h3>
                  <p className="text-xs leading-5 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
