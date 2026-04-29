"use client";

import { motion } from "motion/react";
import { useLanguage } from "./language-provider";

export function WorkExperience() {
  const { t } = useLanguage();

  const stats = [
    {
      id: 1,
      num: t("experience.1.num"),
      label1: t("experience.1.label1"),
      label2: t("experience.1.label2"),
    },
    {
      id: 2,
      num: t("experience.2.num"),
      label1: t("experience.2.label1"),
      label2: t("experience.2.label2"),
    },
    {
      id: 3,
      num: t("experience.3.num"),
      label1: t("experience.3.label1"),
      label2: t("experience.3.label2"),
    },
    {
      id: 4,
      num: t("experience.4.num"),
      label1: t("experience.4.label1"),
      label2: t("experience.4.label2"),
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-zinc-900 dark:text-zinc-100 text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-16 text-center md:text-left"
        >
          {t("experience.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center md:justify-start gap-4"
            >
              <span className="text-blue-500 dark:text-blue-400 text-6xl md:text-7xl lg:text-[5rem] 2xl:text-8xl font-bold tracking-tighter leading-none">
                {stat.num}
              </span>
              <div className="flex flex-col text-zinc-600 dark:text-zinc-400 font-bold leading-tight uppercase text-xs md:text-sm">
                {stat.label1 && (
                  <span className="text-blue-500 dark:text-blue-400">
                    {stat.label1}
                  </span>
                )}
                <span className="whitespace-pre-line">{stat.label2}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
