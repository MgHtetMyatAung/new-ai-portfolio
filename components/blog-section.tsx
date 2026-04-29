"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Conducting in-depth research",
    desc: "Strategic and creative research methods to reach the right audience and drive conversions.",
    isDark: false,
  },
  {
    id: 2,
    title: "Creating visual identities",
    desc: "Optimize your brand visibility and ranking with effective design strategies.",
    isDark: false,
  },
  {
    id: 3,
    title: "Strategic guidance",
    desc: "We create strategic and engaging content to build brand awareness and increase engagement.",
    isDark: true,
  },
  {
    id: 4,
    title: "Usability testing",
    desc: "We help your product reach the right audience with data-driven testing strategies.",
    isDark: false,
  },
];

export function BlogSection() {
  return (
    <section id="blogs" className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Content Area */}
          <div className="lg:col-span-5 flex flex-col items-start pt-4 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium mb-8"
            >
              Blogs
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight mb-8 text-zinc-900 dark:text-zinc-50 leading-[1.1]"
            >
              A Comprehensive look at our design insights
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 dark:text-zinc-400 mb-10 text-lg leading-relaxed max-w-sm"
            >
              A comprehensive look at our latest insights, case studies, and how we deliver them
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="/#blogs" 
                className="inline-flex px-8 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
              >
                View All
              </Link>
            </motion.div>
          </div>

          {/* Right Grid Area */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {blogs.map((blog, index) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="block group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className={`h-full flex flex-col p-8 rounded-3xl relative overflow-hidden transition-all duration-300 border ${
                    blog.isDark
                      ? "bg-zinc-900 text-white border-zinc-800 shadow-xl"
                      : "bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Decorative circles for the dark card */}
                  {blog.isDark && (
                    <>
                      <div className="absolute -top-24 -right-24 w-64 h-64 border border-zinc-700 rounded-full opacity-50 pointer-events-none" />
                      <div className="absolute top-12 right-12 w-32 h-32 border border-zinc-700 rounded-full opacity-50 pointer-events-none" />
                    </>
                  )}

                  {/* Top Line */}
                  <div className={`w-12 h-px mb-8 ${blog.isDark ? "bg-zinc-700" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                  
                  {/* Content */}
                  <h3 className="text-2xl font-medium mb-4 pr-4 leading-tight relative z-10">
                    {blog.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-16 relative z-10 ${
                    blog.isDark ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                  }`}>
                    {blog.desc}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="mt-auto flex justify-end relative z-10">
                    {blog.isDark ? (
                      <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
