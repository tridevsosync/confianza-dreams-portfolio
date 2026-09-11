import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sun, Moon } from "lucide-react";

import { useSite } from "../context/SiteContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/packages", label: "Packages" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

/** Sticky glass navigation that turns opaque on scroll. */
export default function Navbar() {
  const { settings, theme, setTheme } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card border-b py-2" : "border-b border-transparent py-4"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Confianza home">
          <span className="gradient-royal grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg text-primary-foreground shadow-luxe">
            C
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight text-ink sm:text-lg">
              Confianza
            </span>
            <span className="block truncate text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
              Events &amp; Entertainment
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-7 xl:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-foreground/80 transition hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Toggle luxury theme"
            onClick={() => setTheme(theme === "luxury" ? "light" : "luxury")}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
          >
            {theme === "luxury" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            to="/contact"
            className="btn-luxe gradient-royal hidden text-primary-foreground lg:inline-flex"
          >
            Book Consultation
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="animate-slide-up glass-card mx-4 mt-3 rounded-3xl p-5 xl:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block rounded-xl px-3 py-2.5 text-sm uppercase tracking-[0.14em] text-foreground/85 transition hover:bg-accent hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-luxe gradient-royal mt-4 w-full text-primary-foreground"
          >
            Book Consultation
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {settings.brand.tagline}
          </p>
        </div>
      )}
    </header>
  );
}
