import React from "react";

const Message = ({ text, size, type, isHidden }) => {
  const getTextColor = (type) => {
    if (type === "success") {
      return "success-txt";
    } else if (type === "error") {
      return "error-txt";
    }
    return "";
  };
  return (
    <div
      className={`${(size = "small" ? "message-text-sml" : "")} ${getTextColor(
        type
      )}
      ${isHidden ? "vis-visible" : "vis-hidden"}`}
    >
      {text}
    </div>
  );
};

export default Message;
