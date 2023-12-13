import { formatDate } from "../utils/formatDate ";
import profileImage from "../assets/blank.png";

export default function FromTable({
  titleImage,
  titleName,
  titleOwner,
  titlePostDate,
  titleEmail,
  titleLastLogin,
  data,
  setShowModal,
  showModal,
  onPostId,
  onUserId,
  onTagId,
  userId,
  isCheck,
  icon
}) {
  //   console.log("data:", data);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {titleImage}
            </th>
            <th scope="col" className="px-6 py-3">
              {titleName}
            </th>
            <th scope="col" className="px-6 py-3">
              {titleOwner} {titleEmail}
            </th>
            <th scope="col" className="px-6 py-3">
              {titlePostDate} {titleLastLogin}
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((el, idx) => (
            <tr
              key={idx}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-[100px] h-[100px] rounded-lg cursor-pointer"
                  src={
                    el?.image
                      ? JSON.parse(el.image)[0]
                      : el?.profileImage || profileImage
                  }
                  alt=""
                />
              </th>
              <td className="px-6 py-4">
                {el?.title} {el?.firstName} {el?.lastName}
              </td>
              <td className="px-6 py-4">
                {el?.User?.firstName} {el?.User?.lastName} {el?.email}
              </td>
              <td className="px-6 py-4">
                {formatDate(el?.createdAt || el?.lastLoggedIn)}
              </td>
              <td className="px-6 py-4">
                {isCheck ? (
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                      userId(el.id);
                    }}
                    className="text-xl hover:text-red-600"
                  >
                    {icon}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                      onPostId(el?.id);
                      onUserId(el?.User?.id);
                      onTagId(el?.Tag?.id);
                    }}
                    className="text-xl hover:text-red-600"
                  >
                    {icon}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
