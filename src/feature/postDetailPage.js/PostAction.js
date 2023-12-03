import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

export default function PostAction({
  isUserLiked,
  handleClickLikeButton,
  selectedPostData
}) {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center items-center gap-2">
          {" "}
          <button
            className={`text-2xl ${
              isUserLiked ? "text-indigo-600" : "text-black"
            } ${isUserLiked ? "hover:text-indigo-700" : "text-black"}`}
            onClick={handleClickLikeButton}
          >
            <BiSolidLike />
          </button>
          {selectedPostData?.Likes?.length > 0 && (
            <p className="text-lg">{selectedPostData?.Likes?.length}</p>
          )}
        </div>

        <div className="flex items-center items-center gap-2">
          <i>
            <FaCommentAlt />
          </i>
          {selectedPostData?.Comments?.length > 0 && (
            <p className="text-lg hover:underline">
              {selectedPostData?.Comments?.length} Comments
            </p>
          )}
        </div>
      </div>
    </>
  );
}
