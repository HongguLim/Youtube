import React from "react";

export default function ChannelInfo({ id, name, thumbnails }) {
  return (
    <div>
      <p>{name}</p>
      <img src={thumbnails.medium.url} alt="thumbnail" />
    </div>
  );
}
