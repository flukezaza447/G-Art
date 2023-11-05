import "flowbite";
export default function Footer() {
  return (
    <footer className="m-[0] p-[0] box-border bg-fixed bg-white">
      <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <button className="hover:underline">Project</button>. Thanapon
          Jaiauea
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <button className="mr-4 hover:underline md:mr-6 ">About</button>
          </li>
          <li>
            <button className="hover:underline">Contact</button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
