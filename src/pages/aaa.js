import { Link, useLocation } from "react-router-dom";
import Avatar from "../components/Avatar";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";
import { FaCamera } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/blank.png";
import { toast } from "react-toastify";
import useLoading from "../hooks/useLoading";
import { updatecoverImage } from "../apis/user-api";
import { requestFollow, deleteFollow } from "../apis/follow-api";
import Modal from "../components/modal/Modal";

export default function ProfilePage() {
  const location = useLocation();
  const {
    authenticateUser,
    setAuthenticatedUser,
    getUserData,
    getUsers,
    refreshUserData
  } = useAuth();
  // console.log("authenticateUser:", authenticateUser);
  // console.log("getUserData:", getUserData);
  // console.log("getUsers:", getUsers);

  const { startLoading, stopLoading } = useLoading();

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  console.log("selectedProfileId:", selectedProfileId);

  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  const selectedUserProfile = getUsers.find(
    user => user.id === selectedProfileId
  );
  console.log("selectedUserProfile:", selectedUserProfile);

  useEffect(() => {
    if (location.state) {
      setSelectedProfileId(location.state.id);
    } else {
      setSelectedProfileId(null);
    }
  }, [location.state]);

  const inputEl = useRef();
  const [file, setFile] = useState(null);
  // console.log("file:", file);

  const { postData, setPostData } = usePost();
  // console.log("postData:", postData);

  const userPosts = postData.filter(
    post => post.User.id === authenticateUser.id
  );
  // console.log("userPosts;", userPosts);

  const displayedUser = selectedProfileId
    ? postData.find(post => post.User.id === selectedProfileId)?.User
    : authenticateUser;

  const displayedUserPosts = selectedProfileId
    ? postData.filter(post => post.User.id === selectedProfileId)
    : userPosts;

  // console.log("displayedUser:", displayedUser);

  const handleClickSave = async () => {
    try {
      startLoading();

      const formData = new FormData();
      formData.append("coverImage", file);

      const res = await updatecoverImage(formData);

      setAuthenticatedUser(previousUser => {
        if (previousUser) {
          return {
            ...previousUser,
            coverImage: res.data.coverImage
          };
        } else {
          console.error("authenticateUser is not defined");
          return previousUser;
        }
      });
      toast.success("successfully updated!");
      stopLoading();
      setFile(null);
    } catch (err) {
      console.log(err.response?.data.message);
      toast.error("Failed to update");
    }
  };

  const handleClickFollow = async userId => {
    try {
      // console.log("userId:", userId);
      await requestFollow(userId);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickReject = async userId => {
    try {
      // console.log("userIdReject:", userId);

      await deleteFollow(userId);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className="relative ">
          <img
            className="w-full h-[400px] object-cover object-center"
            src={
              file
                ? URL.createObjectURL(file)
                : displayedUser?.coverImage || profileImage
            }
            alt=""
          />

          {!selectedProfileId ? (
            <div className="absolute bottom-10 right-10 flex items-center gap-2 p-2 rounded-md bg-[#000000BF] hover:bg-[#00000099]">
              <i className="text-white">
                <FaCamera />
              </i>
              <button
                className="text-white"
                onClick={() => inputEl.current.click()}
              >
                Edit Cover Photo
              </button>

              <input
                type="file"
                ref={inputEl}
                className="hidden"
                onChange={e => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          ) : null}

          {file && (
            <div className="absolute w-full top-0 bg-[#000000BF] p-2 flex items-center justify-between ">
              <div className="text-white flex items-center text-lg gap-2">
                <i>
                  <TiWorld />
                </i>
                <h1>Your cover photo is public</h1>
              </div>
              <div>
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setFile(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleClickSave()}
                >
                  Save changes
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex">
          <div className=" w-2/4 flex flex-col items-center ">
            {/* <div
              className={`absolute w-1/4 z-2 ${
                selectedProfileId ? "bottom-0 h-400px] " : "bottom-4"
              }  border-2 border-slate-400 bg-white flex flex-col items-center justify-start p-4 `}
            >
              <div>
                {displayedUser ? (
                  <Avatar src={displayedUser.profileImage} size="140px" />
                ) : (
                  <Avatar size="140px" />
                )}
              </div>

              {selectedProfileId ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <div>
                    <h1 className="text-xl font-bold">
                      {" "}
                      {displayedUser.firstName} {displayedUser.lastName}
                    </h1>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-xl hover:underline">
                      {
                        selectedUserProfile?.Accepter.map(el => el.Accepter)
                          .length
                      }{" "}
                      following
                    </p>

                    <button onClick={() => setOpenFollowing(!openFollowing)}>
                      <p className="text-xl hover:underline">
                        {
                          selectedUserProfile?.Requester.map(el => el.Requester)
                            .length
                        }{" "}
                        following
                      </p>
                    </button>

                    <div>
                      <h className="text-xl">
                        Email : {selectedUserProfile.email}
                      </h>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">
                      {" "}
                      {displayedUser.firstName} {displayedUser.lastName}
                    </h1>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <button onClick={() => setOpenFollower(!openFollower)}>
                      <p className="text-xl hover:underline">
                        {
                          getUserData?.userFollows?.filter(
                            followData =>
                              authenticateUser.id === followData.accepterId
                          ).length
                        }{" "}
                        followers
                      </p>
                    </button>

                    <button onClick={() => setOpenFollowing(!openFollowing)}>
                      <p className="text-xl hover:underline">
                        {
                          getUserData?.userFollows?.filter(
                            followData =>
                              authenticateUser.id === followData.requesterId
                          ).length
                        }{" "}
                        following
                      </p>
                    </button>

                    <div>
                      <h className="text-xl">Email : {displayedUser.email}</h>
                    </div>
                  </div>

                  <div>
                    <Link to="/editProfilePage">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit Your Profile
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div> */}

            <div
              className={`absolute w-1/4 z-2 bottom-4 border-2 border-slate-400 bg-white flex flex-col items-center justify-start p-4 `}
            >
              <div>
                {displayedUser ? (
                  <Avatar src={displayedUser.profileImage} size="140px" />
                ) : (
                  <Avatar size="140px" />
                )}
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold">
                    {" "}
                    {displayedUser.firstName} {displayedUser.lastName}
                  </h1>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <button onClick={() => setOpenFollower(!openFollower)}>
                    <p className="text-xl hover:underline">
                      {selectedProfileId
                        ? selectedUserProfile?.Accepter.map(el => el.Accepter)
                            .length
                        : getUserData?.userFollows?.filter(
                            followData =>
                              authenticateUser.id === followData.accepterId
                          ).length}{" "}
                      followers
                    </p>
                  </button>

                  <button onClick={() => setOpenFollowing(!openFollowing)}>
                    <p className="text-xl hover:underline">
                      {selectedProfileId
                        ? selectedUserProfile?.Requester.map(el => el.Requester)
                            .length
                        : getUserData?.userFollows?.filter(
                            followData =>
                              authenticateUser.id === followData.requesterId
                          ).length}{" "}
                      following
                    </p>
                  </button>

                  <div>
                    <h1 className="text-xl">Email : {displayedUser.email}</h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                {!selectedProfileId ? (
                  <div>
                    <Link to="/editProfilePage">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit Your Profile
                      </button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-2/4 flex flex-col mt-6 gap-4">
            <div className="flex justify-center items-center font-bold text-4xl">
              <h1>Your Post {displayedUserPosts.length}</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {displayedUserPosts.map((el, idx) => {
                const postImage = JSON.parse(el.image);
                return <CardPost key={idx} el={el} postImage={postImage} />;
              })}
            </div>
          </div>
        </div>
      </div>
      {openFollower && (
        <Modal
          header={` ${
            selectedProfileId
              ? selectedUserProfile?.Accepter.length
              : getUserData?.userFollows?.filter(
                  followData => authenticateUser.id === followData.accepterId
                ).length
          } followers`}
          isVisible={openFollower}
          onClose={() => setOpenFollower(false)}
        >
          {selectedProfileId
            ? getUserData?.userFollows
                ?.filter(
                  followData => selectedProfileId === followData.accepterId
                )
                .map((followData, index) => {
                  console.log("followData:", followData);

                  return (
                    <div
                      key={index}
                      className="w-[400px] flex items-center gap-4 p-2 border-b-2"
                    >
                      <div>
                        <Avatar
                          src={followData?.Requester?.profileImage}
                          size="60px"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>{`${followData?.Requester?.firstName} ${followData?.Requester?.lastName}`}</p>
                      </div>
                    </div>
                  );
                })
            : getUserData?.userFollows
                ?.filter(
                  followData => authenticateUser.id === followData.accepterId
                )
                .map((followData, index) => (
                  <Link
                    key={index}
                    onClick={() => setOpenFollower(false)}
                    to="/profilePage"
                    state={{ id: followData.Requester.id }}
                  >
                    <div className="w-[400px] flex items-center gap-4 p-2 border-b-2">
                      <div>
                        <Avatar
                          src={followData.Requester.profileImage}
                          size="60px"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>{`${followData.Requester.firstName} ${followData.Requester.lastName}`}</p>
                      </div>
                    </div>
                  </Link>
                ))}
          <div>
            {!selectedProfileId &&
              getUserData?.userFollows &&
              !getUserData.userFollows.some(
                followData => authenticateUser.id === followData.accepterId
              ) && (
                <div className="w-[400px]">
                  <p>ยังไม่มีผู้ติดตาม</p>
                </div>
              )}
          </div>
        </Modal>
      )}

      {openFollowing && (
        <Modal
          header={` ${
            getUserData?.userFollows?.filter(
              followData => authenticateUser.id === followData.requesterId
            ).length
          } following`}
          isVisible={openFollowing}
          onClose={() => setOpenFollowing(false)}
        >
          {selectedProfileId
            ? getUserData?.userFollows
                ?.filter(
                  followData => selectedProfileId === followData.accepterId
                )
                .map((followData, index) => {
                  console.log("followData", followData);
                  return (
                    <div
                      key={index}
                      className="w-[400px] flex items-center gap-4 p-2 border-b-2"
                    >
                      <div>
                        <Avatar
                          src={followData.Requester.profileImage}
                          size="60px"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>{`${followData.Requester.firstName} ${followData.Requester.lastName}`}</p>
                      </div>
                    </div>
                  );
                })
            : getUserData?.userFollows
                ?.filter(
                  followData => authenticateUser.id === followData.requesterId
                )
                .map((followData, index) => (
                  <Link
                    key={index}
                    onClick={() => setOpenFollower(false)}
                    to="/profilePage"
                    state={{ id: followData.Requester.id }}
                  >
                    <div className="w-[400px] flex items-center gap-4 p-2 border-b-2">
                      <div>
                        <Avatar
                          src={followData.Requester.profileImage}
                          size="60px"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>{`${followData.Requester.firstName} ${followData.Requester.lastName}`}</p>
                      </div>
                    </div>
                  </Link>
                ))}

          <div>
            {getUsers?.length === 0 && (
              <div className="w-[400px]">
                <p>ยังไม่มีผู้ติดตาม</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
