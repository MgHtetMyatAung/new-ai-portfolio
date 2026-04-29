"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProjectNavbar } from "@/components/project-navbar";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mock data based on ID
  const blog = {
    title: id === "1" ? "Conducting in-depth research and usability testing" : 
           id === "2" ? "Designing cohesive strategies and visual identities" : 
           "Providing expert advice and strategic guidance",
    category: "MARKETING",
    readTime: "5 min read",
    author: "Jane Doe",
    date: "Oct 24, 2026",
    image: `https://picsum.photos/seed/abstract-${id}/1920/1080`,
    content: `
An effective design strategy begins with a deep understanding of the problem space, the target audience, and the overarching business goals. It's not just about making things look pretty; it's about solving complex problems through elegant and usable interfaces.

## The Foundation of Research

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

* First point of the process
* Second crucial step
* Third and final consideration

### Why it matters

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

> "Good design is universally applicable. It solves problems, organizes information, and delivers a message clearly."

1. **Research phase**: Understand the user needs.
2. **Design phase**: Create wireframes and prototypes.
3. **Testing phase**: Validate solutions with real users.

## Moving to High-Fidelity

Once the core structure is validated through wireframes, we move to high-fidelity design. Here, typographic scale, color theory, and precise spacing come into play to establish a visual rhythm.

![Design Process](https://picsum.photos/seed/design/800/400)

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    `
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">
      <ProjectNavbar />

      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-[70vh] pt-32 flex flex-col justify-end px-6 pb-16 overflow-hidden"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover brightness-[0.9] dark:brightness-[0.4]"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/10 backdrop-blur-md border border-zinc-900/20 dark:border-white/20 text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
              {blog.category}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/10 backdrop-blur-md border border-zinc-900/20 dark:border-white/20 text-sm font-medium text-zinc-900 dark:text-white">
              {blog.readTime}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-zinc-900 dark:text-white max-w-4xl mx-auto"
          >
            {blog.title}
          </motion.h1>
          
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex items-center justify-center gap-4 text-zinc-700 dark:text-zinc-300 font-medium text-sm md:text-base"
          >
            <span>{blog.author}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>{blog.date}</span>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="prose prose-zinc dark:prose-invert md:prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-3xl prose-img:shadow-xl"
          >
            <ReactMarkdown>
              {blog.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
