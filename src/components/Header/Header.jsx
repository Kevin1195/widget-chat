import React, { useState } from "react";
import { PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";
import iconSupport from "@/assets/images/ngoc-nhi.jpeg";
import { GoDash } from "react-icons/go";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { useUserSocket } from "@/context/SocketProvider";
import { baseURL } from "@/config";
const Header = () => {
  const {
    isNoticeSound,
    setIsNoticeSound,
    toggleChat,
    sendMessage,
    onMessage,
    settings,
    roomInfo,
  } = useUserSocket();
  const handleCloseRoom = () => {
    sendMessage("closeRoom");
    toggleChat();
  };

  return (
    <div className="w-full flex justify-between h-[55px] px-3 md:px-5 bg-primary text-white ">
      <div className="flex items-center gap-3 md:gap-5 cursor-pointer">
        <MdArrowBackIosNew
          className="size-[20px] md:size-[25px]"
          onClick={toggleChat}
        />
      </div>

      <div className="flex items-center justify-center cursor-pointer">
        <img
          src={baseURL + roomInfo?.avatar}
          alt=""
          className="rounded-full  size-10 "
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
        <p className="ml-2  font-bold">
          {roomInfo?.fullName ||
            roomInfo?.name ||
            settings?.title ||
            "Ngọc Nhi"}
        </p>
      </div>
      {/* <div className="flex gap-3 items-center justify-end cursor-pointer  ">
        <IoMdClose
          className="size-[25px] md:size-[30px]"
          onClick={handleCloseRoom}
        />
      </div> */}
      <div className="flex gap-3 items-center justify-end cursor-pointer  ">
        <button onClick={() => setIsNoticeSound(!isNoticeSound)}>
          {isNoticeSound ? (
            <PiSpeakerHighDuotone className="size-[20px] md:size-[25px]" />
          ) : (
            <PiSpeakerSlashDuotone className="size-[20px] md:size-[25px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
