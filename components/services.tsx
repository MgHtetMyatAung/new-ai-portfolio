"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./language-provider";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    { id: 1, title: t("services.1.title"), desc: t("services.1.desc") },
    { id: 2, title: t("services.2.title"), desc: t("services.2.desc") },
    { id: 3, title: t("services.3.title"), desc: t("services.3.desc") },
    { id: 4, title: t("services.4.title"), desc: t("services.4.desc") },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-zinc-900 dark:text-zinc-50 leading-tight">
            {t("services.title")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
            {t("services.desc")}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm tracking-wide text-zinc-900 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 shadow-lg shadow-orange-500/20 w-fit"
          >
            {t("services.button")}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 flex flex-col"
        >
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={service.id}
                initial="initial"
                whileHover="hover"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group flex flex-col py-8 cursor-pointer ${
                  index !== services.length - 1
                    ? "border-b border-zinc-300 dark:border-zinc-700"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-2xl md:text-3xl font-bold tracking-tight uppercase transition-colors duration-300 ${isOpen ? "text-orange-500" : "text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500"}`}
                  >
                    {service.title}
                  </h3>
                  <motion.div
                    variants={{
                      initial: {
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0.8,
                        x: isOpen ? 0 : -10,
                      },
                      hover: { opacity: 1, scale: 1, x: 0 },
                    }}
                    animate={{
                      opacity: isOpen ? 1 : undefined,
                      scale: isOpen ? 1 : undefined,
                      x: isOpen ? 0 : undefined,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 flex items-center justify-center text-zinc-900 shadow-md shrink-0"
                  >
                    <ArrowUpRight
                      className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                        {service.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
