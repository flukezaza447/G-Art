import Avatar from "../components/Avatar";

export default function PostDetailPage() {
  return (
    <div className="h-screen flex">
      {/* BOX-1-left */}
      <div className="w-4/5 flex flex-col justify-start items-center gap-10 mt-6">
        {/* row-1-TOP */}
        <div className="w-4/5">
          <div>
            <img
              className="w-full h-[400px] rounded-lg cursor-pointer"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
          </div>
        </div>

        {/* row-2-BOTTOM */}
        <div className="w-4/5 flex">
          {/* BOX-LEFT */}
          <div className="w-4/5 flex flex-col items-center justify-center gap-4">
            {/* check login */}
            <div className="w-full">
              <div className="w-full p-2">
                <p className="text-lg">Sign up to join the comment</p>
              </div>

              <div className="w-full flex justify-start items-center gap-2">
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

                {/* login apple */}
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

                {/* login facebook */}
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

            {/* comment User */}
            <div className="w-full flex items-center gap-4">
              <div>
                <Avatar size="60px" />
              </div>

              <div className="flex flex-col">
                <div>
                  <h1 className="font-bold">User name</h1>
                </div>
                <div>
                  <h1>comment</h1>
                </div>
              </div>
            </div>
          </div>

          {/* BOX-RIGHT */}
          <div className="w-4/5">
            <div className="border-2 border-slate-400 flex justify-center items-center p-3">
              <div className="w-1/4 flex flex-col justify-start items-start ml-2">
                <div>
                  <h1>user name</h1>
                </div>

                <div>
                  <Avatar size="60px" />
                </div>
              </div>

              <div className="w-3/4 flex flex-col gap-2">
                <div>
                  <h1>by user name</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-[250px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOX-2-right */}
      <div className="w-1/4 bg-gray-200"></div>
    </div>
  );
}
