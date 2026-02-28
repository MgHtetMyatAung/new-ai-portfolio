"use client";

import { motion } from "motion/react";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./language-provider";

export function AIAssistantSection() {
  const { t } = useLanguage();

  return (
    <section id="ai-assistant" className="py-24 px-6 bg-zinc-900 text-white overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Bot className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Powered</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
              Meet Your <span className="text-orange-500">AI Business</span> Analyst
            </h2>
            
            <p className="text-xl text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Discuss your business ideas, technical requirements, and project goals with our specialized AI assistant before we dive into development.
            </p>

            <Link href="/ai-assistant">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-bold transition-all hover:bg-orange-500 hover:text-white"
              >
                Start Discussion
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                <Bot size={120} className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-12 right-12 w-24 h-24 border border-white/5 rounded-full animate-pulse" />
              <div className="absolute bottom-12 left-12 w-32 h-32 border border-white/5 rounded-full animate-pulse delay-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
