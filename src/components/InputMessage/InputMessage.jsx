import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import IconMessage from "./IconMessage";
import { twMerge } from "tailwind-merge";
import FormInputFile from "../ui/Input/FormInputFile";
import PreViewImageDiv from "./PreViewImageDiv";
import { GoPlusCircle } from "react-icons/go";
import { useUserSocket } from "@/context/SocketProvider";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
import { uploadFile } from "@/services/upload";
import RecordingDiv from "./RecordingDiv";

const InputMessage = ({ isWidgetClass }) => {
  const [isInputChatFocus, setIsInputChatFocus] = useState(false);
  const isMobile = 1024 > window.innerWidth || !isWidgetClass;
  const [expand, setExpand] = useState(true);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const divRef = useRef(null);
  const { sendMessage } = useUserSocket();

  const handleEmoji = (e) => {
    setContent((prev) => prev + e.emoji);
    divRef.current.innerHTML = divRef.current.innerHTML + e.emoji;
  };
  const handleSendMessage = async () => {
    if (!content && !file) return;

    const newMessageObj = {
      content,
    };
    if (file && file.length > 0) {
      const sendFile = await uploadFile(file[0]);
      if (sendFile?.success) {
        newMessageObj.fileUrl = sendFile?.file;
      }
    }
    sendMessage("sendMessage", newMessageObj);
    setContent("");
    setFile(null);
    divRef.current.innerHTML = "";
    divRef.current.focus();
  };

  const handleInput = (e) => {
    setExpand(false);
    if (e.target.innerHTML === "<br>") {
      return setContent("");
    }
    setContent(e.target.innerHTML || "");
  };

  const handleBlur = () => {
    setIsInputChatFocus(false);
    if (divRef.current && !content.trim()) {
      divRef.current.innerHTML = "";
    }
  };
  const isExpand = (isMobile, content, expand, isWidgetClass) => {
    if (!isMobile) {
      return true;
    }
    if (!content) {
      return true;
    }

    if (content && expand) {
      return true;
    }
    if (content && !expand) {
      return false;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Ngăn hành động dán mặc định

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");
    if (pastedData) {
      // Custom dữ liệu (ví dụ: loại bỏ khoảng trắng thừa)
      const customizedData = pastedData.trim();
      // Chèn dữ liệu tùy chỉnh vào div
      document.execCommand("insertText", false, customizedData);
      return;
    }
    // Tạo DataTransfer để lưu các tệp hợp lệ
    const dataTransfer = new DataTransfer();

    // Kiểm tra các mục dán vào
    const items = clipboardData.items;
    for (const item of items) {
      if (item.kind === "file") {
        const blob = item.getAsFile();
        if (blob) {
          const file = new File([blob], blob.name || "pasted-file", {
            type: blob.type,
            lastModified: Date.now(),
          });
          dataTransfer.items.add(file);
        }
      }

      // Lấy FileList từ DataTransfer
      const fileList = dataTransfer.files;

      // Nếu có file hợp lệ, lưu vào state
      if (fileList.length > 0) {
        handleWhenChosenFile(fileList);
        // setFile(fileList);
      } else {
        console.warn("No valid files pasted!");
      }
    }
  };
  const handleWhenChosenFile = (files) => {
    const file = files?.[0];
    if (!file) {
      return;
    }
    if (file?.size > MAX_FILE_SIZE) {
      alert("Chọn file nhỏ hơn 25MB");
      return;
    }
    setFile(files);
    divRef.current.focus();
  };
  return (
    <div className="w-full flex justify-center items-start bg-white flex-shrink-0 lg:px-5 px-2.5 relative">
      <div className="w-full flex gap-1 md:gap-3 items-end pt-1 pb-2.5">
        <div
          className={twMerge(
            "flex-1 w-full rounded-[20px] bg-[#F0F2F5]  py-2 px-2.5 lg:px-5 lg:py-2.5 border border-transparent ",
            isInputChatFocus && "border-primary"
          )}
        >
          <PreViewImageDiv files={file} setFile={setFile} />
          <div className="relative ">
            <div
              ref={divRef}
              contentEditable
              className=" w-full focus:outline-none text-left break-all  max-h-[70px] overflow-y-auto leading-tight "
              onInput={handleInput}
              onBlur={handleBlur}
              onFocus={() => setIsInputChatFocus(true)}
              aria-label="Message input"
              role="textbox"
              onPaste={handlePaste} // Bắt sự kiện paste
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) {
                    // Shift + Enter: Thêm dòng mới
                    document.execCommand("insertHTML", false, "<br><br>");
                    e.preventDefault(); // Ngăn hành vi mặc định
                  } else {
                    // Chỉ Enter: Gửi tin nhắn
                    e.preventDefault(); // Ngăn hành vi mặc định
                    handleSendMessage(); // Gọi hàm gửi tin nhắn
                  }
                }
              }}
            />
            {!content && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 transform  text-gray-500 pointer-events-none">
                Nhập tin nhắn...
              </div>
            )}
          </div>
        </div>
        <div className=" flex-shrink-0 mb-2 flex items-center gap-2 md:gap-5">
          {isExpand(isMobile, content, expand, isWidgetClass) ? (
            <React.Fragment>
              <IconMessage handleEmoji={handleEmoji} />
              <div>
                <FormInputFile
                  onChange={(files) => {
                    handleWhenChosenFile(files);
                    // setFile(file);
                    //
                  }}
                  showPreviewImage={false}
                  className="hidden"
                />
              </div>
              <RecordingDiv />
            </React.Fragment>
          ) : (
            <GoPlusCircle size={20} onClick={() => setExpand(true)} />
          )}
          <button
            onClick={handleSendMessage}
            className={twMerge(
              "cursor-pointer text-primary disabled:opacity-25"
            )}
            disabled={!content && !file}
          >
            <LuSendHorizonal className="text-[22px] md:text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
