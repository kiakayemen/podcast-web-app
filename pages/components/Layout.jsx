import Header from "./Header";
import Head from "next/head";
import { IconContext } from "react-icons";
import styles from "../../styles/Home.module.css";


const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Podcast Web App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<IconContext.Provider value={{ className: "header-icons" }}>
				<Header />
			</IconContext.Provider>
			{children}
		</div>
	)
}

export default Layout