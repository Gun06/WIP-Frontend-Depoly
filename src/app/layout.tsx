import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WIP · 러너 커뮤니티",
  description: "대회·커뮤니티·기록·랭킹 프로토타입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light" className={`${oswald.variable} ${dmSans.variable}`}>
      <body className="font-body min-h-dvh bg-run-bg">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=location.pathname;if(p==='/admin'||p.indexOf('/admin/')===0){document.documentElement.dataset.theme='light';return;}var m=localStorage.getItem('wip-theme');if(m==='dark'){document.documentElement.dataset.theme='dark';}else{document.documentElement.dataset.theme='light';}}catch(e){document.documentElement.dataset.theme='light';}})();",
          }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
