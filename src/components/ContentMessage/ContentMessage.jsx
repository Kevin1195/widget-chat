import { useUserSocket } from "@/context/SocketProvider";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { PhotoView } from "react-photo-view";
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowDown } from "react-icons/fa";
import { audioFormats, imageFormats, videoFormats } from "@/utils/constant";
import { baseURL } from "@/config";
import { GrDocumentDownload } from "react-icons/gr";
import { getSitting } from "@/services/setting.services";
import iconSupport from "@/assets/images/ngoc-nhi.jpeg";
const ContentMessage = ({ messages, totalPage, isLoading, setIsLoading }) => {
  const { sendMessage, onMessage, settings } = useUserSocket();
  const [page, setPage] = useState(1);

  const [isScrollTop, setIsScrollTop] = useState(false);
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth", // Thêm hiệu ứng mặt
      });
      setIsScrollTop(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleScroll = async () => {
    const currentScrollTop = messagesRef.current.scrollTop;
    const scrollHeight = messagesRef.current.scrollHeight;
    const clientHeight = messagesRef.current.clientHeight;

    // Kiểm tra nếu người dùng đang cuộn lên
    if (currentScrollTop < scrollHeight - clientHeight - 50) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }

    // Kiểm tra nếu người dùng cuộn đến đỉnh và cần tải thêm tin nhắn
    if (currentScrollTop === 0 && !isLoading && page < totalPage) {
      setIsLoading(true);
      const newPage = page + 1;
      setPage(newPage);
      sendMessage("getMessagesByRoom", { page: newPage });
    }
  };

  useEffect(() => {
    const currentRef = messagesRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, page]);

  const downloadFile = url => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="h-full w-full bg-[#FFFFFF] overflow-y-scroll chat-widget_content py-5 lg:px-5 px-2.5 relative"
      ref={messagesRef}
    >
      {isScrollTop && (
        <button
          className="p-3 rounded-xl  fixed bottom-20 right-5 bg-slate-300 shadow-2xl"
          onClick={() => scrollToBottom()}
        >
          <FaArrowDown className="text-[#36d7b7] animate-bounce text-md md:text-2xl" />
        </button>
      )}

      <ClipLoader color={"#36d7b7"} loading={isLoading} size={30} />
      {messages.map((message, index) => {
        const checkMyMessage = message?.senderRole === "user";
        const checkPrevMessage =
          messages[index - 1]?.senderRole !== message?.senderRole;
        const timeCurrentMessage = dayjs(message?.createdAt);
        const timePrevMessgae = dayjs(messages[index - 1]?.createdAt);
        const differenceInMinutes = timeCurrentMessage.diff(
          timePrevMessgae,
          "minute",
          true,
        );
        const checkTimePrevMessage =
          (messages[index - 1]?.senderRole &&
            messages[index - 1]?.senderRole !== message?.senderRole) ||
          differenceInMinutes >= 3;
        let typeFile = "text";
        if (message.fileUrl) {
          const checkTypeFile = message.fileUrl.split(".").pop();
          // Các định dạng file hình ảnh
          if (imageFormats.includes(checkTypeFile)) {
            typeFile = "image";
          } else if (videoFormats.includes(checkTypeFile)) {
            typeFile = "video";
          } else if (audioFormats.includes(checkTypeFile)) {
            typeFile = "audio";
          } else {
            typeFile = "file";
          }
        }
        message.typeFile = typeFile;
        // message.fileUrl = baseURL + message.fileUrl;
        console.log(`message.supporter : `, message.supporter);
        return (
          <div
            key={message?.id}
            className={`flex ${
              checkMyMessage ? "justify-end" : "justify-start"
            } ${
              messages[index - 1]?.senderRole && checkPrevMessage
                ? "mt-5"
                : "mt-1"
            }`}
          >
            <div
              className={`flex gap-2 ${
                message?.senderRole && !checkTimePrevMessage
                  ? "max-w-[70%]"
                  : "max-w-[70%]"
              }`}
            >
              {!checkMyMessage && (
                <img
                  src={baseURL + message?.supporter?.avatar}
                  alt=""
                  className={`${
                    checkPrevMessage && !checkMyMessage
                      ? "opacity-1"
                      : "opacity-0"
                  } rounded-full  size-8 `}
                  // onError={e => {
                  //   // Kiểm tra nếu ảnh đã được thử tải `defaultAvatar` trước đó
                  //   if (!e.target.dataset.fallback) {
                  //     e.target.src = baseURL + defaultAvatar;
                  //     e.target.dataset.fallback = "true"; // Đánh dấu rằng `defaultAvatar` đã được thử
                  //   } else {
                  //     e.target.onError = null; // Bỏ qua xử lý lỗi để tránh loop vô tận
                  //   }
                  // }}
                  onError={e => {
                    if (!e.target.dataset.fallback) {
                      // Nếu ảnh ban đầu lỗi, đổi sang `settings.defaultAvatar`
                      e.target.src = baseURL + settings.defaultAvatar;
                      e.target.dataset.fallback = "defaultAvatar"; // Đánh dấu rằng đã thử `defaultAvatar`
                    } else if (e.target.dataset.fallback === "defaultAvatar") {
                      // Nếu `defaultAvatar` lỗi, đổi sang `iconSupport`
                      e.target.src = iconSupport;
                      e.target.dataset.fallback = "iconSupport"; // Đánh dấu rằng đã thử `iconSupport`
                    } else {
                      // Nếu cả hai ảnh dự phòng đều lỗi, bỏ qua xử lý lỗi để tránh loop
                      e.target.onError = null;
                    }
                  }}
                />
              )}
              <div
                className={`flex flex-col gap-2 ${
                  checkMyMessage ? "flex-row-reverse" : ""
                } items-end`}
              >
                {message.fileUrl && (
                  <>
                    {message?.typeFile === "image" && (
                      <PhotoView src={baseURL + message?.fileUrl}>
                        <img
                          src={baseURL + message?.fileUrl}
                          className="w-full h-full max-h-[300px] object-scale-down cursor-pointer"
                        />
                      </PhotoView>
                    )}
                    {message?.typeFile == "video" && (
                      <video
                        src={baseURL + message.fileUrl}
                        className="w-full h-full  max-h-[70vh] object-scale-down"
                        controls
                      />
                    )}
                    {message?.typeFile == "audio" && (
                      <audio
                        controls
                        src={baseURL + message.fileUrl}
                        className="w-[200px] "
                      ></audio>
                    )}
                    {message?.typeFile == "file" && (
                      <div
                        className="flex items-center justify-center bg-primary text-white p-2 rounded-xl"
                        onClick={() => downloadFile(baseURL + message.fileUrl)}
                      >
                        <GrDocumentDownload className="text-[40px] text-sky-300" />
                        <p>{message.fileUrl.split("/").pop()}</p>
                      </div>
                    )}
                  </>
                )}

                <div>
                  {message.content && (
                    <div
                      className={`text-base py-2 px-3 text-start rounded-lg ${
                        checkMyMessage
                          ? "bg-primary text-white"
                          : "bg-[#F0F0F0] text-[#050505]"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></div>
                  )}

                  {checkTimePrevMessage && (
                    <p className="text-slate-400 text-xs text-end">
                      {dayjs(message?.createdAt).format("HH:mm")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentMessage;
