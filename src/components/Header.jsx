import Link from "next/link";
const Header = () => {
  return (
    <div className="flex w-full flex-col items-center gap-8 justify-center shadow-md shadow-slate-700 mt-0 mb-10 pt-10 pb-10">
      <Link href={"/"}>
        <h1 className="text-2xl capitalize font-bold">podcast web app</h1>
      </Link>
    </div>
  );
};

export default Header;
