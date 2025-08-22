"use client";

import { useState } from "react";
import './page.css';
import "../globals.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Contact() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message:"",
    },
    onSubmit: async (values, {resetForm}) => {
      try{
          const res = await axios.post("/api/v2/newMessage",values)
          setMessage(res.data.message);
          resetForm();

      }catch(e){
        setMessage("Client tarafında bir hata oluştu.");
        console.log(e);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required('İsim zorunludur'),
      email: Yup.string().email('Geçerli e-posta girin').required('E-posta zorunludur').max(50, 'E-posta uzunluğu 50 karakterden kısa olmalıdır').min(3, 'E-posta uzunluğu 3 karakterden uzun olmalıdır'),
    }),
  });




  return (
      <>

    <div className="background" style={{backgroundImage:"url('/chat.png')", filter:"blur(5px) brightness(1)"}}></div>


    <h1>Contact Form</h1>

    <form onSubmit={formik.handleSubmit}>
      <input type="text" id="name" name="name" placeholder='Name' value={formik.values.name} onChange={formik.handleChange} />
      {formik.touched.name && formik.errors.name && <p id="error1">{formik.errors.name}</p>}
      <input type="email" id="email" name="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange}/>
      {formik.touched.email && formik.errors.email && <p id="error2">{formik.errors.email}</p>}
      <textarea id="message" name="message" placeholder='Message' value={formik.values.message} onChange={formik.handleChange}></textarea>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
    </>
  );
}