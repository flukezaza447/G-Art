import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import Input from "../components/Input";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { userLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      await userLogin(email, password);
      navigate("/");

      toast.success("login success");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-200 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[400px] h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
              Sign in
            </h3>

            <form className="space-y-6" action="#" onSubmit={handleSubmitForm}>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  titleLabel="Email"
                  icon={<AiOutlineMail />}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  titleLabel="password"
                  icon={<AiFillLock />}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign In
                </button>
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-2">
                <p> Don't have an account?</p>
                <a
                  href="/rejisterPage"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
