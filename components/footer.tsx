"use client";

import { useLanguage } from "./language-provider";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Send,
  MessageCircle,
  Phone,
} from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const links = [
    { name: t("nav.home"), href: "#" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.projects"), href: "#projects" },
  ];

  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/ko-htet-myat" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    {
      name: "Telegram",
      icon: Send,
      href: process.env.NEXT_PUBLIC_TELEGRAM_URL || "#",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "#",
    },
    {
      name: "Call",
      icon: Phone,
      href: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || "+959770106619"}`,
    },
    { name: "Email", icon: Mail, href: "mailto:htetmyataung16000@gmail.com" },
  ];

  return (
    <footer
      id="contact"
      className="bg-zinc-950 text-zinc-400 py-20 px-6 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-50 tracking-tighter mb-6 uppercase">
              Let&apos;s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400">
                extraordinary
              </span>
            </h3>
            <p className="max-w-sm text-sm leading-relaxed mb-8">
              I&apos;m always open to discussing product design work or
              partnership opportunities.
            </p>
            <a
              href="mailto:htetmyataung16000@gmail.com"
              className="inline-flex items-center gap-2 text-zinc-50 font-medium hover:text-orange-400 transition-colors group"
            >
              htetmyataung16000@gmail.com
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div>
            <h4 className="text-zinc-50 font-semibold mb-6 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-zinc-50 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-50 font-semibold mb-6 uppercase tracking-wider text-sm">
              Socials
            </h4>
            <ul className="flex flex-col gap-4">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="flex items-center gap-2 hover:text-zinc-50 transition-colors text-sm group"
                  >
                    <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-800/50 text-xs">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>{t("footer.made")}</span>
            <span className="text-zinc-50 font-medium">{t("footer.by")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
