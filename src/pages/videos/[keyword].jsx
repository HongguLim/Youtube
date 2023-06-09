import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

import Youtube from "../api/youtube";
import VideoCard from "@/components/Search/VideoCard";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const {
    isLoading,
    error,
    data: searchedVideos,
  } = useQuery(
    ["search", keyword],
    async () => {
      const youtube = new Youtube();
      return youtube.search(keyword);
    },
    { staleTime: 1000 * 60 * 5 }
  );

  return <VideoCard searchedVideos={searchedVideos} keyword={keyword} />;
}
