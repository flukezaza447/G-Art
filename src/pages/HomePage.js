import { Link, useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export default function HomePage() {
  const { postData } = usePost();
  // console.log("postData:", postData);

  const navigate = useNavigate();

  const { authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser);

  const [selectedTagId, setSelectedTagId] = useState(null);
  // console.log("selectedTagId:", selectedTagId);

  const [sortByLikes, setSortByLikes] = useState(false);

  const [viewMyPosts, setViewMyPosts] = useState(false);

  const [getSearch, setGetSearch] = useState(null);
  // console.log("getSearch", getSearch);

  const toggleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
    setViewMyPosts(false);
  };

  const location = useLocation();
  // console.log("location:", location);

  useEffect(() => {
    if (location.state) {
      if (typeof location.state === "string") {
        setGetSearch(location.state);
      } else if (typeof location.state === "object" && location.state.id) {
        setSelectedTagId(location.state.id);
        setGetSearch(location.state.id);
      } else {
        setSelectedTagId(null);
      }
    }
  }, [location.state]);

  const clearSearch = () => {
    setSelectedTagId(null);
    setGetSearch(null);
    navigate("/");
  };

  const filteredPosts = selectedTagId
    ? postData.filter(post => post.Tag.TagName === selectedTagId)
    : viewMyPosts
    ? postData.filter(post => post.User.id === authenticateUser.id)
    : postData;

  const searchedPosts = getSearch
    ? filteredPosts.filter(post => {
        const titleLower = post.title.toLowerCase();
        const tagNameLower = post.Tag.TagName.toLowerCase();
        const searchLower = getSearch.toLowerCase();
        return (
          titleLower.includes(searchLower) || tagNameLower.includes(searchLower)
        );
      })
    : filteredPosts;

  const sortedPosts = [...searchedPosts].sort((a, b) => {
    if (sortByLikes) {
      return b.Likes.length - a.Likes.length;
    } else {
      return b.id - a.id;
    }
  });

  return (
    <div className="relative">
      {/* BOX1-TOP */}
      <div className="flex justify-center items-center p-2 border-b-2">
        <h1 className="font-bold text-2xl">Logo</h1>
      </div>
      {/* BOX2-CENTER */}
      <div className="w-full flex">
        <nav className="w-[15%] bg-gray-200">
          <ul className="flex flex-col items-center">
            {authenticateUser ? (
              <li
                className={`w-4/5 flex items-center justify-center gap-2 p-2 cursor-pointer hover:text-red-600 border-black border-b-2 ${
                  viewMyPosts ? "text-red-600" : ""
                }`}
                onClick={() => setViewMyPosts(!viewMyPosts)}
              >
                <i>
                  <FaUser />
                </i>
                <button>Post me</button>
              </li>
            ) : null}

            <li
              className={`w-4/5 flex items-center justify-center gap-2 p-2 cursor-pointer hover:text-red-600 border-black border-b-2 ${
                sortByLikes ? "text-red-600" : ""
              }`}
              onClick={toggleSortByLikes}
            >
              <i>
                <BiSolidLike />
              </i>
              <button>Likes</button>
            </li>
          </ul>
        </nav>

        <div>
          <div className="flex">
            <div className="p-2">
              {sortByLikes && (
                <button
                  className="ml-4 px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                  onClick={toggleSortByLikes}
                >
                  Like
                </button>
              )}
            </div>

            <div className="p-2">
              {getSearch && (
                <button
                  className="ml-4 px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                  onClick={clearSearch}
                >
                  {getSearch}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
            {sortedPosts.map((el, idx) => {
              return <CardPost key={idx} el={el} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
