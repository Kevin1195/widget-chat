// import React, { forwardRef } from "react";
// import { twMerge } from "tailwind-merge";

// const FormInput = forwardRef(({ rootClassName, label, ...props }, ref) => {
//   return (
//     <div className={twMerge("", rootClassName)}>
//       <label htmlFor={props.id} className="form-label">
//         {label}
//       </label>
//       <input
//         ref={ref} // Attach the ref to the input for focus handling
//         {...props} // Spread all props including field props here
//         className={twMerge("form-control", props.className)}
//         id={props.id}
//       />
//     </div>
//   );
// });

// export default FormInput;
// border-[#dcdfe6] text-slate-300 focus:outline-none text-lg py-2 w-full disabled:bg-[#132235] px-3 bg-[#23334c]  h-[38px] rounded disabled:text-[hsl(0,0%,60%)]
import React, { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import LabelForInput from "../../LabelForInput";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const FormInput = forwardRef(
  (
    {
      type = "text",
      rootClassName,
      labelClassName,
      label,
      addonBefore,
      inputClassName,
      mainClassName,
      ...props
    },
    ref
  ) => {
    const [isShow, setIsShow] = useState(true);

    return (
      <div className={twMerge("flex flex-col w-full", rootClassName)}>
        <LabelForInput labelClassName={labelClassName} label={label} />
        <div
          className={twMerge(
            " text-[#989898] flex gap-1 relative",
            mainClassName
          )}
        >
          {addonBefore || ""}
          <input
            ref={ref} // Attach the ref to the input for focus handling
            {...props} // Spread all props including field props here
            type={type === "password" && isShow ? "password" : "text"}
            className={twMerge("form-control ", inputClassName)}
            id={props?.id}
          />
          {type === "password" && (
            <div
              onClick={() => setIsShow(!isShow)}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {isShow ? (
                <FaRegEye size={20} className="text-[#7F888B]" />
              ) : (
                <FaRegEyeSlash size={20} className="text-[#7F888B]" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
// Add display name
FormInput.displayName = "FormInput";
export default FormInput;
