import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex w-full flex-row items-center gap-8 justify-between md:justify-evenly border-b-2 border-black mt-0 mb-10 px-5 pt-10 pb-10">
      <Menu />
      <Link href={"/"}>
        <Image
          width={190}
          height={30}
          alt="Logo"
          src={"/Logo.svg"}
          className="grayscale"
        />
      </Link>
    </div>
  );
};

export default Header;
