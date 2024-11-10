import EmojiPicker from "emoji-picker-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { LuSmilePlus } from "react-icons/lu";

const IconMessage = ({ handleEmoji }) => {
  const [openEmoji, setOpenEmoji] = useState(false);

  const emojiPickerRef = useRef(null);
  const triggerRef = useRef(null); // Tham chiếu nút mở

  // Đóng EmojiPicker khi nhấn bên ngoài
  useEffect(() => {
    const handleClickOutside = event => {
      event.stopPropagation();
      // Nếu nhấn bên ngoài EmojiPicker và nút mở, thì ẩn EmojiPicker
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setOpenEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenEmoji]);
  return (
    <div ref={emojiPickerRef} className="">
      <div className="absolute bottom-[100%] left-0 w-full">
        <EmojiPicker
          searchDisabled={true}
          skinTonesDisabled={true}
          open={openEmoji}
          onEmojiClick={handleEmoji}
          emojiStyle="native"
          className="[&>div:nth-child(3)]:hidden [&>div:nth-child(1)]:hidden !rounded-none !w-full !h-40 [&_.epr-emoji-category-label]:!hidden"
          categories={["smileys_people"]}
          lazyLoadEmojis
        />
      </div>
      <LuSmilePlus
        className="cursor-pointer text-[#555] hover:text-primary text-[22px] md:text-2xl"
        onClick={e => {
          e.stopPropagation();
          setOpenEmoji(!openEmoji);
        }}
        ref={triggerRef} // Tham chiếu nút mở
      />
    </div>
  );
};

export default memo(IconMessage);
