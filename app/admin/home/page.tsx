"use client";

import { useState , useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../layout.css";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const admin = async () => {
    const res = await axios.get("/api/v1/check", {
    withCredentials: true,
    });
    if (res.data.ok) {
      setMessage(res.data.message);
      setLoading(false);
    }else {
      setMessage(res.data.messsage);
      router.push("/admin/login");
      setLoading(true);
    }
}

  useEffect(() => {
    admin();
  }, []);

  if(loading){
    return <p>Yükleniyor...</p>
  }
  return (
    <>
    <h1>Admin Home</h1>
    {message && <p>{message}</p>}
    </>
  );
}