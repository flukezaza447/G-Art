import { useState } from "react";
import { AiOutlineMail, AiFillLock, AiOutlineUser } from "react-icons/ai";
import validateRegister from "../validators/validate-register";
import Input from "../components/Input";

const initiaInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function LoginPage() {
  const [input, setInput] = useState(initiaInput);
  console.log("input:", input);

  const [error, setError] = useState({});

  const handleChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      const result = validateRegister(input);
      console.log("result:", result);
      if (result) {
        setError(result);
      }
    } catch (err) {
      // console.log(err, "err");
      // toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-200 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[400px] h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
              Sign Up
            </h3>

            <form
              className="space-y-6"
              action="#"
              autoComplete="off"
              onSubmit={handleSubmitForm}
            >
              <div>
                <Input
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChangeInput}
                  error={error.firstName}
                  titleLabel="firstname"
                  icon={<AiOutlineUser />}
                />
              </div>

              <div>
                <Input
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChangeInput}
                  error={error.lastName}
                  titleLabel="lastname"
                  icon={<AiOutlineUser />}
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChangeInput}
                  error={error.email}
                  titleLabel="Email"
                  icon={<AiOutlineMail />}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChangeInput}
                  error={error.password}
                  titleLabel="password"
                  icon={<AiFillLock />}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChangeInput}
                  error={error.confirmPassword}
                  titleLabel="Confirm Password"
                  icon={<AiFillLock />}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-2">
                <p> Already have an account? </p>
                <a
                  href="/loginPage"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Login?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
