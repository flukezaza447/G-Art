import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFillFilePostFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import usePost from "../hooks/usePost";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import { useState } from "react";
import ModalSuccess from "../components/modal/ModalSuccess";
import useLoading from "../hooks/useLoading";
import { deletePost } from "../apis/post-api";
import FromTable from "../components/FromTable";
import useAuth from "../hooks/useAuth";

export default function AdminPage() {
  const { postData, setPostData } = usePost();
  // console.log("postData:", postData);
  const { getUsers } = useAuth();
  // console.log("getUsers:", getUsers);
  const { startLoading, stopLoading } = useLoading();

  const [selectedMenu, setSelectedMenu] = useState("post");

  const [showModalDeletePost, setShowModalDeletePost] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [tagIdToDelete, setTagIdToDelete] = useState(null);

  const icon = <RiDeleteBin5Fill />;

  const handleMenuClick = menu => {
    setSelectedMenu(menu);
  };

  const handleClickDeletePost = async () => {
    try {
      startLoading();
      await deletePost({
        id: postIdToDelete,
        userId: userIdToDelete,
        tagId: tagIdToDelete
      });
      stopLoading();

      await setPostData(prevPostData =>
        prevPostData.filter(post => post.id !== postIdToDelete)
      );
      setShowModalDeletePost("");
      setShowModalDeleteUser("");
      setShowModalDeleteUser("");
      setShowModalSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDeleteUser = async () => {
    try {
      // console.log("userId----", useruserId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-1/5 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <button
              href="#"
              className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                selectedMenu === "post" ? "bg-gray-300" : null
              }`}
              onClick={() => handleMenuClick("post")}
            >
              <BsFillFilePostFill />
              <span className="ms-3">Post</span>
            </button>
          </li>

          <li>
            <button
              href="#"
              className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                selectedMenu === "user" ? "bg-gray-300" : null
              }`}
              onClick={() => handleMenuClick("user")}
            >
              <FaRegUser />
              <span className="ms-3">User</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Post  */}
      {selectedMenu === "post" && (
        <div className="w-full flex flex-col gap-4 p-4">
          <div className="flex justify-center items-center font-bold text-2xl">
            <h1>List Post : {postData.length}</h1>
          </div>

          <FromTable
            titleImage="Image"
            titleName="Name"
            titleOwner="Owner"
            titlePostDate="Post Date"
            data={postData}
            setShowModal={setShowModalDeletePost}
            showModal={showModalDeletePost}
            postId={setPostIdToDelete}
            postuUserId={setUserIdToDelete}
            tagId={setTagIdToDelete}
            icon={icon}
          />
        </div>
      )}

      {/* User  */}
      {selectedMenu === "user" && (
        <div className="w-full flex flex-col gap-4 p-4">
          <div className="flex justify-center items-center font-bold text-2xl">
            <h1>List User : {getUsers.length}</h1>
          </div>

          <FromTable
            titleImage="Image"
            titleName="Name"
            titleEmail="Email"
            titleLastLogin="Last logged in"
            userId={setSss}
            data={getUsers}
            icon={icon}
            setShowModal={setShowModalDeleteUser}
          />
        </div>
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

      {showModalDeleteUser && (
        <ModalConfirmSave
          isVisible={showModalDeleteUser}
          onClose={() => setShowModalDeleteUser(false)}
          onSave={handleClickDeleteUser}
          header="ลบผู้ใช้งาน"
          text='คุณต้องการ "ลบผู้ใช้งาน" หรือไม่'
        />
      )}

      {showModalSuccess && <ModalSuccess />}
    </div>
  );
}
