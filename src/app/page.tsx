import Article from "@/components/Articles/Article";
import CategoryBar from "@/components/CategoryBar/CategoryBar";

import Feed from "@/components/feed/Feed";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

const fetchPosts = async () => {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto =
      h.get("x-forwarded-proto") ||
      (process.env.NODE_ENV === "development" ? "http" : "https");
    const baseUrl = `${proto}://${host}`;
    const res = await fetch(`${baseUrl}/api/post/fetch`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Home() {
  const data = await fetchPosts();

  return (
    <main className=" p-5  xl:w-full  ">
      <link rel="icon" href="favicon.ico" sizes="any" />
      <CategoryBar />

      <Feed data={data} />
    </main>
  );
}
