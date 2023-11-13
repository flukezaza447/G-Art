import Avatar from "../components/Avatar";
import { BiMenu } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DropdownProfile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-4/12 justify-end items-center gap-4">
      {/* BOX-left */}
      <div className="flex justify-center items-center gap-4">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Share Your Picture
        </button>
        <FaBell />
      </div>

      {/* BOX-right */}
      <div className="flex items-center border-2 justify-between p-1 rounded-[50px] w-[100px] md:order-2 relative ">
        <i className="text-3xl ">
          <BiMenu />
        </i>
        <button
          type="button"
          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <Avatar size="32px" />
        </button>

        {/* <!-- Dropdown menu --> */}
        {isOpen && (
          <div
            className="z-50 absolute -left-20 top-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                firstName lastname
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                email
              </span>
            </div>

            <ul className="py-2" aria-labelledby="user-menu-button">
              <div>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <i>
                      <FaHouseUser />
                    </i>
                    <p>บัญชีผู้ใช้</p>
                  </Link>
                </li>

                <li>
                  <button
                    className="w-full flex items-center gap-3 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <i>
                      <MdLogout />
                    </i>
                    <p>ออกจากระบบ</p>
                  </button>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
