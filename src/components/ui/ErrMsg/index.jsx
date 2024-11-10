import React from "react";
import { twMerge } from "tailwind-merge";

const ErrMsg = ({ rootClassName, errMsg }) => {
  return (
    <p
      className={twMerge(
        "absolute top-[78%] text-sm font-semibold w-full",
        "!text-[#FF0000]",
        rootClassName
      )}
    >
      {errMsg}
    </p>
  );
};

export default ErrMsg;
