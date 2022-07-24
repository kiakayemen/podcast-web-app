import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import { IconContext } from "react-icons";

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Podcast Web App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
    <IconContext.Provider value={{className : "header-icons"}}>
        <Header />
    </IconContext.Provider>
        <main className={styles.main}>
          <h1>Hello World</h1>
        </main>
      </div>
  );
}
