import "flowbite";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="border border-b-slate-200">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto ">
          {/* logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://1417094351.rsc.cdn77.org/articles/8850/8849289/thumbnail/large.gif?1"
              className="h-6 mr-3 sm:h-9 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Brand
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
