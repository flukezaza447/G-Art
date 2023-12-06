import { BiSolidLike } from "react-icons/bi";

export default function PostAction({
  isUserLiked,
  handleClickLikeButton,
  selectedPostData
}) {
  return (
    <>
      <div className="flex items-center justify-end">
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
    </>
  );
}
