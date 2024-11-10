import { useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { FaMoneyBillTransfer, FaGift } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import { useUserSocket } from "@/context/SocketProvider";
import { baseURL } from "@/config";
import { twMerge } from "tailwind-merge";

const ContentConnect = ({ isWidget = false, isWidgetClass }) => {
  const { toggleChat, settings, roomInfo, sendMessage, anonymousId } =
    useUserSocket();
  const [userInput, setUserInput] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleChat();
    if (userInput) {
      sendMessage("update_username", { user: userInput, id: anonymousId });
    }
  };
  useEffect(() => {
    if (roomInfo?.username && !roomInfo?.username?.includes("user_")) {
      setUserInput(roomInfo?.username);
      setDisableInput(true);
    }
  }, [roomInfo]);
  return (
    <div
      className={twMerge(
        "max-w-5xl h-full flex flex-col items-center mt-5 gap-5 md:gap-10 mx-auto px-3",
        isWidgetClass && "bg-white"
      )}
    >
      <img src={settings?.logo} alt="" className="w-full h-auto" />
      <div
        className={twMerge(
          "flex gap-2 flex-wrap justify-center text-xl md:text-3xl font-bold",
          isWidget ? "!text-xl" : "",
          isWidgetClass && "!text-base"
        )}
      >
        <p>Chào mừng đến với hệ thống </p>
        <p>Chăm Sóc Khách Hàng</p>
      </div>
      <p
        className={twMerge(
          "text-xl md:text-2xl",
          isWidget ? "!text-xl" : "",
          isWidgetClass && "!text-base"
        )}
      >
        Giải đáp mọi thắc mắc của bạn
      </p>

      <div
        className={twMerge(
          "w-full p-4 rounded-2xl grid gap-3 shadow-2xl border border-gray-200",
          isWidgetClass && "shadow"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute bottom-0 right-0">
              <div className="w-3 h-3 rounded-full border-[2px] border-white bg-[#06d6a0]"></div>
            </div>
            <img
              src={baseURL + roomInfo?.avatar}
              alt=""
              className="rounded-full size-12"
              onError={(e) => {
                if (!e.target.dataset.fallback) {
                  e.target.src = "/placeholder.svg?height=48&width=48";
                  e.target.dataset.fallback = "true";
                } else {
                  e.target.onError = null;
                }
              }}
            />
          </div>
          <div className="">
            <p className="font-semibold text-gray-500 text-md md:text-lg text-start">
              {roomInfo?.fullName ||
                roomInfo?.name ||
                settings?.title ||
                "Ngọc Nhi"}
            </p>
            <p className="text-start text-sm md:text-base mt-1">
              Xin chào. Tôi có thể giúp gì cho bạn?
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={userInput}
            disabled={disableInput}
            onChange={handleInputChange}
            placeholder="Nhập tên đăng nhập hoặc số điện thoại"
            className={twMerge(
              "w-full p-3 border border-primary rounded-lg",
              isWidgetClass && "py-0 h-11"
            )}
          />
          <button
            type="submit"
            className={twMerge(
              "w-full p-3 bg-primary text-white font-semibold rounded-lg flex gap-3 items-center justify-center",
              isWidgetClass && "py-0 h-11"
            )}
          >
            Trò chuyện ngay bây giờ
            <LuSendHorizonal size={20} />
          </button>
        </form>
      </div>
      {!isWidget && (
        <div
          className={twMerge("md:grid grid-cols-3 hidden gap-5", "md:hidden")}
        >
          <div className="flex justify-center items-center shadow-2xl rounded-2xl p-5 flex-col gap-3 border border-gray-200">
            <FaMoneyBillTransfer className="text-[80px] text-green-500 p-3 rounded-2xl bg-green-100" />
            <div>
              <p className="text-xl font-semibold text-[#444]">
                Nạp tiền / Rút tiền
              </p>
              <p className="text-gray-400">
                Bạn gặp vấn đề với nạp tiền hoặc rút tiền. Liên hệ ngay với nhân
                viên để được xử lý nhanh chóng
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center shadow-2xl rounded-2xl p-5 flex-col gap-3 border border-gray-200">
            <FaGift className="text-[80px] text-pink-400 p-3 rounded-2xl bg-pink-100" />
            <div>
              <p className="text-xl font-semibold text-[#444]">Khuyến mãi</p>
              <p className="text-gray-400">
                Bạn muốn nhận ưu đãi của chúng tôi. Nhân viên sẽ hướng dẫn bạn
                nhận.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center shadow-2xl rounded-2xl p-5 flex-col gap-3 border border-gray-200">
            <GoReport className="text-[80px] text-orange-400 p-3 rounded-2xl bg-orange-100" />
            <div>
              <p className="text-xl font-semibold text-[#444]">
                Các vấn đề khác
              </p>
              <p className="text-gray-400">
                Nếu bạn gặp bất kỳ vấn đề nào hãy trò chuyện ngay để được giải
                đáp.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentConnect;
