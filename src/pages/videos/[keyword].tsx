import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";
import VideoCard from "@/components/Search/VideoCard";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const {
    isLoading,
    error,
    data: searchedVideos,
  } = useQuery(["search", keyword], async () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });

  return <VideoCard searchedVideos={searchedVideos} keyword={keyword} />;
}
