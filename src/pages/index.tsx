import { useQuery } from "@tanstack/react-query";

import { Inter } from "next/font/google";

import { useYoutubeDataFetch } from "./api/youtube";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos"], async () => {
    return useYoutubeDataFetch();
  });

  return (
    <div>
      {videos?.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.snippet.localized.title}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
}
