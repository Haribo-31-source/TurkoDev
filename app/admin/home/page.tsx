"use client";

import "../layout.css";
import { Check } from "@/lib/check";
import { getApi } from "@/lib/getBlog";
import { useEffect, useState } from "react";
import { deleteApi } from "@/lib/delete";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [data, setData] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getApi();
      setData(response.data);
    };

    fetchData();
  }, []);

  Check();

  const loading = Check();


  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <>
      <h1>Admin Home</h1>
      <h2>Bloglar</h2>
      <div className="blogs">
        {data.map((blog) => (
          <div key={blog.id} className="blog">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            <input type="button" value="Sil" className="delete" onClick={() => {deleteApi(blog.id); setData(prev => prev.filter(b => b.id !== blog.id));}} />
          </div>
        ))}
      </div>
    </>
  );
}