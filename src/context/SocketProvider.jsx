import { baseURL } from "@/config";
import { getSitting } from "@/services/setting.services";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import iconSupport from "@/assets/images/8.png";
// Tạo context cho user socket
const UserSocketContext = createContext();

// Hook để sử dụng UserSocketContext
export const useUserSocket = () => useContext(UserSocketContext);

// Provider component dành cho UserSocket
export const UserSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [anonymousId, setAnonymousId] = useState(
    localStorage.getItem("anonymousId")
  );

  const [isNoticeSound, setIsNoticeSound] = useState(true); // thông báo âm thanh
  const [isChat, setIsChat] = useState(false); // mở chat hay không

  const [settings, setSettings] = useState(iconSupport);
  const [roomInfo, setRoomInfo] = useState({});

  const handleGetSitting = async () => {
    const res = await getSitting();
    setSettings(res?.setting);
  };
  useEffect(() => {
    handleGetSitting();
  }, []);

  useEffect(() => {
    const connectSocket = (id) => {
      const header = {};
      if (id) header["user-id"] = id;

      const newSocket = io(baseURL, {
        extraHeaders: header,
      });

      // Xử lý khi kết nối thành công
      newSocket.on("connect", () => {
        console.log("Connected");
      });

      // Lắng nghe sự kiện từ server để nhận anonymousId mới
      newSocket.on("assignAnonymousId", ({ anonymousId: newId }) => {
        if (!anonymousId || anonymousId !== newId) {
          localStorage.setItem("anonymousId", newId);
          setAnonymousId(newId);
          newSocket.disconnect(); // Ngắt kết nối hiện tại trước khi kết nối lại
        }
      });
      newSocket.on("roomInfo", (data) => {
        setRoomInfo(data);
      });

      // Xử lý khi ngắt kết nối
      newSocket.on("disconnect", () => {
        console.error("Disconnected");
      });

      // Lưu trữ instance của socket
      setSocket(newSocket);
    };

    // Kết nối socket ban đầu
    connectSocket(anonymousId);

    // Dọn dẹp kết nối và listeners khi component bị hủy hoặc dependencies thay đổi
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null); // Xóa tham chiếu socket khi cleanup
      }
    };
  }, [anonymousId]);

  // Gửi tin nhắn từ client đến server
  const sendMessage = (event, message) => {
    if (socket?.connected) {
      socket.emit(event, message);
    } else {
      console.warn("Socket is not connected");
    }
  };

  // Lắng nghe tin nhắn từ server với cleanup tự động
  const onMessage = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
      // Dọn dẹp listener khi dependencies thay đổi
      return () => socket.off(event, callback);
    }
  };

  const toggleChat = () => setIsChat(!isChat);
  const value = {
    sendMessage,
    onMessage,
    isNoticeSound,
    setIsNoticeSound,
    isChat,
    toggleChat,
    settings,
    roomInfo,
    anonymousId,
  };
  return (
    <UserSocketContext.Provider value={value}>
      {children}
    </UserSocketContext.Provider>
  );
};
