import { useUserSocket } from "@/context/SocketProvider";
import { uploadAudio, uploadFile } from "@/services/upload";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosMic } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const RecordingDiv = () => {
  const { sendMessage } = useUserSocket();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.mp3");

          const response = await uploadAudio(formData);

          if (response?.success) {
            sendMessage("sendMessage", { fileUrl: response?.file });
          }
        } catch (error) {
          //   console.error("Error uploading audio:", error);
          toast.error("Lỗi khi tải lên file âm thanh");
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.log("error:", error);
      //   console.error("Error starting recording:", error);
      toast.error("Lỗi ghi âm trên thiết bị của bạn");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      console.log(" t dô");
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  };
  return (
    <div>
      <span className="flex">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className="relative flex items-center justify-center"
          // style={{ width: 40, height: 40 }}
        >
          {isRecording && (
            <span className="animate-ping absolute inset-0 flex items-center justify-center rounded-full bg-primary opacity-75"></span>
          )}
          <IoIosMic
            size={20}
            className={twMerge(
              "relative z-10 text-[#555555]",
              isRecording && "text-primary"
            )}
          />
        </button>
      </span>
    </div>
  );
};

export default RecordingDiv;
