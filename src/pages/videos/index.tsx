import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Videos() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  // 직접 videos url로 이동시 메인페이지로 리다이렉트

  return null;
}
