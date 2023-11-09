import picture from "../assets/blank.png";

export default function HomePage() {
  return (
    <div className="h-screen ">
      {/* BOX1-TOP */}
      <div className="flex justify-center items-center p-2 border-b-2">
        <h1 className="font-bold text-2xl">Logo</h1>
      </div>

      {/* BOX2-BOTTOM */}
      <div className="flex justify-center items-center flex-wrap cursor-pointer">
        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>

        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>

        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>

        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>

        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>

        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>
        <button type="submit">
          <img
            alt="img"
            className="w-[200px] h-[200px] p-2"
            src={picture}
          ></img>
        </button>
      </div>
    </div>
  );
}
