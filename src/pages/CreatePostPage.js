import { IoIosClose } from "react-icons/io";
import { BsFillEyeFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/modal/Modal";

export default function CreatePostPage() {
  const inputImg = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const [arrayImage, setArrayImage] = useState([]);
  console.log("arrayImage;", arrayImage);

  const [arrayImageURL, setArrayImageURL] = useState([]);

  const [showViewImageModal, setShowViewImageModal] = useState(false);

  const handleImageChange = e => {
    const fileList = e.target.files;
    console.log("fileList:", fileList);

    const cloneFile = [...arrayImage];
    console.log("cloneFile:", cloneFile);

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
      } else if (cloneFile.length >= 2) {
        toast.warn(`Your images are more than 2!`, {
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
      }
    }
    setArrayImage(cloneFile);
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
    console.log(newImageUrls);
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  return (
    <div className="w-full bg-red-200 flex justify-center items-center p-2">
      <div className="w-4/5 flex flex-col gap-4 items-center justify-center bg-white">
        <div className="sm:grid sm:grid-cols-6 gap-6">
          <div className="sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80">
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
              <div className="text-text-gray text-sm">
                สามารถอัพโหลดได้หลายไฟล์
              </div>
              <div className="text-text-gray text-sm">จำกัด 1 ไฟล์</div>
              <div className="text-text-gray text-sm">(JPEG , PNG , SVG)</div>
            </div>
          </div>

          {/* file upload image*/}
          <div className="col-span-2 sm:mt-3">
            <div className="h-64 overflow-y-auto scrollbar">
              {arrayImage.map((el, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b-[1px] mt-2 pb-2"
                >
                  <div className="flex items-center text-text-green">
                    <img src={docIcon} className="w-4 h-4 " />
                    <div className="ml-2 text-sm">
                      {el.image.name || el.image}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteImg(idx)}
                    className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                  >
                    <IoIosClose className="text-2xl" />
                  </button>
                </div>
              ))}
            </div>
            {!!arrayImage.length && (
              <button
                onClick={() => setShowViewImageModal(true)}
                className="mt-2 flex mx-auto items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
              >
                <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mr-2" />
                ดูรูปภาพ
              </button>
            )}
          </div>

          {/* view image */}
          <Modal
            id="showViewImageModal"
            isVisible={showViewImageModal}
            width={"[800px]"}
            onClose={() => setShowViewImageModal(false)}
            header={"รูปภาพ"}
            showViewImageModal={showViewImageModal}
          >
            <div className=" px-10 pt-2 pb-10">
              {arrayImageURL.map((el, idx) => (
                <img
                  src={el}
                  crossorigin="true"
                  key={idx}
                  className="w-[640px] mb-5"
                />
              ))}
            </div>
          </Modal>
          <ToastContainer />
        </div>

        <div className="w-full flex justify-center items-center p-2 mb-10">
          <div className="w-2/5">
            <div className="mb-6">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="base-input"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                id="base-input"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tag
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Tag1</option>
              <option>Tag2</option>
              <option>Tag3</option>
            </select>
          </div>
        </div>

        <div className="w-full text-center mb-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            ยืนยัน
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
