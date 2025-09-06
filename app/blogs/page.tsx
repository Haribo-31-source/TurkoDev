"use client";

import { useEffect, useState } from "react";
import { getApi } from "@/lib/getBlog";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export default function Blogs() {

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fecth = async () => {
      const res = await getApi();
      setBlogs(res.data);
    }
    fecth();
  }, []);

  return (
    <>
      <div className="background" style={{ backgroundImage: "url('/background.png')", filter: "blur(5px) brightness(1)" }}></div>
      <div className="blogs">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}