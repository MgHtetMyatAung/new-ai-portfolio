"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function ProjectNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto relative z-50 flex items-center justify-between gap-6 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-black/5"
            : "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border-transparent"
        }`}
      >
        <Link
          href="/#projects"
          className="group flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pl-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-2" />

        <Link href="/" className="text-lg font-bold tracking-tighter pr-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-orange-500">
            P.
          </span>
        </Link>
      </motion.nav>
    </header>
  );
}
