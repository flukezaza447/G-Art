import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";

export default function ProfilePage() {
  const { authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser);

  const { postData } = usePost();
  // console.log("postData:", postData);

  const userPosts = postData.filter(
    post => post.User.id === authenticateUser.id
  );

  console.log("userPosts;", userPosts);
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
                {authenticateUser ? (
                  <Avatar src={authenticateUser.profileImage} size="70px" />
                ) : (
                  <Avatar size="70px" />
                )}
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-xl font-bold">
                  {" "}
                  {authenticateUser.firstName} {authenticateUser.lastName}
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
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex justify-center items-center font-bold text-4xl">
              <h1>Your Post</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {userPosts.map((el, idx) => {
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
