import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const fetchData = async () => {
  //   const response = await axios.get("/videos/popular.json");
  //   setPolularData(response.data.items);
  // };

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos"], async () => {
    return axios.get("/videos/popular.json").then((res) => res.data.items);
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
