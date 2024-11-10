import iconSupport from "@/assets/images/8.png";
import dayjs from "dayjs";
import { PhotoView } from "react-photo-view";

const ContentMessage = ({ messages, myId, ref }) => {
  return (
    <div
      className="h-[calc(100%-90px)] bg-[#fff]  overflow-y-scroll p-3 mb-10 chat-widget_content"
      ref={ref}
    >
      {messages.map((message, index) => {
        const checkMyMessage = myId === message.username;
        const checkPrevMessage =
          messages[index - 1]?.username !== message.username;
        const timeCurrentMessage = dayjs(message.timestamp);
        const timePrevMessgae = dayjs(messages[index - 1]?.timestamp);
        const differenceInMinutes = timeCurrentMessage.diff(
          timePrevMessgae,
          "minute",
          true
        );
        const checkTimePrevMessage =
          (messages[index - 1]?.username &&
            messages[index - 1]?.username !== message.username) ||
          differenceInMinutes >= 3;

        return (
          <div
            key={message.id}
            className={`flex ${
              checkMyMessage ? "justify-end" : "justify-start"
            } ${
              messages[index - 1]?.username && checkPrevMessage
                ? "mt-5"
                : "mt-1"
            }`}
          >
            <div
              className={`flex gap-2  ${
                myId == message.username && !checkTimePrevMessage
                  ? "max-w-[70%]"
                  : "max-w-[70%]"
              }`}
            >
              {!checkMyMessage && (
                <img
                  src={message?.avatar || iconSupport}
                  alt=""
                  className={`${
                    checkPrevMessage && !checkMyMessage
                      ? "opacity-1"
                      : "opacity-0"
                  } rounded-full p-1 size-8 `}
                />
              )}
              <div
                className={`flex flex-col gap-2 ${
                  checkMyMessage ? "flex-row-reverse" : ""
                } items-end`}
              >
                {message?.imageUrl && (
                  // <PreviewImage image={message?.imageUrl} />
                  <PhotoView src={message?.imageUrl}>
                    <img
                      src={message?.imageUrl}
                      className="w-full h-full max-h-[200px] object-scale-down cursor-pointer"
                    />
                  </PhotoView>
                )}
                {message?.videoUrl && (
                  <video
                    src={message.videoUrl}
                    className="w-full h-full max-h-[200px] object-scale-down"
                    controls
                  />
                )}
                <div>
                  <p
                    className={`text-sm p-2 text-start rounded-lg ${
                      checkMyMessage
                        ? "bg-primary text-white"
                        : "bg-[#f5f5f5] text-[#444]"
                    }`}
                  >
                    {message.message}
                  </p>
                  {checkTimePrevMessage && (
                    <p className="text-slate-400 text-xs text-end">
                      {dayjs(message.timestamp).format("HH:mm")}
                    </p>
                  )}{" "}
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
