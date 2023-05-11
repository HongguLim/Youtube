import FakeYoutube from "@/pages/api/fakeYoutube";
import Youtube from "@/pages/api/youtube";
import { useQuery } from "@tanstack/react-query";

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

  const {
    isLoading: relatedIsLoading,
    isError: relatedIsError,
    data: relatedVideos,
  } = useQuery(["related", detailId], async () => {
    const youtube = new FakeYoutube();
    return youtube.relatedVideo(detailId);
  });

  if (isLoading || relatedIsLoading) {
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
        https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div>
        <p>{localized.title}</p>
        <p>{channelTitle}</p>
        <p>{localized.description}</p>
      </div>
      {relatedVideos && (
        <div>
          {relatedVideos.map((video) => (
            <div key={video.id.videoId}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                width={video.snippet.thumbnails.medium.width}
                height={video.snippet.thumbnails.medium.height}
              />
              <p>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
