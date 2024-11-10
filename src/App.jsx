import "./App.css";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";
import Home from "@/pages/Home/Home";
import { UserSocketProvider } from "@/context/SocketProvider";
import { useEffect } from "react";
import { getSitting } from "./services/setting.services";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import ChatWidget from "./components/ChatWidget";

const setPrimaryColor = (color) => {
  document.documentElement.style.setProperty("--color-primary", color);
};
const handleGetSitting = async () => {
  const res = await getSitting();
  setPrimaryColor(res?.setting?.color || "#d92685");
  document.title = res?.setting?.title;
  // Cập nhật favicon
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href =
      res?.setting?.favicon ||
      "https://api.galaxy68bet.com/images/2390x670-logo-1727719546305.webp";
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href =
      res?.setting?.favicon ||
      "https://api.galaxy68bet.com/images/2390x670-logo-1727719546305.webp";
    document.head.appendChild(newFavicon);
  }
};
function App() {
  useEffect(() => {
    handleGetSitting();
  }, []);
  return (
    <>
      <UserSocketProvider>
        <PhotoProvider className="z-[100]">
          <ChatWidget isWidgetClass />
          {/* <Home /> */}
        </PhotoProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </UserSocketProvider>
    </>
  );
}

export default App;
