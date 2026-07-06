"use client";

import { motion } from "motion/react";
import { useLanguage } from "./language-provider";
import Image from "next/image";
import { Download } from "lucide-react";
import Photo from "@/assets/image.jpg";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            {t("about.title")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
            {t("about.desc")}
          </p>
          <motion.a
            href="/cv.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-full font-medium transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              {t("about.download_cv")}
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-emerald-500/20 mix-blend-overlay z-10" />
            <Image
              src={Photo}
              alt="About me"
              fill
              referrerPolicy="no-referrer"
              className="object-cover opacity-80 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
