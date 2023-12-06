import React from "react";

const Likes = ({ likes }) => {
  const sortedLikes = likes.sort((a, b) => b.id - a.id);

  return (
    <div>
      <h3>Likes</h3>
      <ul>
        {sortedLikes.map(like => (
          <li key={like.id}>
            <div>
              <span>
                {/* <FaUser /> */}
                ss
              </span>{" "}
              {like.User.firstName} {like.User.lastName}
            </div>
            <div>{like.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Likes;
