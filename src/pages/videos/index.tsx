import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Videos() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}