"use client";
import React, { useEffect, useState } from "react";
import Article from "../Articles/Article";
import { useSearchTextStore } from "../../../store/useSearchTextStore";

const Feed = ({ data }: { data: any[] }) => {
  const [filteredpost, setFilteredPost] = useState<any[]>([]);
  const { text }: any = useSearchTextStore();

  useEffect(() => {
    if (!data) {
      setFilteredPost([]);
      return;
    }
    const normalizedText = (text || "").toLowerCase();
    if (normalizedText.length === 0) {
      setFilteredPost(data);
      return;
    }
    const filter = data.filter((post: any) =>
      (post?.title || "").toLowerCase().includes(normalizedText)
    );
    setFilteredPost(filter);
  }, [text, data]);

  return (
    <div>
      {(filteredpost?.length ?? 0) > 0
        ? filteredpost.map((item: any) => (
            <Article key={item._id} props={item} />
          ))
        : data?.map((item: any) => <Article key={item._id} props={item} />)}
    </div>
  );
};

export default Feed;
