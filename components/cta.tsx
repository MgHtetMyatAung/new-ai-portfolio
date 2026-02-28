"use client";

import { motion } from "motion/react";
import { useLanguage } from "./language-provider";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase tracking-tighter leading-none text-zinc-900 dark:text-zinc-50">
            {t("cta.title1")}
          </h2>

          <div className="flex flex-col xl:flex-row items-center justify-between mt-12 md:mt-8 xl:-mt-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 md:pl-12 lg:pl-24 mb-12 xl:mb-0 w-full xl:w-auto justify-center xl:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#F4F85E] text-zinc-900 font-bold flex flex-col items-center justify-center shadow-lg shrink-0"
              >
                <span className="text-lg md:text-xl tracking-tight">
                  {t("cta.button")}
                </span>
                <ArrowUpRight className="w-6 h-6 mt-1" />
              </motion.a>

              <p className="max-w-[320px] text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest leading-loose text-center sm:text-left">
                {t("cta.desc")}
              </p>
            </div>

            <h2 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase tracking-tighter leading-none text-zinc-900 dark:text-zinc-50 text-center xl:text-right w-full xl:w-auto">
              {t("cta.title2")}
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
