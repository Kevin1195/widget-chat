// import React, { forwardRef } from "react";
// import Select from "react-select";

// const SelectV1 = forwardRef(({ label, options = [], ...props }, ref) => {
//   return (
//     <div>
//       <label className="form-label">{label}</label>
//       <Select
//         {...props}
//         ref={ref} // Attach ref to the Select component
//         options={options}
//         className="js-example-basic-single w-full"
//         isSearchable
//         menuPlacement="auto"
//         classNamePrefix="Select2"
//         isClearable={true}
//       />
//     </div>
//   );
// });

// export default SelectV1;

import React, { forwardRef } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import LabelForInput from "../LabelForInput";

const SelectV1 = forwardRef(
  ({ label, labelClassName, options = [], rootClassName, ...props }, ref) => {
    return (
      <div className={twMerge("", rootClassName)}>
        <LabelForInput labelClassName={labelClassName} label={label} />
        <Select
          {...props}
          options={options}
          className="js-example-basic-single w-full "
          isSearchable
          menuPlacement="auto"
          classNamePrefix="Select2"
          isClearable={false}
          // styles={{
          //   control: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: "#23334c",
          //     borderColor: state.isFocused ? "" : provided.borderColor,
          //     outlineWidth: 0,
          //     outline: "none",
          //     boxShadow: "none",
          //     borderWidth: 0,
          //     "&:hover": {
          //       borderColor: state.isFocused ? "" : provided.borderColor,
          //       outlineWidth: 0,
          //     },
          //   }),
          //   container: (provided) => ({
          //     ...provided,
          //     fontSize: "14px",
          //   }),
          //   singleValue: (provided) => ({
          //     ...provided,
          //     color: "#cbd5d8",
          //   }),
          // }}
        />
      </div>
    );
  }
);
// Add display name
SelectV1.displayName = "SelectV1";
export default SelectV1;
