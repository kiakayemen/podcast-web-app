// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import Header from "@/components/Header"
import Player from "@/components/TestPlayer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Podcast App",
  // description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
      <body
        className={`select-none antialiased w-[100vw] h-full bg-white px-5 pb-12`}
        >
        <Header />
          {children}
        <Player />
      </body>
        </StoreProvider>
    </html>
  );
}
