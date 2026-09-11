import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteProvider } from "../context/SiteContext";
import { AuthProvider } from "../context/AuthContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="glass-card max-w-lg rounded-3xl p-8 sm:p-12 text-center shadow-luxe">
        <span className="gradient-royal mx-auto grid h-16 w-16 place-items-center rounded-full font-display text-2xl text-primary-foreground shadow-luxe">
          C
        </span>
        <span className="mt-4 block text-[0.7rem] uppercase tracking-[0.3em] text-secondary">
          Confianza Event's &amp; Entertainment
        </span>
        <h1 className="mt-2 font-display text-6xl text-ink">404</h1>
        <h2 className="mt-2 font-display text-2xl text-foreground">A Moment Strayed</h2>
        <span className="rule-gold mx-auto my-4" />
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has been moved to another celebration.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-luxe gradient-royal text-primary-foreground"
          >
            Return to Homepage
          </Link>
          <Link
            to="/contact"
            className="btn-luxe gradient-gold text-ink"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="glass-card max-w-md rounded-3xl p-8 text-center">
        <span className="gradient-royal mx-auto grid h-12 w-12 place-items-center rounded-full font-display text-lg text-primary-foreground">
          !
        </span>
        <h1 className="mt-4 font-display text-2xl text-foreground">
          This celebration paused
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something unexpected occurred. Please refresh or return to the main gallery.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-luxe gradient-royal text-primary-foreground text-xs"
          >
            Try again
          </button>
          <Link
            to="/"
            className="btn-luxe border border-border bg-card text-foreground text-xs"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Confianza Event's and Entertainment — Luxury Wedding Planner in Pune" },
      {
        name: "description",
        content:
          "Where Weddings Become Stories. Luxury wedding planning, decor, execution and destination weddings in Pune and across India.",
      },
      { name: "author", content: "Confianza Events" },
      { property: "og:title", content: "Confianza Event's and Entertainment — Where Weddings Become Stories" },
      {
        property: "og:description",
        content:
          "Luxury wedding planning, bespoke decor, and flawless execution for weddings that become timeless stories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@confianza_events" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </SiteProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

