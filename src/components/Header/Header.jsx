import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";

import Link from "next/link";
export default function Header() {
  const router = useRouter();
  const keyword = router.query.keyword;
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordInput = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchOnSubmit = (event) => {
    event.preventDefault();
    router.push(`/videos/${searchKeyword}`);
  };

  useEffect(() => {
    setSearchKeyword(keyword || "");
  }, [keyword]);

  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link href="/" className="flex items-center">
        <BsYoutube className="text-4xl text-brand" />
        <h1 className="font-bold ml-2 text-3xl">Youtube</h1>
      </Link>

      <form
        className="w-full flex justify-center"
        onSubmit={handleSearchOnSubmit}
      >
        <input
          className="w-7/12 p-2 outline-none bg-black text-gray-50"
          placeholder="Search..."
          type="text"
          value={searchKeyword}
          onChange={handleSearchKeywordInput}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
