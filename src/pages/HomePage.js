import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
export default function HomePage() {
  const { postData } = usePost();
  console.log("postData:", postData);

  return (
    <div className="relative">
      {/* BOX1-TOP */}
      <div className="flex justify-center items-center p-2 border-b-2">
        <h1 className="font-bold text-2xl">Logo</h1>
      </div>
      {/* BOX2-CENTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
        {postData.map((el, idx) => {
          const postImage = JSON.parse(el.image);
          return (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to="/postDetailPage">
                <img className="rounded-t-lg" src={postImage} alt="" />
              </Link>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {el.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {el.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
