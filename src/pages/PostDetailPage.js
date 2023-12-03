import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import usePost from "../hooks/usePost";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import {
  unlike,
  createLike,
  getCreatePostById,
  createComment,
  getDataPost,
  editComment,
  deleteCommentId
} from "../apis/post-api";
import { getUserInfoById } from "../apis/user-api";
import { requestFollow, deleteFollow } from "../apis/follow-api";
import { useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCommentAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import PostAction from "../feature/postDetailPage.js/PostAction";

export default function PostDetailPage() {
  const { postId } = useParams();
  // console.log("postId:", postId);

  const [title, setTitle] = useState("");
  // console.log("title:", title);

  const [editedComment, setEditedComment] = useState("");
  // console.log("editedComment:", editedComment);

  const { postData, setPostData } = usePost();
  // console.log("postData:", postData);

  const { authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser);

  const navigate = useNavigate();

  const [selectedComment, setSelectedComment] = useState(null);
  // console.log("selectedComment:", selectedComment);

  const [selectedDeleteComment, setSelectedDeleteComment] = useState(null);
  // console.log("selectedDeleteComment:", selectedDeleteComment);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalDeleteComment, setShowModalDeleteComment] = useState(false);

  const [postImageId, setPostImageId] = useState([]);
  // console.log("postImageId:", postImageId);

  const [userFollowById, setuserFollowById] = useState([]);
  // console.log("userFollowById:", userFollowById);

  const selectedPostData = postData?.find(el => el?.id === +postId);
  // console.log("selectedPostData:", selectedPostData);

  const userId = selectedPostData?.User?.id;
  // console.log("userId:", userId);

  const userWithMatchingId = postImageId?.pureCreatePost?.find(
    user => user.id === userId
  );

  // console.log("userWithMatchingId:", userWithMatchingId);

  const isFollowing = userFollowById?.userFollows
    ? userFollowById?.userFollows?.some(
        follow => follow?.Requester?.id === authenticateUser?.id
      )
    : false;

  const fetchUserFollowById = async () => {
    try {
      const res = await getUserInfoById(userId);
      setuserFollowById(res?.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  useEffect(() => {
    fetchUserFollowById();
  }, []);

  useEffect(() => {
    const fetchgetCreatePostById = async () => {
      const res = await getCreatePostById(userId || null);
      setPostImageId(res?.data);
    };

    fetchgetCreatePostById();
  }, [userId, postData]);

  const handleClickFollow = async () => {
    try {
      if (!authenticateUser) {
        navigate("/loginPage");
      }
      await requestFollow(userId);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickReject = async () => {
    await deleteFollow(userId);
    navigate(0);
  };

  const isUserLiked = selectedPostData?.Likes?.some(
    like => like?.User?.id === authenticateUser?.id
  );
  // console.log("isUserLiked:", isUserLiked);

  const handleClickLikeButton = async () => {
    if (isUserLiked) {
      await unlike(postId);
      setPostData(previousPosts => {
        const deepClone = structuredClone(previousPosts);
        // console.log("deepCloneUnlike:", deepClone);
        const idx = deepClone.findIndex(el => el.id === +postId);
        // console.log("idxUnlike:", idx);
        deepClone[idx].Likes = deepClone[idx].Likes.filter(
          el => el.userId !== authenticateUser.id
        );
        return deepClone;
      });
    } else {
      const res = await createLike(postId);
      console.log("res:", res.data.like);
      setPostData(previousPosts => {
        const deepClone = structuredClone(previousPosts);
        // console.log("deepCloneCreateLike:", deepClone);
        const idx = deepClone.findIndex(el => el.id === +postId);
        // console.log("idxCreateLike:", idx);
        deepClone[idx].Likes.push(res.data.like);
        return deepClone;
      });
    }
  };

  const handleCreatePost = async () => {
    try {
      const res = await createComment({
        title: title,
        postId: postId,
        userId: userId
      });
      console.log("res:", res);
      setTitle("");
      navigate(0);

      // setPostData(previousPosts => {
      //   const deepClone = structuredClone(previousPosts);
      //   // console.log("deepCloneCreateLike:", deepClone);
      //   const idx = deepClone.findIndex(el => el.id === +postId);
      //   // console.log("idxCreateLike:", idx);
      //   deepClone[idx].Comments.push(res.data.comment);
      //   return deepClone;
      // });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextareaKeyDown = e => {
    if (e.key === "Enter") {
      handleCreatePost();
    }
  };

  const handleEditComment = async () => {
    try {
      await editComment({
        title: editedComment,
        postId: postId,
        userId: userId,
        id: selectedComment
      });

      setEditedComment("");
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickDeleteComment = async () => {
    await deleteCommentId({
      id: selectedDeleteComment,
      userId: userId
    });
    navigate(0);
  };

  return (
    <div className="flex mb-20">
      {/* BOX-1-left */}

      <div className="w-4/5 flex flex-col justify-start items-center gap-10 mt-6">
        {/* row-1-TOP */}
        <div className="w-4/5 flex flex-col gap-5">
          <div>
            <img
              className="w-full h-[400px] rounded-lg cursor-pointer"
              src={
                selectedPostData?.image
                  ? JSON.parse(selectedPostData.image)[0]
                  : ""
              }
              alt=""
            />
          </div>
          {authenticateUser ? (
            <PostAction
              isUserLiked={isUserLiked}
              handleClickLikeButton={handleClickLikeButton}
              selectedPostData={selectedPostData}
            />
          ) : null}
        </div>
        {/* row-2-BOTTOM */}
        <div className="w-4/5 flex gap-6">
          {/* BOX-LEFT */}
          <div className="w-4/5 flex flex-col items-center justify-start gap-4">
            {/* check login */}
            {authenticateUser ? (
              <div className="w-full flex items-center gap-4">
                <div>
                  <Avatar src={authenticateUser.profileImage} size="60px" />
                </div>

                <div className="w-full flex flex-col">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Comment
                  </label>
                  <input
                    type="text"
                    name="title"
                    rows="4"
                    className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                  ></input>
                </div>
              </div>
            ) : (
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
            )}

            {/* comment User */}
            {selectedPostData?.Comments?.map((el, idx) => {
              const isCurrentUserComment = el?.User?.id === userId;

              return (
                <div
                  key={idx}
                  className={`w-full flex items-center gap-4 ${
                    isCurrentUserComment ? "border-2 rounded-lg p-2" : ""
                  }`}
                >
                  <div>
                    <Avatar size="60px" src={el?.User?.profileImage} />
                  </div>

                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-start items-center gap-4">
                      <h1 className="font-bold">{`${el?.User?.firstName} ${el?.User?.lastName}`}</h1>
                      <h1>
                        {new Date(el?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </h1>
                    </div>

                    <div className="w-full">
                      {selectedComment === el?.id ? (
                        // แสดงแบบแก้ไข comment
                        <div className="w-full flex flex-col items-center justify-center gap-2">
                          <textarea
                            className="w-full"
                            value={editedComment || el?.title}
                            onChange={e => setEditedComment(e.target.value)}
                          />

                          <div>
                            <button
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              onClick={handleEditComment}
                            >
                              ยืนยัน
                            </button>

                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              onClick={() => setSelectedComment(false)}
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      ) : (
                        // แสดง comment ปกติ
                        <div className="whitespace-pre-line break-all">
                          <h1>{el?.title}</h1>
                        </div>
                      )}
                    </div>
                  </div>

                  {isCurrentUserComment && (
                    <div className="flex">
                      <button
                        className="p-2 text-lg hover:text-red-600"
                        onClick={() => {
                          if (selectedComment === el?.id) {
                            setSelectedComment(null);
                          } else {
                            setSelectedComment(el?.id);
                          }
                        }}
                      >
                        <CiEdit />
                      </button>

                      <button
                        className="p-2 text-lg hover:text-red-600"
                        onClick={() => {
                          setSelectedDeleteComment(el?.id);
                          setShowModalDeleteComment(!showModalDeleteComment);
                        }}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* BOX-RIGHT */}
          <div className="w-4/5">
            {authenticateUser && authenticateUser?.id === userId ? null : (
              <div className="border-2 border-slate-400 flex justify-center items-center p-3">
                <div className="w-1/4 flex flex-col justify-start items-start ml-2">
                  <div>
                    <h1>Owner</h1>
                  </div>
                  <Link to={`/profilePageId/${userId}`}>
                    <div>
                      <Avatar
                        src={selectedPostData?.User.profileImage}
                        size="60px"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col justify-center  gap-2">
                  <div className="flex gap-2">
                    <h1>By :</h1>
                    <h1 className="font-bold">
                      {selectedPostData?.User.firstName}{" "}
                      {selectedPostData?.User.lastName}
                    </h1>
                  </div>
                  {authenticateUser ? (
                    isFollowing ? (
                      <button
                        type="button"
                        className="w-[250px] text-white bg-green-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                        onClick={() => setShowModalConfirm(!showModalConfirm)}
                      >
                        ติดตามแล้ว
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[250px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                        onClick={handleClickFollow}
                      >
                        ติดตาม
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      className="w-[250px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                    >
                      ติดตาม
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="border-2 border-slate-400 mt-4 p-3 flex flex-col gap-4">
              <div>
                <div>
                  <h1 className="text-lg font-bold">
                    {selectedPostData?.title && (
                      <span>
                        {selectedPostData?.title.charAt(0).toUpperCase()}
                        {selectedPostData?.title.slice(1)}
                      </span>
                    )}
                  </h1>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <BiSolidLike /> :<p>{selectedPostData?.Likes?.length}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCommentAlt /> :
                    <p>{selectedPostData?.Comments?.length}</p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="font-bold text-sm">Description</h1>
                <p>{selectedPostData?.description}</p>
              </div>
            </div>

            <div className="border-2 border-slate-400 mt-4 p-3">
              <p className="text-base font-bold">
                <span>#</span>
                {selectedPostData?.Tag.TagName && (
                  <span className="cursor-pointer hover:underline">
                    {selectedPostData?.Tag.TagName.charAt(0).toUpperCase()}
                    {selectedPostData?.Tag.TagName.slice(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOX-2-right */}
      <div className="w-1/4 flex flex-col gap-6 items-center p-2">
        <div>
          <h1 className="text-2xl font-bold">Recommend Picture</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {userWithMatchingId?.Posts?.map((post, index) => (
            <div>
              <Link to={`/postDetailPage/${post?.id}`}>
                <img
                  key={index}
                  className="h-auto max-w-full rounded-lg transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110"
                  src={JSON.parse(post?.image)[0]}
                  alt={`Image ${index + 1}`}
                />
              </Link>
            </div>
          ))}
        </div>

        {showModalConfirm && (
          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={handleClickReject}
            header="เลิกติดตาม"
            text='คุณต้องการ "เลิกติดตาม" หรือไม่'
          />
        )}

        {showModalDeleteComment && (
          <ModalConfirmSave
            isVisible={showModalDeleteComment}
            onClose={() => setShowModalDeleteComment(false)}
            onSave={handleClickDeleteComment}
            header="ลบคอมเมนต์"
            text='คุณต้องการ "ลบคอมเมนต์" หรือไม่'
          />
        )}
      </div>
    </div>
  );
}
