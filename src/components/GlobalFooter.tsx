import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/accessories", label: "Accessories" },
  { href: "/installment-plans", label: "Installment Plans" },
  { href: "/phone-upgrades", label: "Phone Upgrades" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function GlobalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[1.5fr_1fr]"><div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Rujama Phones Shop
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Trusted phone shop in Kigali, Rwanda offering smartphones, accessories, installment plans, and phone upgrades.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rujama Phones Shop. All rights reserved.</p>
          <p>Need help? Visit the Contact page or message us on WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
