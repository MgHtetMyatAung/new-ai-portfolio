"use client";

import { motion } from "motion/react";
import { useLanguage } from "./language-provider";
import {
  Atom,
  Triangle,
  FileCode2,
  Wind,
  Server,
  Figma,
  PenTool,
  Move,
  Share2,
  Database,
  Layers,
  Box,
} from "lucide-react";
import {
  digitalocean,
  docker,
  figma,
  gemini,
  next,
  nginx,
  node,
  playwright,
  postgresql,
  postman,
  react,
  reactdom,
  redux,
  shadcn,
  supabase,
  tailwind,
  tanstack,
  typescript,
  vercel,
} from "@/assets/icons";
import Image from "next/image";

export function Skills() {
  const { t } = useLanguage();

  const skills = [
    { name: "React", icon: react },
    { name: "Redux", icon: redux },
    { name: "React Router", icon: reactdom },
    { name: "Tanstack Query", icon: tanstack },
    { name: "Next.js", icon: next },
    { name: "TypeScript", icon: typescript },
    { name: "Tailwind CSS", icon: tailwind },
    { name: "Shadcn UI", icon: shadcn },
    { name: "Node.js", icon: node },
    { name: "Figma", icon: figma },
    // { name: "Vite", icon: PenTool },
    // { name: "Framer Motion", icon: Move },
    // { name: "Hono", icon: Share2 },
    { name: "PostgreSQL", icon: postgresql },
    { name: "Supabase", icon: supabase },
    // { name: "Prisma", icon: Layers },
    { name: "Docker", icon: docker },
    // { name: "Nginx", icon: nginx },
    { name: "Postman", icon: postman },
    // { name: "Playwright", icon: playwright },
    // { name: "Digital Ocean", icon: digitalocean },
    { name: "Vercel", icon: vercel },
    { name: "Gemini", icon: gemini },
  ];

  return (
    <section className="py-24 px-6 overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 text-zinc-900 dark:text-zinc-50"
          >
            {t("skills.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            {t("skills.desc")}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-sm shadow-sm hover:shadow-md transition-shadow cursor-default flex items-center gap-2"
            >
              <Image src={skill.icon} alt={skill.name} width={17} height={17} />
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
