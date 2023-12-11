export default function AdminEditPost({ onClick }) {
  return (
    <>
      <div className="flex items-center justify-between border-2 mb-10 p-4 bg-gray-400">
        <div>
          <h1 className="text-xl font-bold">Admin Edit Post</h1>
        </div>

        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={onClick}
          >
            ยืนยัน
          </button>

          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white "
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </>
  );
}
