import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Global styles
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrolling } from "@/components/smooth-scrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mhma-portfolio.vercel.app"),
  title: {
    default: "Htet Myat Aung | Senior Web Developer",
    template: "%s | Htet Myat Aung",
  },
  description:
    "Portfolio of Htet Myat Aung, specializing in building modern, scalable, and user-friendly web applications, SaaS products, and digital experiences.",
  keywords: [
    "Htet Myat Aung",
    "Web Engineer",
    "Product Designer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Full-stack Developer",
    "UI/UX Design",
  ],
  authors: [
    { name: "Htet Myat Aung", url: "https://mhma-portfolio.vercel.app" },
  ],
  creator: "Htet Myat Aung",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhma-portfolio.vercel.app",
    title: "Htet Myat Aung | Senior Web Developer",
    description:
      "Portfolio of Htet Myat Aung, specializing in building modern, scalable, and user-friendly web applications.",
    siteName: "Htet Myat Aung Portfolio",
    images: [
      {
        url: "../assets/og.png",
        width: 1200,
        height: 630,
        alt: "Htet Myat Aung Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Htet Myat Aung | Senior Web Developer",
    description:
      "Portfolio of Htet Myat Aung, specializing in building modern, scalable, and user-friendly web applications.",
    creator: "@htetmyataung",
    images: ["../assets/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScrolling>
              {children}
              <ScrollToTop />
            </SmoothScrolling>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
