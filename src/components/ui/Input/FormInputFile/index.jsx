{
  /* <FormInputFile
label="Hình ảnh"
initialImage={field.value}
onChange={(files) => {
  if (files) {
    field.onChange(files); // Cập nhật khi người dùng chọn file mới
  } else {
    field.onChange(null); // Khi xóa, đặt lại giá trị null
  }
}}
ref={field.ref}
/> */
}
//MẪU Ở TRÊN

import React, { useState, forwardRef, useEffect } from "react";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const FormInputFile = forwardRef(
  (
    { rootClassName, label, initialImage, showPreviewImage = true, ...props },
    ref,
  ) => {
    const [previewImage, setPreviewImage] = useState(null); // State to hold the preview image or URL

    // Khi có URL từ props (chế độ chỉnh sửa), nó sẽ hiển thị hình ảnh từ URL
    useEffect(() => {
      if (initialImage && showPreviewImage) setPreviewImage(initialImage);
    }, [initialImage, showPreviewImage]);
    useEffect(() => {
      if (props?.isSubmitSuccessful) {
        setPreviewImage(null);
      }
    }, [props?.isSubmitSuccessful]);
    const number = Math.random() * 1_000_000;

    const handleFileChange = e => {
      const file = e.target.files[0]; // Get the first file selected
      if (file && showPreviewImage) {
        const reader = new FileReader();
        reader.onload = e => {
          setPreviewImage(e.target.result); // Set the image as the preview
        };
        reader.readAsDataURL(file); // Convert file to base64 string
      }
      if (props.onChange) {
        props.onChange(e.target.files); // Trigger the onChange event passed from props
      }
    };

    const handleRemoveImage = () => {
      setPreviewImage(null); // Clear the preview image or URL
      if (props.onChange) {
        props.onChange(""); // Update the react-hook-form state to null (no file or URL)
      }
    };

    return (
      <div className={twMerge("", rootClassName)}>
        {label && (
          <label htmlFor={number} className="form-label">
            {label}
          </label>
        )}

        <input
          {...props} // Spread all props including field props here
          ref={ref} // Attach the ref to the input for focus handling
          className={twMerge(
            "form-control",
            props.className,
            "!h-0 !w-0 !opacity-0",
          )}
          type="file"
          id={number}
          onChange={handleFileChange} // Call handleFileChange when file is selected
        />

        {/* Display the preview of the selected image or URL */}
        {previewImage ? (
          <div
            className={twMerge(
              "flex flex-col items-center justify-center w-fit",
              props?.rootPrevImageClassName,
            )}
          >
            <label htmlFor={number}>
              <img
                src={previewImage}
                alt="Selected"
                className={twMerge(
                  "h-20 w-20 rounded-full object-cover",
                  props?.prevImageClassName,
                )}
              />
            </label>
            <button
              type="button"
              onClick={handleRemoveImage} // Call handleRemoveImage when clicked
              className="mt-2 text-sm text-red-500 underline font-medium"
            >
              Xóa ảnh
            </button>
          </div>
        ) : (
          <div className={twMerge("", props?.emptyClassName)}>
            <label htmlFor={number} className="block w-fit">
              <BsFileEarmarkRichtext
                size={22}
                className="cursor-pointer text-[#555] hover:text-primary"
              />
            </label>
          </div>
        )}
      </div>
    );
  },
);
FormInputFile.displayName = "FormInputFile";
export default FormInputFile;
