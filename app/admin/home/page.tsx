"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const admin = async () => {
    const res = await axios.get("/api/v1/check", {
    withCredentials: true,
    });
    if (res.data.ok) {
      setMessage(res.data.messsage);
    }else {
      setMessage(res.data.messsage);
      router.push("/admin/login");
    }
}

  admin();
  return (
    <>
    <h1>Admin Home</h1>
    {message && <p>{message}</p>}
    </>
  );
}