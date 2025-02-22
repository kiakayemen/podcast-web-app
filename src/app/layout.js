import { Suspense } from "react";
import Loading from "@/app/loading"
import "./globals.css";
import StoreProvider from "./storeProvider";
import Header from "@/components/Header"
import Player from "@/components/Player";
import localFont from 'next/font/local'

 
// Font files can be colocated inside of `app`
const IRANSans = localFont({
  src: '../../public/fonts/IRANSansWeb.woff2',
  display: 'swap',
})
 
export const metadata = {
  title: "Podcast App",
  // description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={IRANSans.className} >
      <StoreProvider>
      <body
        className={`select-none antialiased w-[100vw] h-full bg-white px-5 pb-40 `}
        >
          <Header />
        <Suspense fallback={<Loading/>}>
          {children}
          <Player />
        </Suspense>
      </body>
        </StoreProvider>
    </html>
  );
}
