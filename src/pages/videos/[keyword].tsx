import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import FakeYoutube from "../api/youtube";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], async () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });

  return (
    <div>
      <h1>{keyword}에 대한 검색결과 입니다.</h1>
      <br />
      <br />
      <div>
        {videos?.map((item) => {
          return (
            <div key={item.id.videoId}>
              <p>{item.snippet.channelTitle}</p>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
