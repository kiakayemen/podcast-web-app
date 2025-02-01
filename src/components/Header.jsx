import Link from "next/link";
const Header = () => {
  return (
    <div className="flex w-full flex-col items-center gap-8 justify-center border-b-2 border-black mt-0 mb-10 pt-10 pb-10">
      <Link href={"/"}>
        <h1 className="text-2xl capitalize font-bold">podcast web app</h1>
      </Link>
    </div>
  );
};

export default Header;
