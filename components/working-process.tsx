"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "./language-provider";

export function WorkingProcess() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      id: 1,
      num: t("process.1.num"),
      title: t("process.1.title"),
      desc: t("process.1.desc"),
    },
    {
      id: 2,
      num: t("process.2.num"),
      title: t("process.2.title"),
      desc: t("process.2.desc"),
    },
    {
      id: 3,
      num: t("process.3.num"),
      title: t("process.3.title"),
      desc: t("process.3.desc"),
    },
  ];

  return (
    <section id="process" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
          {t("process.title")}
        </h2>
      </div>

      <div className="relative" ref={containerRef}>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block">
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-500"
            style={{ height: progressHeight }}
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, index) => {
            // Calculate when this step should become active based on scroll
            const stepProgress = index / (steps.length - 1);

            return (
              <StepItem
                key={step.id}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                stepProgress={stepProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  scrollYProgress,
  stepProgress,
}: {
  step: any;
  index: number;
  scrollYProgress: any;
  stepProgress: number;
}) {
  // Determine if the step is active based on scroll position
  // We use a small threshold (0.1) so it activates slightly before the line reaches it
  const isActive = useTransform(
    scrollYProgress,
    (val: number) => val >= Math.max(0, stepProgress - 0.1),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0"
    >
      <div className="md:w-1/2 flex md:justify-end md:pr-16 w-full">
        <div className="flex items-center gap-4">
          <motion.span
            className="text-xl font-bold"
            style={{
              color: isActive.get()
                ? "var(--color-blue-500, #3b82f6)"
                : "var(--color-zinc-900, #18181b)",
            }}
            animate={{
              color: isActive.get() ? "#3b82f6" : "inherit",
            }}
          >
            {step.num}
          </motion.span>
          <motion.h3
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{
              color: isActive.get()
                ? "var(--color-blue-500, #3b82f6)"
                : "var(--color-zinc-900, #18181b)",
            }}
            animate={{
              color: isActive.get() ? "#3b82f6" : "inherit",
            }}
          >
            {step.title}
          </motion.h3>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
        <motion.div
          className="w-4 h-4 rounded-full z-10 border-4 border-zinc-50 dark:border-zinc-950"
          animate={{
            backgroundColor: isActive.get() ? "#3b82f6" : "#e4e4e7",
            borderColor: isActive.get() ? "#f8fafc" : "#f8fafc",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="md:w-1/2 md:pl-16 w-full">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
