import { useRouter } from "next/router";
import React from "react";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword;
  return <div>Parameter query : {keyword}</div>;
}
