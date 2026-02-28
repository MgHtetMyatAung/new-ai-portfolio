"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "./language-provider";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t("nav.home"), href: "/#home" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.process"), href: "/#process" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto relative z-50 flex items-center justify-between gap-4 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-black/5"
            : "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/#home" className="text-lg font-bold tracking-tighter mr-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-orange-500">
            P.
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-zinc-200 dark:border-zinc-800 mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLanguage(language === "en" ? "my" : "en")}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden lg:inline-block font-bold uppercase text-[10px]">
              {language}
            </span>
          </button>

          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-zinc-950/95 md:hidden flex flex-col pt-32 px-8 pointer-events-auto"
          >
            <div className="flex flex-col gap-8 mt-8">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: i * 0.1 + 0.1,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-orange-500 transition-colors flex items-center gap-6 group"
                    >
                      <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600 group-hover:text-orange-500 transition-colors">
                        0{i + 1}
                      </span>
                      {link.name}
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto mb-12 border-t border-zinc-200 dark:border-zinc-800 pt-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Socials
              </p>
              <div className="flex flex-wrap gap-6">
                {["Github", "Twitter", "LinkedIn", "Email"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
