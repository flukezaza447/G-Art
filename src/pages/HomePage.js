import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";

export default function HomePage() {
  const { postData } = usePost();
  console.log("postData:", postData);

  return (
    <div className="relative">
      {/* BOX1-TOP */}
      <div className="flex justify-center items-center p-2 border-b-2">
        <h1 className="font-bold text-2xl">Logo</h1>
      </div>
      {/* BOX2-CENTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
        {postData.map((el, idx) => {
          const postImage = JSON.parse(el.image);
          return <CardPost key={idx} el={el} postImage={postImage} />;
        })}
      </div>
    </div>
  );
}
