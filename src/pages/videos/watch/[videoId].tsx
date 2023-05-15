import ChannelInfo from "@/components/Detail/ChannelInfo";
import RelatedVideos from "@/components/Detail/RelatedVideos";
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
    const youtube = new Youtube();
    return youtube.detailData(detailId);
  });

  const { id } = detailVideos.videoData;
  const { channelId, channelTitle, localized } = detailVideos.videoData.snippet;
  const { thumbnails } = detailVideos?.channelData.snippet;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`
        https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
        <div className="p-8">
          <h2 className="text-xl font-bold">{localized.title}</h2>
          <ChannelInfo
            id={channelId}
            name={channelTitle}
            thumbnails={thumbnails}
          />
          <pre className="whitespace-pre-wrap">{localized.description}</pre>
        </div>
      </article>
      <div>
        <RelatedVideos detailId={detailId} />
      </div>
    </section>
  );
}
