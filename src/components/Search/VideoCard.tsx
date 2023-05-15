import { formatAgo } from "@/util/date";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function VideoCard({ searchedVideos, popularVideos, keyword }) {
  const videos = keyword ? searchedVideos : popularVideos;
  const router = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
      {videos?.map((item) => {
        const { id, snippet } = item;
        const { title, thumbnails, channelTitle, publishedAt } = snippet;

        return (
          <li key={id}>
            <Link href={`/videos/watch/${id}`}>
              <img className="w-full" src={thumbnails.medium.url} alt={title} />
              <div>
                <p className="font-semibold my-2 line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
