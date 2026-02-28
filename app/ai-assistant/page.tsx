"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2, ArrowLeft, Sparkles, Phone } from "lucide-react";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ProjectNavbar } from "@/components/project-navbar";
import { Footer } from "@/components/footer";

const submitRequirementsFunctionDeclaration: FunctionDeclaration = {
  name: "submit_requirements",
  parameters: {
    type: Type.OBJECT,
    description: "Submit the collected business requirements to the lead engineer.",
    properties: {
      clientName: {
        type: Type.STRING,
        description: "The name of the client.",
      },
      clientEmail: {
        type: Type.STRING,
        description: "The email of the client.",
      },
      requirements: {
        type: Type.STRING,
        description: "A detailed summary of the business requirements discussed.",
      },
    },
    required: ["clientName", "clientEmail", "requirements"],
  },
};

const SYSTEM_INSTRUCTION = `You are a professional Business Analyst (BA) assistant for a world-class senior web engineer and product designer's portfolio. 
Your goal is to help potential clients discuss their business ideas, technical requirements, and project goals.

Key behaviors:
1. Professional & Insightful: Ask clarifying questions about their business model, target audience, and key features.
2. Helpful: Provide initial thoughts on how a modern web solution (using Next.js, React, etc.) could solve their problems.
3. Goal-oriented: Encourage them to leave their contact details or book a consultation if the discussion becomes detailed.
4. Knowledgeable: You know about UI/UX design, full-stack development, and modern tech stacks.
5. Concise: Keep responses scannable and professional.
6. Direct Connection: If a client expresses a strong desire to speak with the lead engineer directly or wants to "connect", "talk to you", or "hire you", you MUST provide them with the following direct contact options:
   - Telegram: ${process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/yourusername'}
   - WhatsApp: ${process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/yourphonenumber'}
   - Phone Call: tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+959770106619'}
   Always present these as clear, clickable links.
7. Requirement Submission: When a client asks to "send their requirements", "submit their project", or "notify the engineer", you MUST use the 'submit_requirements' tool. 
   Before calling this tool, ensure you have collected:
   - Their Name
   - Their Email
   - A clear summary of their project requirements.
   After calling the tool, confirm to the client that their requirements have been sent to the lead engineer and they will be contacted soon.

If they ask who you are, explain that you are an AI Business Analyst here to help them shape their project requirements before they talk to the lead engineer.`;

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendTelegramNotification = async (text: string) => {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      console.warn("Telegram Bot Token or Chat ID missing.");
      return false;
    }

    try {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      });
      return res.ok;
    } catch (err) {
      console.error("Telegram notification failed:", err);
      return false;
    }
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("ai_assistant_history");
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse chat history", e);
        setMessages([
          { role: "bot", text: "Welcome to the Strategy Room. I'm your AI Business Analyst. Tell me about the project you're envisioning—what's the core problem we're solving?" },
        ]);
      }
    } else {
      setMessages([
        { role: "bot", text: "Welcome to the Strategy Room. I'm your AI Business Analyst. Tell me about the project you're envisioning—what's the core problem we're solving?" },
      ]);
    }
  }, []);

  // Save history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ai_assistant_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Notify when a new chat starts (first user message in this session/history)
    if (messages.length <= 1) {
      sendTelegramNotification(`👋 *New Chat Started*\n\nA potential client has just started a conversation with your AI Assistant.\n\n*First Message:* ${userMessage}`);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [submitRequirementsFunctionDeclaration] }],
        },
        history: newMessages.slice(0, -1).map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        }))
      });

      let response = await chat.sendMessage({ message: userMessage });
      
      // Handle function calls
      const functionCalls = response.functionCalls;
      if (functionCalls) {
        for (const call of functionCalls) {
          if (call.name === "submit_requirements") {
            const { clientName, clientEmail, requirements } = call.args as any;
            
            const text = `🚀 *New Project Lead*\n\n*Name:* ${clientName}\n*Email:* ${clientEmail}\n\n*Requirements:*\n${requirements}`;
            const success = await sendTelegramNotification(text);
            
            let statusMessage = success 
              ? "Requirements successfully sent to the lead engineer."
              : "I've recorded your requirements, but there was a technical glitch sending the notification. I will try again later.";

            if (!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || !process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID) {
              statusMessage = "Requirements recorded! (Note: Telegram notification is not yet configured by the administrator).";
            }
            
            const toolResponse = {
              name: "submit_requirements",
              response: { success, message: statusMessage }
            };
            
            // Send the tool response back to the model to get a final confirmation message
            response = await chat.sendMessage({
              message: JSON.stringify(toolResponse)
            });
          }
        }
      }

      const botText = response.text || "I've processed your request. Is there anything else you'd like to discuss?";
      
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-white dark:bg-zinc-950 flex flex-col overflow-hidden">
      <ProjectNavbar />

      {/* Chat Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pt-24 pb-48 px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto space-y-6 py-8">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 md:gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
                msg.role === "user" 
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" 
                  : "bg-orange-500 text-white"
              }`}>
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  {msg.role === "user" ? "You" : "AI Business Analyst"}
                </div>
                <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-none" 
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none"
                }`}>
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => {
                          const isTel = props.href?.startsWith("tel:");
                          if (isTel) {
                            return (
                              <a
                                {...props}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full no-underline hover:bg-orange-600 transition-colors my-2 font-bold shadow-lg shadow-orange-500/20"
                              >
                                <Phone size={14} />
                                Call Now
                              </a>
                            );
                          }
                          return <a {...props} className="text-orange-500 hover:underline" />;
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm">
                <Bot size={16} />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  AI Business Analyst
                </div>
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center gap-3">
                  <Loader2 size={16} className="animate-spin text-orange-500" />
                  <span className="text-xs font-medium text-zinc-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950 dark:to-transparent pt-10 pb-4 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Suggestions - Only show when there is only the initial bot message */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {[
                "Help me brainstorm ideas for a mobile app",
                "What are the key features for an e-commerce platform?",
                "How can AI help my business?"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-[11px] md:text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <div className="relative flex items-center group">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask anything about your project..."
                className="w-full pl-6 pr-14 py-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm transition-all resize-none min-h-[56px] max-h-32"
                style={{ height: "auto" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-3 text-zinc-400 hover:text-orange-500 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-center text-[9px] text-zinc-400 mt-2 uppercase tracking-widest font-bold">
              Gemini AI Discovery • Strategy Session
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
