import { Link, useLocation, useNavigate } from "react-router-dom";
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

export default function ProfilePage() {
  const { authenticateUser, setAuthenticatedUser } = useAuth();
  console.log("authenticateUser:", authenticateUser);

  const { startLoading, stopLoading } = useLoading();

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  console.log("selectedProfileId:", selectedProfileId);

  const location = useLocation();

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

  const { postData } = usePost();
  console.log("postData:", postData);

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

  return (
    <>
      <div>
        <div className="relative ">
          <img
            className="w-full h-[300px] object-cover"
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
                แก้ไขรุปภาพหน้าปก
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
            <div className="absolute w-full top-0 bg-[#000000BF] p-2 flex items-center justify-between">
              <div className="text-white flex items-center text-lg gap-2">
                <i>
                  <TiWorld />
                </i>
                <h1>รูปหน้าปกของคุณเป็นสาธารณะ</h1>
              </div>
              <div>
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setFile(null)}
                >
                  ยกเลิก
                </button>

                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleClickSave()}
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex">
          <div className=" w-2/4 flex flex-col items-center">
            <div className="absolute w-1/4 h-full z-10 -bottom-60  border-2 border-slate-400 bg-white flex flex-col items-center justify-start p-4 ">
              <div>
                {displayedUser ? (
                  <Avatar src={displayedUser.profileImage} size="70px" />
                ) : (
                  <Avatar size="70px" />
                )}
              </div>

              {selectedProfileId ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h1 className="text-xl font-bold">
                    {" "}
                    {displayedUser.firstName} {displayedUser.lastName}
                  </h1>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h1 className="text-xl font-bold">
                    {" "}
                    {displayedUser.firstName} {displayedUser.lastName}
                  </h1>

                  <Link to="/editProfilePage">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Edit Your Profile
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex justify-center items-center font-bold text-4xl">
              <h1>Your Post</h1>
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
    </>
  );
}
