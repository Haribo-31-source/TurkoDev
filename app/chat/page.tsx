"use client";

import { useState, useEffect, use } from "react";
import './page.css';
import "../globals.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getApiChat } from "@/lib/getChat";

interface Chat {
  message: string;
  id: string;
}

export default function Contact() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("/api/v2/newMessage", values)
        setMessage(res.data.message);
        resetForm();

      } catch (e) {
        setMessage("Client tarafında bir hata oluştu.");
        console.log(e);
      }
    },
    validationSchema: Yup.object({
      message: Yup.string().required('Mesaj zorunludur'),
    }),
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApiChat();
      setChat(res.data);
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval)
  }, []);



  return (
    <>

      <div className="background" style={{ backgroundImage: "url('/chat.png')", filter: "blur(5px) brightness(1)" }}></div>


      <h1>Contact Form</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="chat">
          <div className="chat-header"><h1>Chat</h1></div>
          <div className="chat-content">
            {chat.map((chat) => (
              <div key={chat.id} className="msg">
                <p>{chat.message}</p>
              </div>
            ))}
            {message && <p>{message}</p>}
          </div>
          <div className="chat-input">
            <input type="text" name="message" className="msg" value={formik.values.message} onChange={formik.handleChange} placeholder="Mesajınızı buraya yazınız..." />
            <input type="submit" value="Gönder" className="button" />
          </div>
        </div>
      </form>
    </>
  );
}