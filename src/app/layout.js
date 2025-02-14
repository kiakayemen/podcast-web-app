import "./globals.css";
import StoreProvider from "./storeProvider";
import Header from "@/components/Header"
import Player from "@/components/TestPlayer";


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
