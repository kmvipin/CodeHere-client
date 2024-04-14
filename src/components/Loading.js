import React from "react";

const Loading = ({content}) => {
  return (
    <div className="absolute w-full h-full  flex justify-center z-10">
      <span className="self-center">
        <text className="font-medium text-lg text-gray-800">{content}</text>
        </span>
    </div>
  );
};

export default Loading;
