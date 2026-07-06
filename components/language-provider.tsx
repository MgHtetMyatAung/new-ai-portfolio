"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "my";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.badge": "Available for work",
    "hero.greeting": "Hi, I'm a Frontend Developer",
    "hero.description":
      "I build modern, scalable, and user-friendly applications. Passionate about clean code and great design.",
    "about.title": "About Me",
    "about.desc":
      "I am a passionate developer with experience in building web applications. I love learning new technologies and solving complex problems. My focus is on creating intuitive and performant user experiences.",
    "about.download_cv": "Download CV",
    "experience.title": "MY WORK EXPERIENCE",
    "experience.1.num": "04",
    "experience.1.label1": "+",
    "experience.1.label2": "YEARS\nOF EXPERIENCE",
    "experience.2.num": "16",
    "experience.2.label1": "+",
    "experience.2.label2": "PROJECTS\nDONE",
    "experience.3.num": "9",
    "experience.3.label1": "+",
    "experience.3.label2": "AWARDS\nWON",
    "experience.4.num": "4.8",
    "experience.4.label1": "+",
    "experience.4.label2": "OVERALL\nRATING",
    "process.title": "MY WORKING PROCESS",
    "process.1.num": "01.",
    "process.1.title": "Research",
    "process.1.desc":
      "I start by learning and researching based on client brief and resource to gain about the needs, goals, products, and requirements to do well.",
    "process.2.num": "02.",
    "process.2.title": "Strategy",
    "process.2.desc":
      "Then start to plan and structure the project process and budget based on the discovery phase before start the development.",
    "process.3.num": "03.",
    "process.3.title": "Development",
    "process.3.desc":
      "After I completed all the processes, goals, and scope, I started to do the development process such as architecting scalable frontend structures and integrating robust backend services.",
    "projects.title": "Selected Work",
    "projects.desc": "A collection of my recent projects.",
    "footer.made": "Made with ❤️",
    "footer.by": "by me",
    "project.1.title": "E-Commerce Platform",
    "project.1.desc":
      "A full-stack e-commerce solution with Next.js and Stripe.",
    "project.2.title": "AI Dashboard",
    "project.2.desc": "Analytics dashboard powered by machine learning models.",
    "project.3.title": "Social App",
    "project.3.desc": "Real-time social networking application.",
    "project.4.title": "Portfolio Template",
    "project.4.desc": "A customizable developer portfolio template.",
    "cta.title1": "HAVE A PROJECT?",
    "cta.title2": "LET'S TALK",
    "cta.desc":
      "WHETHER YOU NEED INTUITIVE UI/UX DESIGN, ROBUST DEVELOPMENT, OR A SEAMLESS BLEND OF BOTH, I'M HERE TO HELP",
    "cta.button": "HIRE ME",
    "services.title": "Services I Am Providing",
    "services.desc":
      "Providing end-to-end web development and interface design. Committed to delivering pixel-perfect, high-performance applications tailored to your business goals.",
    "services.button": "GET IN TOUCH",
    "services.1.title": "WEB DESIGN",
    "services.1.desc":
      "Creating beautiful, responsive, and user-centric web interfaces that engage visitors and drive conversions.",
    "services.2.title": "APP DESIGN",
    "services.2.desc":
      "Designing intuitive and engaging mobile applications for iOS and Android platforms with a focus on user experience.",
    "services.3.title": "DASHBOARD DESIGN",
    "services.3.desc":
      "Building complex data visualization dashboards that are easy to understand, navigate, and interact with.",
    "services.4.title": "DESIGN STRATEGY",
    "services.4.desc":
      "Developing comprehensive design systems and strategies to ensure brand consistency across all digital touchpoints.",
    "skills.title": "My Skills",
    "skills.desc": "Here are some of the technologies I work with.",
  },
  my: {
    "nav.home": "ပင်မစာမျက်နှာ",
    "nav.about": "ကျွန်ုပ်အကြောင်း",
    "nav.process": "လုပ်ငန်းစဉ်",
    "nav.projects": "ပရောဂျက်များ",
    "nav.contact": "ဆက်သွယ်ရန်",
    "hero.badge": "အလုပ်လက်ခံရန် အသင့်ရှိသည်",
    "hero.greeting": "မင်္ဂလာပါ၊ ကျွန်တော်က Developer တစ်ယောက်ပါ",
    "hero.description":
      "ခေတ်မီ၊ အသုံးပြုရလွယ်ကူပြီး အတိုင်းအတာကျယ်ပြန့်သော အက်ပ်များကို တည်ဆောက်ပါသည်။ သန့်ရှင်းသော ကုဒ်နှင့် ကောင်းမွန်သော ဒီဇိုင်းကို ဝါသနာပါပါသည်။",
    "about.title": "ကျွန်ုပ်အကြောင်း",
    "about.desc":
      "ကျွန်ုပ်သည် ဝဘ်အက်ပ်လီကေးရှင်းများ တည်ဆောက်ရာတွင် အတွေ့အကြုံရှိသော စိတ်အားထက်သန်သည့် developer တစ်ဦးဖြစ်ပါသည်။ နည်းပညာအသစ်များကို လေ့လာခြင်းနှင့် ရှုပ်ထွေးသော ပြဿနာများကို ဖြေရှင်းခြင်းကို နှစ်သက်ပါသည်။ ကျွန်ုပ်၏ အဓိကရည်ရွယ်ချက်မှာ အသုံးပြုရလွယ်ကူပြီး စွမ်းဆောင်ရည်မြင့်မားသော အသုံးပြုသူအတွေ့အကြုံများကို ဖန်တီးရန်ဖြစ်သည်။",
    "about.download_cv": "CV ဒေါင်းလုဒ်လုပ်ရန်",
    "experience.title": "ကျွန်ုပ်၏ လုပ်ငန်းအတွေ့အကြုံ",
    "experience.1.num": "၀၄",
    "experience.1.label1": "+",
    "experience.1.label2": "နှစ်\nအတွေ့အကြုံ",
    "experience.2.num": "၁၆",
    "experience.2.label1": "+",
    "experience.2.label2": "ပရောဂျက်\nပြီးစီးမှု",
    "experience.3.num": "၉",
    "experience.3.label1": "+",
    "experience.3.label2": "ဆု\nရရှိမှု",
    "experience.4.num": "၄.၈",
    "experience.4.label1": "+",
    "experience.4.label2": "အလုံးစုံ\nအဆင့်သတ်မှတ်ချက်",
    "process.title": "ကျွန်ုပ်၏ လုပ်ငန်းစဉ်",
    "process.1.num": "၀၁.",
    "process.1.title": "သုတေသန",
    "process.1.desc":
      "လိုအပ်ချက်များ၊ ရည်မှန်းချက်များ၊ ထုတ်ကုန်များနှင့် ကောင်းမွန်စွာလုပ်ဆောင်ရန် လိုအပ်ချက်များကို သိရှိရန် ဖောက်သည်၏ အကျဉ်းချုပ်နှင့် အရင်းအမြစ်များအပေါ် အခြေခံ၍ လေ့လာခြင်းနှင့် သုတေသနပြုခြင်းဖြင့် စတင်ပါသည်။",
    "process.2.num": "၀၂.",
    "process.2.title": "မဟာဗျူဟာ",
    "process.2.desc":
      "ထို့နောက် ဖွံ့ဖြိုးတိုးတက်မှုမစတင်မီ ရှာဖွေတွေ့ရှိမှုအဆင့်အပေါ် အခြေခံ၍ ပရောဂျက်လုပ်ငန်းစဉ်နှင့် ဘတ်ဂျက်ကို စီစဉ်တည်ဆောက်ရန် စတင်ပါသည်။",
    "process.3.num": "၀၃.",
    "process.3.title": "ဖွံ့ဖြိုးတိုးတက်မှု",
    "process.3.desc":
      "လုပ်ငန်းစဉ်များ၊ ရည်မှန်းချက်များနှင့် နယ်ပယ်အားလုံးကို ပြီးစီးပြီးနောက်၊ အခြေခံကုဒ်များဖန်တီးခြင်းနှင့် ပရိုဂရမ်ရေးဆွဲခြင်းကဲ့သို့သော ဖွံ့ဖြိုးတိုးတက်မှုလုပ်ငန်းစဉ်ကို စတင်လုပ်ဆောင်ခဲ့သည်။",
    "projects.title": "ရွေးချယ်ထားသော အလုပ်များ",
    "projects.desc": "ကျွန်တော့်ရဲ့ လတ်တလော ပရောဂျက်များ စုစည်းမှု။",
    "footer.made": "ဖြင့်ပြုလုပ်သည် ❤️",
    "footer.by": "ကျွန်တော်",
    "project.1.title": "E-Commerce ပလက်ဖောင်း",
    "project.1.desc":
      "Next.js နှင့် Stripe ဖြင့် အပြည့်အဝ e-commerce ဖြေရှင်းချက်။",
    "project.2.title": "AI ဒက်ရှ်ဘုတ်",
    "project.2.desc":
      "Machine learning မော်ဒယ်များဖြင့် အလုပ်လုပ်သော ခွဲခြမ်းစိတ်ဖြာမှု ဒက်ရှ်ဘုတ်။",
    "project.3.title": "လူမှုရေး အက်ပ်",
    "project.3.desc": "အချိန်နှင့်တစ်ပြေးညီ လူမှုကွန်ရက် အက်ပ်လီကေးရှင်း။",
    "project.4.title": "Portfolio ပုံစံ",
    "project.4.desc": "စိတ်ကြိုက်ပြင်ဆင်နိုင်သော developer portfolio ပုံစံ။",
    "cta.title1": "ပရောဂျက် ရှိပါသလား?",
    "cta.title2": "ဆွေးနွေးကြစို့",
    "cta.desc":
      "အသုံးပြုရလွယ်ကူသော UI/UX ဒီဇိုင်း၊ ခိုင်မာသော ဖွံ့ဖြိုးတိုးတက်မှု သို့မဟုတ် နှစ်ခုစလုံး၏ ချောမွေ့သော ပေါင်းစပ်မှု လိုအပ်သည်ဖြစ်စေ ကူညီရန် အသင့်ရှိပါသည်။",
    "cta.button": "ငှားရမ်းရန်",
    "services.title": "ကျွန်ုပ် ပေးဆောင်နေသော ဝန်ဆောင်မှုများ",
    "services.desc":
      "သင့်အတွက် လိုအပ်သော web ဝန်ဆောင်မှု အမျိုးအစားအားလုံးကို သင့်တင့်သော စျေးနှုန်းဖြင့် ပေးဆောင်နေပါသည်။ အကန့်အသတ်မရှိ ပြင်ဆင်မှုများဖြင့် အရည်အသွေးကို အာမခံပါသည်။ ထို့ကြောင့် အကောင်းဆုံး ဒီဇိုင်းကို ရရှိနိုင်ပါသည်။",
    "services.button": "ဆက်သွယ်ရန်",
    "services.1.title": "ဝဘ် ဒီဇိုင်း",
    "services.1.desc":
      "ဧည့်သည်များကို ဆွဲဆောင်နိုင်ပြီး ပြောင်းလဲမှုများကို ဖြစ်ပေါ်စေသော လှပပြီး တုံ့ပြန်မှုရှိသော ဝဘ်အင်တာဖေ့စ်များကို ဖန်တီးခြင်း။",
    "services.2.title": "အက်ပ် ဒီဇိုင်း",
    "services.2.desc":
      "အသုံးပြုသူအတွေ့အကြုံကို အဓိကထား၍ iOS နှင့် Android ပလက်ဖောင်းများအတွက် အလိုလိုသိမြင်နိုင်သော မိုဘိုင်းအက်ပ်လီကေးရှင်းများကို ဒီဇိုင်းဆွဲခြင်း။",
    "services.3.title": "ဒက်ရှ်ဘုတ် ဒီဇိုင်း",
    "services.3.desc":
      "နားလည်ရလွယ်ကူသော၊ သွားလာရလွယ်ကူသော ရှုပ်ထွေးသည့် ဒေတာပြသမှု ဒက်ရှ်ဘုတ်များကို တည်ဆောက်ခြင်း။",
    "services.4.title": "ဒီဇိုင်း မဟာဗျူဟာ",
    "services.4.desc":
      "ဒစ်ဂျစ်တယ် ထိတွေ့မှုအားလုံးတွင် အမှတ်တံဆိပ် ညီညွတ်မှုရှိစေရန် ပြီးပြည့်စုံသော ဒီဇိုင်းစနစ်များနှင့် မဟာဗျူဟာများကို ဖော်ဆောင်ခြင်း။",
    "skills.title": "ကျွန်ုပ်၏ ကျွမ်းကျင်မှုများ",
    "skills.desc": "ကျွန်ုပ်အသုံးပြုသော နည်းပညာအချို့ဖြစ်ပါသည်။",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "my")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
