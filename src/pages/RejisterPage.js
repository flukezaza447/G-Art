import FormLoginAndRejister from "../components/FormLoginAndRejister";
import { AiOutlineMail, AiFillLock, AiOutlineUser } from "react-icons/ai";

export default function LoginPage() {
  const iconE = <AiOutlineMail />;
  const iconP = <AiFillLock />;
  const iconU = <AiOutlineUser />;
  return (
    <div className="fixed inset-0 bg-red-200 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[400px] h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
              Sign Up
            </h3>

            <FormLoginAndRejister
              iconE={iconE}
              iconP={iconP}
              iconU={iconU}
              title="Email"
              password="Password"
              nameButton="Sign Up"
              firstname="First Name"
              lastname="Last Name"
              cfPassword="Confirm Password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
