import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  rootClassName,
  title = "Loading",
  isLoading,
  disabled,
  htmlType = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={htmlType}
      className={twMerge(
        `ti-btn  ti-btn-primary-full me-2`,
        rootClassName,
        disabled && "ti-btn-disabled"
      )}
      disabled={disabled}
      key={Math.random()}
    >
      {isLoading && (
        <span
          className="ti-spinner text-white !h-4 !w-4"
          role="status"
          aria-label="loading"
        ></span>
      )}

      <span className="">{title}</span>
    </button>
  );
};

export default Button;
