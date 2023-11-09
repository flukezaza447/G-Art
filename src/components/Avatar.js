import profileImage from "../assets/blank.png";
export default function Avatar({ src, size, onClick }) {
  return (
    <img
      src={src || profileImage}
      className="rounded-full cursor-pointer"
      alt="user"
      width={size}
      height={size}
      onClick={onClick}
    />
  );
}
