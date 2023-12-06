import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
import useLoading from "./hooks/useLoading";
import { useState } from "react";

export default function App() {
  const { loading } = useLoading();
  return (
    <>
      {loading && <Spinner />}
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
