"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProjectNavbar } from "@/components/project-navbar";
import { useRef } from "react";

export default function ProjectDetail() {
  const params = useParams();
  const { t } = useLanguage();
  const id = params.id as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mock data based on ID
  const project = {
    title: t(`project.${id}.title`) || "Project Title",
    desc: t(`project.${id}.desc`) || "Project description goes here.",
    image: `https://picsum.photos/1920/1080?random=${id}`,
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    client: "Acme Corporation",
    role: "Lead Designer & Developer",
    timeline: "12 Weeks",
    year: "2024",
    challenge:
      "The client needed a modern, high-performance web application that could scale to millions of users while maintaining a premium, editorial feel. The existing platform was slow, outdated, and suffering from high bounce rates.",
    solution:
      "We implemented a Next.js App Router architecture with React Server Components for optimal performance. The UI was crafted using Tailwind CSS and Framer Motion for fluid, physics-based animations, resulting in a 40% increase in user retention.",
    gallery: [
      `https://picsum.photos/800/800?random=${id}1`,
      `https://picsum.photos/800/800?random=${id}2`,
    ],
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">
      <ProjectNavbar />

      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-[85vh] pt-32 flex flex-col justify-end px-6 pb-12 md:pb-24 overflow-hidden"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-[0.9] dark:brightness-[0.4]"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/10 backdrop-blur-md border border-zinc-900/20 dark:border-white/20 text-sm font-medium text-zinc-900 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-none mb-6 text-zinc-900 dark:text-white"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl font-medium"
          >
            {project.desc}
          </motion.p>
        </div>
      </section>

      {/* Project Meta */}
      <section className="py-12 md:py-24 px-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: "Client", value: project.client },
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Year", value: project.year },
          ].map((meta, i) => (
            <motion.div
              key={meta.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">
                {meta.label}
              </h3>
              <p className="text-lg font-medium">{meta.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Split */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight sticky top-32">
                The Challenge
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-3xl leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight sticky top-32">
                The Solution
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-3xl leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mb-12">
                {project.solution}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium hover:scale-105 transition-transform"
                >
                  Live Site <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  Source Code <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            >
              <Image
                src={img}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 px-6 text-center border-t border-zinc-200 dark:border-zinc-800 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-6">
            Next Project
          </p>
          <Link
            href={`/projects/${parseInt(id) === 4 ? 1 : parseInt(id) + 1}`}
            className="group inline-block"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors flex items-center justify-center gap-4">
              View Next{" "}
              <ArrowUpRight className="w-10 h-10 md:w-14 md:h-14 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
            </h2>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
