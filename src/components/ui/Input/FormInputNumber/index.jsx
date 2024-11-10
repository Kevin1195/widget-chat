import React, { forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import LabelForInput from "../../LabelForInput";
// Helper function to format number with commas
export const formatWithCommas = (num, acceptZero = true) => {
  if (acceptZero && num === 0) {
    return num;
  }
  if (isNaN(num) || !num) {
    return "";
  }
  return (+num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const FormInputNumber = forwardRef(
  (
    {
      rootClassName,
      labelClassName,
      label,
      addonBefore,
      inputClassName,
      mainClassName,
      acceptZero = true,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(props.value || ""); // Formatted value for display

    // Handle change event and format number if formatNumber is true
    const handleChange = (e) => {
      let rawValue =
        e.target.value == 0 ? 0 : +e.target.value.replace(/[^0-9]/g, "") || ""; // The raw number without commas
      if (rawValue.toString().length > 15) {
        return;
      }
      const formattedValue = formatWithCommas(rawValue, acceptZero); // Formatted value with commas
      setDisplayValue(formattedValue);
      // Call the original onChange handler if provided, passing the raw value (unformatted)
      if (props.onChange) {
        props.onChange({
          ...e,
          target: {
            ...e.target,
            value: rawValue, // Send the raw number to onChange
          },
        });
      }
    };
    useEffect(() => {
      const rs = formatWithCommas(props?.value, acceptZero);
      setDisplayValue(rs);
    }, [props?.value]);
    return (
      <div className={twMerge("flex flex-col w-full", rootClassName)}>
        <LabelForInput labelClassName={labelClassName} label={label} />
        <div className={twMerge(" text-[#989898] flex gap-1", mainClassName)}>
          {addonBefore || ""}
          <input
            ref={ref} // Attach the ref to the input for focus handling
            {...props} // Spread all props including field props here
            value={displayValue} // Display the formatted value with commas
            onChange={handleChange} // Format number on change if needed
            className={twMerge("form-control", inputClassName)}
            id={props?.id}
          />
        </div>
      </div>
    );
  }
);
// Add display name
FormInputNumber.displayName = "FormInputNumber";
export default FormInputNumber;
