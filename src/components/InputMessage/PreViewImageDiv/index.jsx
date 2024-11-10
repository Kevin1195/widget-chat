import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosCloseCircle } from "react-icons/io";
import { generateVideoThumbnail } from "@/helpers";
import { FaFileUpload } from "react-icons/fa";

const PreViewImageDiv = ({ files, setFile }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileChange = async (files) => {
    if (!files) {
      return setPreviewImage(null);
    }
    const file = files?.[0];
    if (file?.type?.startsWith("video/")) {
      const thumbnailURL = await generateVideoThumbnail(file);
      setPreviewImage(thumbnailURL);
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result); // Set the image as the preview
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };
  useEffect(() => {
    handleFileChange(files);
  }, [files]);
  return (
    <div className={twMerge("text-left mb-2", !files?.[0] && "hidden")}>
      <div className="flex items-end gap-2.5 items-center">
        <div className=" relative  rounded p-1 lg:p-2 border w-fit">
          <div className="w-[48px] h-[48px] lg:w-20 lg:h-20 overflow-hidden flex justify-center items-center">
            {files?.[0]?.type?.startsWith("video/") ||
            files?.[0]?.type?.startsWith("image/") ? (
              <img
                src={previewImage}
                className="object-contain w-full h-full"
              />
            ) : (
              <FaFileUpload size={50} className="text-[#333]" />
            )}
          </div>
          <div
            className="absolute -top-2 -right-2 cursor-pointer hover:opacity-45"
            onClick={() => {
              setFile(null);
            }}
          >
            <IoIosCloseCircle size={20} />
          </div>
          {files?.[0]?.type?.startsWith("video/") && (
            <img
              src="/all/play_24dp.png"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <p className="font-medium  w-full overflow-hidden line-clamp-3 text-ellipsis break-all text-left">
          {files?.[0]?.name}
        </p>
      </div>
    </div>
  );
};

export default PreViewImageDiv;
