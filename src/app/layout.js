import { Suspense } from "react";
import Loading from "@/components/loading";
import "./globals.css";
import StoreProvider from "./storeProvider";
import Header from "@/components/Header";
import Player from "@/components/Player";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const IRANSans = localFont({
  src: "../../public/fonts/IRANSansWeb.woff2",
  display: "swap",
});

export const metadata = {
  title: "Podcast App",
  // description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={IRANSans.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = storedTheme || (systemDark ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <StoreProvider>
        <body
          className={`select-none antialiased w-[100vw] h-full bg-neutral-light dark:bg-neutral-dark-bg text-neutral-dark dark:text-neutral-dark-text`}
        >
          <Header />
          <Suspense fallback={<Loading />}>
            <div className="px-5 pb-36">
              {children}
              <Player />
            </div>
          </Suspense>
        </body>
      </StoreProvider>
    </html>
  );
}
