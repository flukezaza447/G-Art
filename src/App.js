import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer
        autoClose="1000"
        theme="light"
        position="bottom-center"
        transition={Slide}
      />
    </>
  );
}
