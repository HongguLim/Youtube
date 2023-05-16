import { useQuery } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import FakeYoutube from "./api/fakeYoutube";
import Youtube from "./api/youtube";
import VideoCard from "@/components/Search/VideoCard";

export default function Home() {
  const {
    isLoading,
    error,
    data: popularVideos,
  } = useQuery(
    ["popular"],
    async () => {
      const youtube = new Youtube();
      return youtube.search();
    },
    { staleTime: 1000 * 60 * 5 }
  );

  return <VideoCard popularVideos={popularVideos} />;
}
