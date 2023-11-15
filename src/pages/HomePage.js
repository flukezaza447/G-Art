import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative">
      {/* BOX1-TOP */}
      <div className="flex justify-center items-center p-2 border-b-2">
        <h1 className="font-bold text-2xl">Logo</h1>
      </div>
      {/* BOX2-CENTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
        <div className="p-2">
          <Link to="/postDetailPage">
            <img
              className="h-auto max-w-full rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to="/postDetailPage">
            <img
              className="rounded-t-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
          </Link>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                nameImage
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              description
            </p>
          </div>
        </div>
      </div>

      {/* BOX3-BOTTOM */}
      <div className="absolute bg-white w-full h-[150px] bottom-0 flex flex-col items-center justify-center gap-4 border-2">
        <div className="">
          <p className="text-lg">
            <Link to="/rejisterPage">
              <span className="underline cursor-pointer">Sign up</span> or{" "}
            </Link>
            <Link to="/loginPage">
              <span className="underline cursor-pointer"> Sign in</span>{" "}
            </Link>{" "}
            to your account to view more work personalized to your preferences.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up With Email
            </button>
          </div>

          <div>
            <p className="text-[#959595]">or</p>
          </div>

          <div>
            <button
              type="button"
              className="rounded-full text-white bg-[#050708] px-5 py-2.5"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
            </button>
          </div>

          <div>
            <button
              type="button"
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
