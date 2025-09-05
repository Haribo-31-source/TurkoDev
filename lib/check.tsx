"use client";

import { useState , useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function Check(){
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const admin = async () => {
    const res = await axios.get("/api/v1/check", {
    withCredentials: true,
    });
    if (res.data.ok) {
      setLoading(false);
    }else {
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
}

export function useMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const admin = async () => {
      try {
        const res = await axios.get("/api/v1/check", { withCredentials: true });
        if (res.data.ok) {
          setMessage(res.data.message);
        } else {
          setMessage(res.data.messsage);
        }
      } catch (err) {
        setMessage("Hata oluştu.");
      }
    };
    admin();
  }, []);

  return message;
}
