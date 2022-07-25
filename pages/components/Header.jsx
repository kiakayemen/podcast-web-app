import { SiGooglepodcasts } from "react-icons/si";
import {
	IoMdArrowRoundBack,
	IoSearch
} from "react-icons/io5";
import { useRouter } from "next/router";


const Header = () => {
	
	const router = useRouter()

	return (
		<div className="header">
			<div className="left">
				{router.pathname === "/" ? <><SiGooglepodcasts /><span><h1>Podcasts</h1></span></> : <IoMdArrowRoundBack />}
			</div>
			<div className="right">
				<IoSearch />
			</div>
		</div>
	)
}

export default Header