import { useRouter } from "next/router";
import React from "react";

export default function VideoDetail() {
  const router = useRouter();
  const id = router.query.videoId;
  return <div>Parameter id : {id}</div>;
}
