import useAuth from "../hooks/useAuth";
import useTag from "../hooks/useTag";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import { createTage, deleteTag } from "../apis/tag-api";
import useLoading from "../hooks/useLoading";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import validateCreateTag from "../validators/validate-createTag";
import { useNavigate } from "react-router-dom";

export default function TagPage() {
  const { authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser);

  const navigate = useNavigate();
  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);

  const { startLoading, stopLoading } = useLoading();

  const inputImg = useRef();
  const [open, setOpen] = useState(false);
  // console.log("open:", open);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [tagIdToDelete, setTagIdToDelete] = useState(null);
  // console.log("tagIdToDelete:", tagIdToDelete);

  const tagId = tagIdToDelete;

  const imageTypes = ["image/png", "image/jpeg"];

  const [arrayImage, setArrayImage] = useState([]);
  // console.log("arrayImage:", arrayImage);

  const [arrayImageURL, setArrayImageURL] = useState([]);

  const [input, setInput] = useState({
    TagName: "",
    image: ""
  });
  // console.log("input:", input);

  const [error, setError] = useState({});
  console.log("error:", error);

  const handleChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const fileList = e.target.files;
    // console.log("fileList:", fileList);

    const cloneFile = [...arrayImage];
    // console.log("cloneFile:", cloneFile);

    for (let i = 0; i < fileList.length; i++) {
      if (!imageTypes.includes(fileList[i].type)) {
        toast.warn(`${fileList[i].name} is wrong file type!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else if (cloneFile.length >= 1) {
        toast.warn(`Your images are more than 1!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else {
        cloneFile.push({ image: fileList[i] });
        // cloneFile.push(fileList[i]);
      }
    }
    setArrayImage(cloneFile);
    setInput(prevInput => ({
      ...prevInput,
      image: cloneFile
    }));
  };

  const deleteImg = idx => {
    let clone = [...arrayImage];
    clone.splice(idx, 1);
    setArrayImage(clone);
  };

  useEffect(() => {
    if (arrayImage.length < 1) return;
    const newImageUrls = [];
    // console.log(arrayImage);
    arrayImage.forEach(img => {
      console.log("img:", img);
      if (img._id) {
        newImageUrls.push(`http://localhost:4000/images/${img.image}`);
      } else {
        newImageUrls.push(URL.createObjectURL(img.image));
      }
    });
    // console.log("newImageUrls:", newImageUrls);
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  const handleSubmitForm = async () => {
    try {
      const result = validateCreateTag(input);

      if (result) {
        setError(result);
      } else {
        setError({});

        startLoading();
        let formData = new FormData();

        formData.append("TagName", input.TagName);

        for (let i = 0; i < arrayImage.length; i++) {
          formData.append("image", arrayImage[i].image);
        }
        await createTage(formData);

        setInput({
          TagName: "",
          image: ""
        });
        setArrayImage([]);
        stopLoading();
        setShowModalSuccess(true);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const handleClickReject = async () => {
    await deleteTag(tagId);
    navigate(0);
  };

  return (
    <div className="h-screen">
      <div className="w-full text-center p-4 border-b-2 border-slate-400">
        <h1 className="text-3xl font-bold">Tag</h1>
      </div>

      <div className="mt-10 flex flex-wrap gap-10">
        {authenticateUser?.isAdmin === true ? (
          <div className="flex flex-wrap ">
            <div className="">
              <div className="bg-gray-400 rounded-t-lg w-[200px] h-[200px] cursor-pointer ml-10 flex items-center justify-center">
                <button onClick={() => setOpen(true)}>
                  <i className="text-2xl">
                    <FaPlus />
                  </i>
                </button>
              </div>
              <div className="text-center">
                <h1>New Tag</h1>
              </div>
            </div>
          </div>
        ) : null}

        {dataTag.map((el, idx) => (
          <div className="relative flex flex-col items-center" key={el.id}>
            <div className="relative">
              {authenticateUser?.isAdmin === true ? (
                <button
                  onClick={() => {
                    setShowModalConfirm(true);
                    setTagIdToDelete(el.id);
                  }}
                  className="absolute top-0 right-0 text-3xl cursor-pointer hover:text-red-600 "
                >
                  <RiDeleteBin5Fill />
                </button>
              ) : null}
              <img
                className="rounded-t-lg w-[200px] h-[200px] cursor-pointer"
                src={
                  el.image ||
                  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                }
                alt=""
              />
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {el?.TagName}
            </h1>
          </div>
        ))}
      </div>

      {open && (
        <Modal
          id="showViewImageModal"
          width={"[100px]"}
          isVisible={open}
          onClose={() => setOpen(false)}
          header={"Create Tag"}
        >
          <div className="w-[900px] flex justify-center items-center p-2">
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-white">
              <div className="w-2/5 sm:grid sm:grid-cols-4">
                <div
                  className={` ${
                    error.image
                      ? "border border-red-600 "
                      : " border border-gray-300 "
                  }sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80`}
                >
                  <img src={boxIcon} className="w-[50px]" />
                  <div className="text-text-green font-semibold">
                    ลากไฟล์มาที่นี่ หรือ
                  </div>
                  <button
                    className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                    onClick={() => inputImg.current.click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={inputImg}
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-col justify-center items-center">
                    {arrayImage.length > 0 ? (
                      <div className="text-text-gray text-sm">
                        สามารถอัพโหลดรูปได้ไม่เกิน ({arrayImage.length}/1)
                      </div>
                    ) : (
                      <div className="text-text-gray text-sm">
                        สามารถอัพโหลดรูปได้ไม่เกิน (0/1)
                      </div>
                    )}
                    <div className="text-text-gray text-sm">
                      จำกัดไฟล์ (JPEG , PNG)
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="w-[120px] text-red-600 text-sm">
                    {error.image}
                  </div>
                )}

                {/* file upload image*/}
                <div className="col-span-2 sm:mt-2">
                  <div className="overflow-y-auto scrollbar">
                    {arrayImage.map((el, idx) => (
                      <div
                        key={idx}
                        className="w-full flex items-center border-2 rounded-lg mt-2 p-2"
                      >
                        <div className="flex items-center justify-center">
                          {arrayImageURL.map((el, idx) => (
                            <div>
                              <img
                                src={el}
                                crossOrigin="true"
                                key={idx}
                                className="w-[40px]"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center text-text-green gap-4">
                          <div className="flex items-center ml-2 text-sm gap-2">
                            <img src={docIcon} className="w-4 h-4 " />
                            {el.image.name || el.image}
                          </div>

                          <button
                            onClick={() => deleteImg(idx)}
                            className="hover:text-red-600"
                          >
                            <AiOutlineDelete className="text-2xl" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center p-2 mb-10">
                <div className="w-2/5">
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      TagName
                    </label>
                    <input
                      type="text"
                      name="TagName"
                      value={input.TagName}
                      className={`w-full ${
                        error.TagName
                          ? "border border-red-600 "
                          : " border border-gray-300 "
                      } bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      onChange={handleChangeInput}
                    />

                    {error && (
                      <div className="text-red-600 text-sm">
                        {error.TagName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full text-center mb-5">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleSubmitForm}
                >
                  ยืนยัน
                </button>

                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => setOpen(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showModalConfirm && (
        <ModalConfirmSave
          isVisible={showModalConfirm}
          onClose={() => setShowModalConfirm(false)}
          onSave={handleClickReject}
          header="Delete Tag"
          text='คุณต้องการ "ลบ" หรือไม่'
        />
      )}

      {showModalSuccess && <ModalSuccess urlPath="/tagPage" />}
    </div>
  );
}
