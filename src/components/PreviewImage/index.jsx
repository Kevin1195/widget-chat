import { useState } from "react";
import { IoMdClose } from "react-icons/io";
const index = ({ image }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={image}
        className="w-full h-full object-scale-down"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <img
            src={image}
            className="w-full h-full object-scale-down"
            onClick={e => e.stopPropagation()}
          />
          <IoMdClose
            size={25}
            className="absolute top-5 right-5 text-white cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default index;
