import Article from "@/components/Articles/Article";
import CategoryBar from "@/components/CategoryBar/CategoryBar";

import Feed from "@/components/feed/Feed";

const fetchPosts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "";
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
    <main className=" p-5  xl:w-[65%]">
      <link rel="icon" href="favicon.ico" sizes="any" />
      <CategoryBar />

      <Feed data={data} />
    </main>
  );
}
