"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href) return;
      
      const isHashLink = href.startsWith("#") || href.startsWith("/#");
      
      if (isHashLink) {
        const hash = href.substring(href.indexOf("#"));
        
        // If we are on the page where the element exists
        if (pathname === "/" || href.startsWith("#")) {
          const targetElement = document.querySelector(hash) as HTMLElement;
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, { offset: -80 });
            window.history.pushState(null, "", hash);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
