import { SiGooglepodcasts } from "react-icons/si"
import {
	IoMdArrowRoundBack,
	IoSearch
} from "react-icons/io5"
import Router from "next/router";

Router.pathname === "/" ? <><SiGooglepodcasts /><span><h1>Podcasts</h1></span></> : <IoMdArrowRoundBack/>


const Header = () => {
	return (
		<div className="header">
			<div className="left">
				<SiGooglepodcasts />
				<span><h1>Podcasts</h1></span>
			</div>
			<div className="right">
				<IoSearch />
			</div>
		</div>
	)
}

export default Header