import { useState } from "react";
import "./index.css";
import iconSupport from "@/assets/images/8.png";
import { GoDash } from "react-icons/go";
import Home from "@/pages/Home/Home";
import { twMerge } from "tailwind-merge";
import { useUserSocket } from "@/context/SocketProvider";

function ChatWidget({ isWidgetClass }) {
  const { sendMessage, onMessage, isNoticeSound, isChat, toggleChat } =
    useUserSocket();
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat001 = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed bottom-20 md:right-10 z-[99]",
          !isOpen ? "right-5" : "right-2",
          isWidgetClass && isOpen && "bottom-0 right-0 left-0 md:right-0"
        )}
      >
        {isOpen && (
          <div
            className={twMerge(
              "w-[392px] max-w-[95vw] h-[70vh] bg-white  rounded-2xl relative shadow-2xl  chat-widget",
              isOpen ? "open" : "close",
              isWidgetClass &&
                "overflow-hidden flex flex-col h-dvh rounded-none w-full max-w-full"
            )}
          >
            <div
              className={twMerge(
                "flex justify-end h-[45px] items-center  px-4 bg-primary text-white rounded-t-2xl flex-shrink-0",
                isWidgetClass && "rounded-none ",
                isChat && "hidden"
              )}
            >
              <GoDash
                size={30}
                onClick={toggleChat001}
                className="cursor-pointer"
              />
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <Home isWidgetClass={isWidgetClass} />
            </div>
          </div>
        )}
        {!isOpen && (
          <button
            className="p-1 rounded-full bg-white  hover:bg-pink-200 "
            onClick={toggleChat001}
          >
            <img src={iconSupport} alt="" className="rounded-full size-12" />
          </button>
        )}
      </div>
    </>
  );
}

export default ChatWidget;
