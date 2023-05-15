import FakeYoutube from "@/pages/api/fakeYoutube";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function RelatedVideos({ detailId }) {
  const {
    isLoading: relatedIsLoading,
    isError: relatedIsError,
    data: relatedVideos,
  } = useQuery(["related", detailId], async () => {
    const youtube = new FakeYoutube();
    return youtube.relatedVideo(detailId);
  });

  if (relatedIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {relatedVideos &&
        relatedVideos.map((video) => {
          const { videoId } = video.id;
          const { thumbnails, title, channelTitle } = video.snippet;
          return (
            <div key={videoId}>
              <img src={thumbnails.medium.url} alt="thumbnail" />
              <p>{title}</p>
              <p>{channelTitle}</p>
            </div>
          );
        })}
    </div>
  );
}
