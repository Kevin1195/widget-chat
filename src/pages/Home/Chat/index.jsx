import ContentMessage from "@/components/ContentMessage/ContentMessage";
import Header from "@/components/Header/Header";
import InputMessage from "@/components/InputMessage/InputMessage";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const Chat = ({
  isWidgetClass,
  messages,
  totalPage,
  isLoading,
  setIsLoading,
  isClosedChat,
}) => {
  console.log("isWidgetClass:", isWidgetClass);
  return (
    <div
      className={twMerge(
        "w-full h-full max-h-dvh overflow-hidden",
        isWidgetClass && "flex-1 h-full overflow-hidden"
      )}
    >
      <div
        className={twMerge(
          "flex flex-col w-full h-full",
          isWidgetClass && "overflow-hidden"
        )}
      >
        <Header />
        <div className="flex-1 overflow-hidden flex flex-col h-full">
          <div className="flex-1 h-full bg-slate-300 overflow-hidden">
            <ContentMessage
              messages={messages}
              totalPage={totalPage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="flex-shrink-0 h-auto">
            {isClosedChat && (
              <div className=" bg-[#FFFFFF] border border-red-300 rounded-lg p-3 m-4 text-center text-red-600 mb-5">
                <p className="font-semibold">Phiên trò chuyện đã đóng</p>
                <p className="text-sm mt-1">
                  Do người dùng không hoạt động trong thời gian dài.
                </p>
              </div>
            )}
            <InputMessage isWidgetClass={isWidgetClass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
