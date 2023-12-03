import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardPost(key) {
  //   console.log("key:", key);
  return (
    <>
      <div
        key={key}
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div>
          <Link to={`/postDetailPage/${key.el?.id}`}>
            <img
              className="w-[436px] h-[306px] rounded-t-lg"
              src={key.postImage || JSON.parse(key.el?.image)[0]}
              alt=""
            />
          </Link>
        </div>
        <div className="flex justify-between items-center p-2">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {key.el?.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {key.el?.description}
            </p>
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center items-center gap-2">
              {" "}
              <button className="text-sm text-gray-600">
                <BiSolidLike />
              </button>
              <p className="text-sm">{key.el?.Likes?.length}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-sm text-gray-600">
                <FaCommentAlt />
              </button>

              <p className="text-sm hover:underline">
                {key.el?.Comments?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
