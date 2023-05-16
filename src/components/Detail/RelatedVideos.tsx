import FakeYoutube from "@/pages/api/fakeYoutube";
import { formatAgo } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function RelatedVideos({ relatedVideo }) {
  return (
    <div>
      {relatedVideo &&
        relatedVideo.map((video) => {
          const { videoId } = video.id;
          const { thumbnails, title, channelTitle, publishedAt } =
            video.snippet;
          return (
            <Link href={`/videos/watch/${videoId}`} key={videoId}>
              <li className="flex gap-1 m-2">
                <img
                  className="w-60 mr-2"
                  src={thumbnails.medium.url}
                  alt="thumbnail"
                />
                <div>
                  <p className="font-semibold my-2 line-clamp-2">{title}</p>
                  <p className="text-sm opacity-80">{channelTitle}</p>
                  <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
                </div>
              </li>
            </Link>
          );
        })}
    </div>
  );
}
