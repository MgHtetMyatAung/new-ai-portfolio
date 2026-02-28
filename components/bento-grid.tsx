"use client";

import { motion } from "motion/react";
import { useLanguage } from "./language-provider";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BentoGrid() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t("project.1.title"),
      desc: t("project.1.desc"),
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2",
      image: "https://picsum.photos/800/600?random=1",
      tags: ["Next.js", "Stripe", "Tailwind"],
    },
    {
      id: 2,
      title: t("project.2.title"),
      desc: t("project.2.desc"),
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      image: "https://picsum.photos/400/300?random=2",
      tags: ["React", "Python", "ML"],
    },
    {
      id: 3,
      title: t("project.3.title"),
      desc: t("project.3.desc"),
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      image: "https://picsum.photos/400/300?random=3",
      tags: ["Socket.io", "Node.js"],
    },
    {
      id: 4,
      title: t("project.4.title"),
      desc: t("project.4.desc"),
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      image: "https://picsum.photos/800/300?random=4",
      tags: ["Framer Motion", "UI/UX"],
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          {t("projects.title")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
          {t("projects.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${project.colSpan} ${project.rowSpan}`}
          >
            <Link
              href={`/projects/${project.id}`}
              className="absolute inset-0 z-20"
              aria-label={`View ${project.title}`}
            />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 dark:opacity-60"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 line-clamp-2 max-w-md">
                    {project.desc}
                  </p>
                </div>

                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 relative z-30">
                  <a
                    href="#"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
