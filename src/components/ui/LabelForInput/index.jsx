import React from "react";
import { twMerge } from "tailwind-merge";

const LabelForInput = ({ labelClassName, label }) => {
  return (
    <label className={twMerge("form-label", labelClassName)}>{label}</label>
  );
};

export default LabelForInput;
