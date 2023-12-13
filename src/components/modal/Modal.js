import { IoIosClose } from "react-icons/io";

function Modal({ isVisible, width, onClose, header, children }) {
  if (!isVisible) return null;

  const handleClose = e => {
    if (e.target.id === "wrapper") {
      onClose();
      setDefault();
    }
  };

  function setDefault() {
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
  }

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="overflow-y-auto scrollbar ">
        <div
          className={`md:w-${width ? width : "[700px]"} 
          w-[100%] h-[700px] mx-auto`}
        >
          <div className="bg-white  rounded">
            <div className="flex justify-between border-b-2 border-grey-300  p-4">
              <p className="text-text-green text-xl font-bold">{header}</p>
              <div className="flex">
                <button
                  className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-xl"
                  onClick={() => {
                    onClose();
                    setDefault();
                  }}
                >
                  {/* X */}
                  <IoIosClose className="text-3xl" />
                </button>
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
