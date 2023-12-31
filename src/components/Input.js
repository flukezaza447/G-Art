import {
  AiOutlineMail,
  AiFillLock,
  AiFillEye,
  AiFillEyeInvisible
} from "react-icons/ai";

export default function Input({
  type,
  icon,
  titleLabel,
  value,
  onChange,
  error,
  name,
  viewPassword,
  setShowPassword,
  showPassword
}) {
  return (
    <>
      <div className="relative z-0 w-full  group flex items-center justify-start">
        <input
          type={type || "text"}
          name={name}
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  ${
            error ? "border-red-600" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  ${
            error ? "is-invalid" : ""
          }`}
          placeholder=" "
          value={value}
          onChange={onChange}
          error={error}
        />

        <label
          htmlFor="floating_email"
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
            error ? "text-red-600" : ""
          }`}
        >
          {titleLabel}
        </label>

        <div>
          {viewPassword ? (
            <div>
              <button
                type="button"
                className=" top-2 right-2 text-gray-500 cursor-pointer"
                onClick={setShowPassword}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          ) : (
            <div>
              <p className={`${error ? "text-red-600" : ""}`}>{icon}</p>
            </div>
          )}
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </>
  );
}
