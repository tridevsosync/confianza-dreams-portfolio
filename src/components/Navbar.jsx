import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

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

/** Sticky luxury glass navigation with crystal-clear contrast across all scroll positions. */
export default function Navbar() {
  const { settings, theme, setTheme } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkTheme = theme === "luxury";

  // Dynamic contrast classes based on scroll state & theme
  const headerClass = scrolled
    ? isDarkTheme
      ? "bg-ink/95 backdrop-blur-2xl border-b border-white/15 shadow-luxe py-2.5"
      : "bg-background/95 backdrop-blur-2xl border-b border-border shadow-md py-2.5"
    : "bg-ink/75 backdrop-blur-xl border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.35)] py-3.5";

  const brandTitleClass = scrolled
    ? isDarkTheme
      ? "text-white"
      : "text-ink"
    : "text-white";

  const brandSubClass = scrolled
    ? isDarkTheme
      ? "text-secondary font-semibold"
      : "text-primary font-semibold"
    : "text-secondary font-semibold";

  const navLinkClass = scrolled
    ? isDarkTheme
      ? "text-white/85 hover:text-secondary"
      : "text-foreground/90 hover:text-primary"
    : "text-white/90 hover:text-secondary";

  const navActiveProps = {
    className: scrolled
      ? isDarkTheme
        ? "text-secondary font-bold relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded-full"
        : "text-primary font-bold relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
      : "text-secondary font-bold relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded-full",
  };

  const themeBtnClass = scrolled
    ? isDarkTheme
      ? "border-white/25 bg-white/10 text-white hover:border-secondary hover:text-secondary"
      : "border-border bg-card/80 text-foreground hover:border-primary hover:text-primary"
    : "border-white/25 bg-white/10 text-white hover:border-secondary hover:text-secondary";

  const mobileBtnClass = scrolled
    ? isDarkTheme
      ? "border-white/25 bg-white/10 text-white"
      : "border-border bg-card text-foreground"
    : "border-white/25 bg-white/10 text-white";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}>
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-10">
        {/* Brand Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-3 group" aria-label="Confianza home">
          <span className="gradient-royal ring-2 ring-secondary/60 grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg text-primary-foreground shadow-luxe transition-transform duration-300 group-hover:scale-105">
            C
          </span>
          <span className="min-w-0">
            <span className={`block truncate font-display text-lg sm:text-xl font-medium tracking-wide transition-colors leading-tight ${brandTitleClass}`}>
              Confianza
            </span>
            <span className={`block truncate text-[0.62rem] uppercase tracking-[0.26em] transition-colors ${brandSubClass}`}>
              Events &amp; Entertainment
            </span>
          </span>
        </Link>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-6 xl:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={navActiveProps}
                  className={`text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-all py-1 ${navLinkClass}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label="Toggle luxury theme"
            onClick={() => setTheme(theme === "luxury" ? "light" : "luxury")}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition backdrop-blur-md ${themeBtnClass}`}
            title={theme === "luxury" ? "Switch to Light Ivory Theme" : "Switch to Dark Royale Theme"}
          >
            {theme === "luxury" ? (
              <Sun className="h-4 w-4 text-secondary" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Consultation CTA */}
          <Link
            to="/contact"
            className="btn-luxe gradient-royal hidden text-primary-foreground lg:inline-flex shadow-luxe text-xs font-semibold py-2.5 px-6 ring-1 ring-secondary/40 hover:scale-105"
          >
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span>Book Consultation</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition xl:hidden ${mobileBtnClass}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="animate-slide-up mx-4 mt-3 rounded-3xl p-6 xl:hidden bg-ink/95 text-background border border-white/15 shadow-luxe backdrop-blur-2xl">
          <ul className="flex flex-col gap-1.5">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-white/15 text-secondary font-bold" }}
                  className="block rounded-xl px-4 py-2.5 text-sm uppercase tracking-[0.14em] text-white/90 transition hover:bg-white/10 hover:text-secondary font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-luxe gradient-gold mt-5 w-full text-ink font-bold text-xs py-3"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book Consultation</span>
          </Link>

          <p className="mt-4 text-center text-xs text-champagne/80 font-light">
            {settings.brand.tagline}
          </p>
        </div>
      )}
    </header>
  );
}
