import "flowbite";
import PictureUser from "../assets/blank.png";
import { FaHouseUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DropdownProfile() {
  return (
    <div className="flex w-4/12 justify-end items-center gap-4">
      {/* BOX-left */}
      <div className="flex justify-center items-center gap-4">
        <Link to="createPostPage">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Share Your Picture
          </button>
        </Link>
        <FaBell />
      </div>

      {/* BOX-right */}
      <div>
        <img
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer"
          src={PictureUser}
          alt="User dropdown"
        />

        <div
          id="userDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/profilePage"
                className="flex items-center gap-3 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <i>
                  <FaHouseUser />
                </i>
                <p>บัญชีผู้ใช้</p>
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              ออกจากระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
