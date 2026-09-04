import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Scrolls to top on route change and sets the document title. */
export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main id="main" key={pathname} className="page-enter flex-1 pt-16 lg:pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/** Sets <title> per page. Call at the top of each page component. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    const base = "Daiwik Rankawat";
    document.title = title ? `${title} — ${base}` : `${base} — Technology, data and business`;
  }, [title]);
}
