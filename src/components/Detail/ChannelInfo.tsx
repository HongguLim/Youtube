import React from "react";

export default function ChannelInfo({ name, thumbnails }: any) {
  return (
    <div className="flex my-4 mb-8 items-center">
      <img
        className="w-10 h-10 rounded-full"
        src={thumbnails.medium.url}
        alt="thumbnail"
      />
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
}
