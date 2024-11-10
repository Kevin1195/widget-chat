import { useEffect, useRef, useState } from "react";
import ContentConnect from "@/components/ContentConnect/ContentConnect";
import Chat from "./Chat";
import { useUserSocket } from "@/context/SocketProvider";
import audioNotice from "@/assets/audio/notice.mp3";
import { twMerge } from "tailwind-merge";
const Home = ({ isWidgetClass }) => {
  const { sendMessage, onMessage, isNoticeSound, isChat, toggleChat } =
    useUserSocket();
  const [messages, setMessages] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosedChat, setIsClosedChat] = useState(false);
  const [text, setText] = useState("");

  const audioNoticeRef = useRef(null);

  useEffect(() => {
    // Nhận danh sách tin nhắn theo phân trang
    const handleMessageHistory = (data) => {
      setMessages((prev) => [...data?.messages, ...prev]);
      setTotalPage(data?.totalPage || 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setIsClosedChat(data?.roomInfo?.status === "closed");
    };

    const handleCloseRoomChat = () => setIsClosedChat(true);
    const handleOpenRoom = () => setIsClosedChat(false);

    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
      if (
        isNoticeSound &&
        audioNoticeRef.current &&
        data?.senderRole !== "user"
      ) {
        audioNoticeRef.current.play(); // Play the audio
      }
    };
    const handleDeleteMessage = (data) => {
      const { id } = data;

      setMessages((prevMessages) =>
        prevMessages.filter((message) => Number(message.id) !== Number(id))
      );
    };
    onMessage("messageHistory", handleMessageHistory);
    onMessage("close_room_chat", handleCloseRoomChat);
    onMessage("open_room", handleOpenRoom);
    onMessage("newMessage", handleNewMessage);
    onMessage("deleteMessage", handleDeleteMessage);
    // Cleanup: Loại bỏ listener khi component unmounts hoặc khi dependencies thay đổi
    return () => {
      onMessage("messageHistory", null);
      onMessage("close_room_chat", null);
      onMessage("open_room", null);
      onMessage("newMessage", null);
      onMessage("deleteMessage", null);
    };
  }, [onMessage, isNoticeSound, messages]);
  console.log(messages, "messages");
  return (
    <div
      className={twMerge(
        "w-full h-dvh overflow-y-auto overflow-x-hidden",
        isWidgetClass && "overflow-hidden h-full"
      )}
    >
      <audio src={audioNotice} ref={audioNoticeRef} />
      {isChat ? (
        <Chat
          isWidgetClass={isWidgetClass}
          messages={messages}
          totalPage={totalPage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isClosedChat={isClosedChat}
        />
      ) : (
        <ContentConnect toggleChat={toggleChat} isWidgetClass={isWidgetClass} />
      )}
    </div>
  );
};

export default Home;
