import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { twMerge } from "tailwind-merge";
const Editor = ({ rootClassName, label, ...props }) => {
  const fonts = ["serif", "monospace", "Arial", "Times New Roman"];
  const fontSizes = fonts.map((font) => ({ label: font, value: font }));

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: ["serif", "monospace", "Arial", "Times New Roman"] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  //   const modules = {
  //     toolbar: [
  //       [{ font: fonts }], // Chỉ định các font chữ cụ thể
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }], // Tùy chọn cỡ chữ cơ bản
  //       [{ size: ["12px", false, "large", "huge"] }], // custom dropdown
  //       ["bold", "italic", "underline", "strike"], // toggled buttons
  //       ["blockquote", "code-block"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       ["image", "link"],
  //     ],
  //   };
  return (
    <div className={twMerge("", rootClassName)}>
      <label htmlFor={props.id} className="form-label">
        {label}
      </label>
      <ReactQuill
        {...props}
        theme="snow"
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
};

export default Editor;
