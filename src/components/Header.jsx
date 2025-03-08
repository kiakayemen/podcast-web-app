import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex w-full flex-row items-center gap-8 justify-between md:justify-evenly border-b-2 dark:border-dark border-black mt-0 mb-10 px-5 pt-10 pb-10">
      <Menu />
      <ThemeToggle />
      <Link href={"/"}>
        <Image
          width={190}
          height={30}
          alt="Logo"
          src={"/Logo.svg"}
          className="grayscale dark:invert dark:contrast-150"
        />
      </Link>
    </div>
  );
};

export default Header;
