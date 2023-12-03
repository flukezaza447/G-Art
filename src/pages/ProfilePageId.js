import { Link, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import { getCreatePostById } from "../apis/post-api";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";

export default function ProfilePageId() {
  const { userId } = useParams();

  const [postDataId, setPostDataId] = useState([]);
  // console.log("postDataId:", postDataId);

  const selectedPostData = postDataId?.find(el => el?.id === +userId);
  console.log("selectedPostData:", selectedPostData);

  useEffect(() => {
    const fetchgetCreatePostById = async () => {
      const res = await getCreatePostById(userId || null);
      setPostDataId(res?.data?.pureCreatePost);
    };

    fetchgetCreatePostById();
  }, []);

  return (
    <>
      <div>
        <div>
          <img
            className="w-full h-[250px]"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
        </div>

        <div className="flex">
          <div className="w-2/4 flex flex-col items-center">
            <div className="w-2/4 border-2 border-slate-400 bg-white flex flex-col items-center justify-center p-4">
              <div>
                <Avatar src={selectedPostData?.profileImage} size="70px" />
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-xl font-bold">
                  {selectedPostData?.firstName} {selectedPostData?.lastName}
                </h1>
              </div>
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex justify-center items-center font-bold text-4xl">
              <h1>Your Post</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
              {selectedPostData?.Posts?.map((el, idx) => (
                <div>
                  <Link to={`/postDetailPage/${el?.id}`}>
                    <CardPost key={idx} el={el} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
