import Article from "@/components/Articles/Article";
import CategoryBar from "@/components/CategoryBar/CategoryBar";
import React from "react";
import notfound from "../../../Animation/json/notfound.json";
import Animation from "@/Animation/Animation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

const fetchPostsCategory = async (category: string) => {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto =
      h.get("x-forwarded-proto") ||
      (process.env.NODE_ENV === "development" ? "http" : "https");
    const baseUrl = `${proto}://${host}`;
    const res = await fetch(
      `${baseUrl}/api/post/fetch?category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
const Category = async ({ params }: { params: { slug: string } }) => {
  const convertedStr =
    params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  const data = await fetchPostsCategory(convertedStr);

  return (
    <main className=" p-5  xl:w-[65%] bg-white border border-black rounded-md">
      <CategoryBar />

      {data.length > 0 ? (
        <>
          {" "}
          {data?.map((item: any) => (
            <Article key={item._id} props={item} />
          ))}
        </>
      ) : (
        <Animation
          animationData={notfound}
          classes=" flex items-center justify-center"
        />
      )}

      {/* {params.slug} */}
    </main>
  );
};

export default Category;
