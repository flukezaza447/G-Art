import { Link } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { logout, authenticateUser } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  // console.log("searchInput:", searchInput);

  const handleSearch = e => {
    e.preventDefault();
    setSearchInput("");
  };

  return (
    <div className="border border-b-slate-200">
      <nav className="flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        {/* BOX-1 left */}
        <div className="container flex justify-start items-center gap-6">
          {/* logo */}
          <div className="flex justify-center items-center">
            <Link to="/">
              <img
                src="https://1417094351.rsc.cdn77.org/articles/8850/8849289/thumbnail/large.gif?1"
                className="h-6 mr-3 sm:h-9 rounded-full"
                alt="Flowbite Logo"
              />
            </Link>
            <Link to="/tagPage">
              <p className="self-center text-lg font-semibold whitespace-nowrap dark:text-white hover:underline">
                Tag
              </p>
            </Link>
          </div>

          <form className="w-8/12" onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>

              <div className="block w-full h-10 flex items-center justify-between  text-sm text-gray-900 rounded-full bg-gray-50 focus:outline-none focus:ring-0">
                <input
                  type="search"
                  id="default-search"
                  // className="block w-full h-10 p-4 pl-10 text-sm text-gray-900 rounded-full bg-gray-50 focus:outline-none focus:ring-0"
                  className="border-none focus:ring-0 bg-gray-50 border-2 w-full rounded-full"
                  placeholder="Search Post name or Tag name..."
                  required
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />

                <div className="border-2 p-2 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer rounded-full">
                  <Link to="/" state={searchInput}>
                    <button type="button">Search</button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* BOX-2 right */}

        {authenticateUser ? (
          <DropdownProfile />
        ) : (
          <div className="w-1/4 flex justify-center items-center gap-4 ">
            <Link to="/loginPage">
              <button
                type="button"
                className="text-back border border-slate-950 hover:bg-gray-200 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Log in
              </button>
            </Link>

            <Link to="/rejisterPage">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
