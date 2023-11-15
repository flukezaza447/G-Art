export default function TagPage() {
  return (
    <div className="h-screen">
      <div className="w-full text-center p-4 border-b-2 border-slate-400">
        <h1 className="text-3xl font-bold">Tag</h1>
      </div>

      <div className="mt-10 flex flex-wrap">
        <div className=" w-1/4 flex flex-col items-center">
          <img
            className="rounded-t-lg w-[200px] cursor-pointer"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Valorant
          </h1>
        </div>

        <div className="w-1/4 flex flex-col items-center">
          <img
            className="rounded-t-lg w-[200px]"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            League of Legend
          </h1>
        </div>

        <div className=" w-1/4 flex flex-col items-center">
          <img
            className="rounded-t-lg w-[200px]"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Apex Legend
          </h1>
        </div>

        <div className="w-1/4 flex flex-col items-center">
          <img
            className="rounded-t-lg w-[200px]"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rocket League
          </h1>
        </div>
      </div>
    </div>
  );
}
