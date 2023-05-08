import { useQuery } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import FakeYoutube from "./api/fakeYoutube";
import Youtube from "./api/youtube";

export default function Home() {
  const {
    isLoading,
    error,
    data: popularVideos,
  } = useQuery(["popular"], async () => {
    const youtube = new Youtube();
    return youtube.search();
  });
  console.log(popularVideos);
  return (
    <div>
      {popularVideos?.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.snippet.title}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
}
