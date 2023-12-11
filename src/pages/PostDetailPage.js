import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import usePost from "../hooks/usePost";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import {
  unlike,
  createLike,
  createComment,
  editComment,
  deleteCommentId,
  deletePost
} from "../apis/post-api";
import { requestFollow, deleteFollow } from "../apis/follow-api";
import { useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCommentAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import PostAction from "../feature/postDetailPage.js/PostAction";
import CardPost from "../components/CardPost";
import useTag from "../hooks/useTag";
import useLoading from "../hooks/useLoading";
import AdminEditPost from "../feature/admin/adminEditPost";

export default function PostDetailPage() {
  const { postId } = useParams();
  // console.log("postId:", postId);
  const { startLoading, stopLoading } = useLoading();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  // console.log("title:", title);

  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);

  const [editedComment, setEditedComment] = useState("");
  // console.log("editedComment:", editedComment);

  const { postData, setPostData } = usePost();
  // console.log("postData:", postData);

  const { authenticateUser, getUserData, refreshUserData } = useAuth();
  // console.log("authenticateUser:", authenticateUser);
  console.log("getUserData:", getUserData);

  const [selectedComment, setSelectedComment] = useState(null);
  // console.log("selectedComment:", selectedComment);

  const [selectedDeleteComment, setSelectedDeleteComment] = useState(null);
  // console.log("selectedDeleteComment:", selectedDeleteComment);

  const [isFollowing, setIsFollowing] = useState(false);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalDeleteComment, setShowModalDeleteComment] = useState(false);
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);

  const [selectedPostData, setSelectedPostData] = useState(null);
  // console.log("selectedPostData:", selectedPostData);

  useEffect(() => {
    const selectedPost = postData?.find(el => el?.id === +postId);
    setSelectedPostData(selectedPost);
  }, [postId, postData]);

  const userId = selectedPostData?.User?.id;
  // console.log("userId:", userId);

  const tagId = selectedPostData?.Tag?.id;
  // console.log("tagId:", tagId);

  useEffect(() => {
    const fetchUserInfoById = async () => {
      try {
        if (authenticateUser && authenticateUser.id) {
          const isFollowing =
            (getUserData.userFollows?.length > 0 &&
              getUserData.userFollows.some(
                follow =>
                  follow.accepterId === userId &&
                  follow.status === "ALREADYFOLLOW"
              )) ||
            (getUserData?.Follows &&
              getUserData.Follows.accepterId === userId &&
              getUserData.Follows.status === "ALREADYFOLLOW");

          setIsFollowing(isFollowing);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfoById();
  }, [authenticateUser, userId]);

  const handleClickFollow = async () => {
    try {
      if (!authenticateUser) {
        navigate("/loginPage");
      }
      await requestFollow(userId);
      setIsFollowing(true);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickReject = async () => {
    try {
      await deleteFollow(userId);

      setIsFollowing(false);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
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
      if (!authenticateUser) {
        navigate("/loginPage");
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
    }
  };

  const handleCreateComment = async () => {
    try {
      const res = await createComment({
        title: title,
        postId: postId,
        userId: userId
      });
      console.log("res:", res);
      setTitle("");
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextareaKeyDown = e => {
    if (e.key === "Enter") {
      handleCreateComment();
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

      const updatedComments = selectedPostData.Comments.map(comment => {
        if (comment.id === selectedComment) {
          // ใช้ข้อมูลที่แก้ไขแทนที่ข้อมูลเดิม
          return { ...comment, title: editedComment };
        }
        return comment;
      });

      setSelectedPostData(prevData => ({
        ...prevData,
        Comments: updatedComments
      }));

      setEditedComment("");
      setSelectedComment(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickDeletePost = async () => {
    try {
      startLoading();
      await deletePost({
        id: postId,
        userId: userId,
        tagId: tagId
      });
      stopLoading();
      await setShowModalSuccess(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDeleteComment = async () => {
    try {
      await deleteCommentId({
        id: selectedDeleteComment,
        userId: userId
      });

      // Filter out the deleted comment from postData
      setPostData(previousPosts => {
        const deepClone = structuredClone(previousPosts);
        const postIndex = deepClone.findIndex(post => post.id === +postId);
        const updatedComments = deepClone[postIndex].Comments.filter(
          comment => comment.id !== selectedDeleteComment
        );
        deepClone[postIndex].Comments = updatedComments;
        return deepClone;
      });

      // Optionally, you can reset the selectedDeleteComment state
      setSelectedDeleteComment(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      {authenticateUser?.isAdmin === true ? (
        <AdminEditPost
          onClick={() => {
            setShowModalDeletePost(!showModalDeletePost);
          }}
        />
      ) : null}

      <div className="flex mb-20">
        {/* BOX-1-left */}

        <div className="w-full flex flex-col justify-start items-center  mt-6">
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
            ) : (
              <PostAction
                isUserLiked={isUserLiked}
                handleClickLikeButton={handleClickLikeButton}
                selectedPostData={selectedPostData}
              />
            )}
          </div>

          {/* row-2-BOTTOM */}
          <div className="w-4/5 flex flex-col gap-6">
            {/* BOX-TOP */}
            <div className="w-4/5">
              {authenticateUser && authenticateUser?.id === userId ? null : (
                <div className="flex justify-start items-center p-3">
                  <div className="w-1/4 flex flex-col justify-start items-start ml-2">
                    <div>
                      <h1>Owner</h1>
                    </div>
                    <Link
                      to="/profilePage"
                      state={{ id: selectedPostData?.User.id }}
                    >
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
                          onClick={handleClickReject}
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
                        onClick={handleClickFollow}
                      >
                        ติดตาม
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 flex flex-col gap-4">
                <div>
                  <div>
                    <h1 className="text-lg font-bold">
                      {selectedPostData?.title}
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

              <div className="mt-4 p-3">
                {dataTag.map((el, idx) => (
                  <p className="text-base font-bold" key={idx}>
                    {selectedPostData?.Tag.TagName === el.TagName && (
                      <Link key={idx} to="/" state={{ id: el.TagName }}>
                        <span>#</span>
                        <span className="cursor-pointer hover:underline">
                          {el?.TagName.charAt(0).toUpperCase()}
                          {el?.TagName.slice(1)}
                        </span>
                      </Link>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* BOX-BOTTOM */}
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
              {selectedPostData?.Comments.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ).map((el, idx) => {
                const isCurrentUserComment =
                  el?.User?.id === authenticateUser?.id;

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
          </div>
        </div>

        {/* BOX-2-right */}
        <div className="w-2/4 flex flex-col gap-6 items-center p-2">
          <div>
            <h1 className="text-2xl font-bold">Recommend Picture</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {postData
              .sort((a, b) => b.Likes.length - a.Likes.length)
              .slice(0, 5)
              .map((post, idx) => (
                <div key={idx}>
                  <Link to={`/postDetailPage/${post.id}`}>
                    <CardPost el={post} key={idx} size="w-[200px] h-[200px]" />
                  </Link>
                </div>
              ))}
          </div>

          {showModalDeleteComment && (
            <ModalConfirmSave
              isVisible={showModalDeleteComment}
              onClose={() => setShowModalDeleteComment(false)}
              onSave={handleClickDeleteComment}
              header="ลบคอมเมนต์"
              text='คุณต้องการ "ลบคอมเมนต์" หรือไม่'
            />
          )}

          {showModalDeletePost && (
            <ModalConfirmSave
              isVisible={showModalDeletePost}
              onClose={() => setShowModalDeletePost(false)}
              onSave={handleClickDeletePost}
              header="ลบโพสต์"
              text='คุณต้องการ "ลบโพสต์" หรือไม่'
            />
          )}
        </div>
      </div>
      {showModalSuccess && <ModalSuccess urlPath="/" />}
    </div>
  );
}
