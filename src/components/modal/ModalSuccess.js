import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalSuccess = ({ urlPath }) => {
  Swal.fire({
    icon: "success",
    title: "บันทึกข้อมูลสำเร็จ",
    text: "คุณได้ทำการบันทึกข้อมูลสำเร็จแล้ว",
    showConfirmButton: false,
    timer: 2000
  });

  useEffect(() => {
    if (urlPath) {
      setTimeout(() => {
        window.location.href = urlPath;
      }, 2000);
    }
  }, []);

  // return (
  //     <>
  //         <div id="wrapper" className="fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center">
  //             <div className={`mx-auto min-w-[30em]`} >
  //                 <div className="bg-white rounded min-w-[50%] p-5 text-center">
  //                     <p className="text-text-green text-xl font-bold">บันทึกข้อมูลสำเร็จ</p>
  //                     <p className="py-4">
  //                         คุณได้ทำการบันทึกข้อมูลสำเร็จแล้ว
  //                     </p>
  //                 </div>
  //             </div>
  //         </div>
  //     </>
  // )
};

export default ModalSuccess;
