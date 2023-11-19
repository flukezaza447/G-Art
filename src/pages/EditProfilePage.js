import { useRef, useState } from "react";
import Avatar from "../components/Avatar";
import useAuth from "../hooks/useAuth";

export default function CreatePostPage() {
  const inputEl = useRef();
  const { authenticateUser } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState("Basicinformation");
  // console.log("selectedMenu:", selectedMenu);

  const handleMenuClick = menu => {
    // console.log("menu:", menu);
    setSelectedMenu(menu);
  };

  return (
    <div className="w-full h-screen bg-red-200 flex justify-center items-center p-2">
      <div className="w-4/5 h-[600px] bg-white flex">
        <nav className="w-1/5 border-slate-200 border-r-2">
          <ul className="flex flex-col justify-center items-start gap-4 p-2">
            <li
              onClick={() => handleMenuClick("Basicinformation")}
              className={`hover:underline ${
                selectedMenu === "Basicinformation" ? "text-red-500" : ""
              }`}
            >
              Basic information
            </li>
            <li
              onClick={() => handleMenuClick("ChangePassword")}
              className={`hover:underline ${
                selectedMenu === "Basicinformation" ? "" : "text-red-500"
              }`}
            >
              Change Password
            </li>
          </ul>

          <div className="border-r-2"></div>
        </nav>

        {selectedMenu === "Basicinformation" && (
          <div className="w-4/5 pl-4 pt-2 flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold">Basic information</h1>
            </div>

            <div className="flex gap-20">
              <div className="flex flex-col p-2 gap-2">
                <Avatar size={"120"} onClick={() => inputEl.current.click()} />
                <button onClick={() => inputEl.current.click()}>
                  <p className="text-blue-600">Upload</p>

                  <input type="file" ref={inputEl} className="hidden" />
                </button>
              </div>

              <form className="w-full">
                <div className="w-2/5 flex flex-col gap-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={authenticateUser.firstName}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="Last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={authenticateUser.lastName}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="Email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={authenticateUser.email}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="Phone number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={authenticateUser.mobile}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    ยืนยัน
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedMenu !== "Basicinformation" && (
          <div className="w-4/5 pl-4 pt-2 flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold">Basic information</h1>
            </div>

            <div className="flex gap-20">
              <form className="w-full">
                <div className="w-2/5 flex flex-col gap-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Old Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Old Password"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="New Password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Old Password"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ConfirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Old Password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    ยืนยัน
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
