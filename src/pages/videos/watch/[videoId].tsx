import FakeYoutube from "@/pages/api/fakeYoutube";
import Youtube from "@/pages/api/youtube";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function VideoDetail() {
  const router = useRouter();
  const detailId = router.query.videoId;

  const {
    isLoading,
    isError,
    data: detailVideos,
  } = useQuery(["detail", detailId], async () => {
    const youtube = new FakeYoutube();
    return youtube.detailData(detailId);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("data", detailVideos);
  const { id } = detailVideos[0];
  const { channelTitle, localized } = detailVideos[0].snippet;

  return (
    <div>
      <iframe
        width="800"
        height="450"
        src={`
        https://www.youtube.com/embed/${id}
        `}
        // ?autoplay=1&mute=1
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div>
        <p>{localized.title}</p>
        <p>{channelTitle}</p>
        <p>{localized.description}</p>
      </div>
    </div>
  );
}
