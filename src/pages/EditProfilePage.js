import { useRef, useState } from "react";
import Avatar from "../components/Avatar";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import validateEditProfile from "../validators/validate-editProfile";
import * as userApi from "../apis/user-api";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const { authenticateUser, userUpdateProfile } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const inputEl = useRef();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("Basicinformation");
  // console.log("selectedMenu:", selectedMenu);

  const [file, setFile] = useState(null);
  console.log("file:", file);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });
  console.log("inputData:", input);

  const handleChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleMenuClick = menu => {
    // console.log("menu:", menu);
    setSelectedMenu(menu);
  };

  const handleClickSave = async () => {
    try {
      startLoading();
      const result = validateEditProfile(input);
      console.log(result, "result------------------------");
      if (result) {
        setError(result);
      } else {
        console.log("no error");
        setError({});
      }

      const formData = new FormData();

      formData.append("profileImage", file);

      await userUpdateProfile(formData);

      await userApi.updateUserInfo({
        ...input,
        firstName: input.firstName || authenticateUser.firstName,
        lastName: input.lastName || authenticateUser.lastName,
        email: input.email || authenticateUser.email,
        mobile: input.mobile || authenticateUser.mobile
      });

      toast.success("successfully updated!");
      stopLoading();
      setFile(null);
      navigate(0);
    } catch (err) {
      console.log(err.response?.data.message);
      toast.error("Failed to update");
    }
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
                <Avatar
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : authenticateUser.profileImage
                  }
                  size={"120"}
                  onClick={() => inputEl.current.click()}
                />
                <button onClick={() => inputEl.current.click()}>
                  <p className="text-blue-600">Upload</p>

                  <input
                    type="file"
                    ref={inputEl}
                    className="hidden"
                    onChange={e => {
                      if (e.target.files[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
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
                      name="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First name"
                      value={input.firstName || authenticateUser.firstName}
                      onChange={handleChangeInput}
                      error={error.firstName}
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
                      name="lastName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last name"
                      value={input.lastName || authenticateUser.lastName}
                      onChange={handleChangeInput}
                      error={error.lastName}
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
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email"
                      value={input.email || authenticateUser.email}
                      onChange={handleChangeInput}
                      error={error.email}
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
                      name="mobile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Phone number"
                      value={input.mobile || authenticateUser.mobile}
                      onChange={handleChangeInput}
                      error={error.mobile}
                    />
                  </div>

                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleClickSave}
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
                    />
                  </div>

                  <button
                    type="button"
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
