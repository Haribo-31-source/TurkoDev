"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './page.css';

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, {resetForm}) => {
      try{
          const res = await axios.post("/api/v1/login",values)
          setMessage(res.data.message);
          if(res.data.redirect){
            window.location.href = "/admin/home";
          }
          resetForm();

      }catch(e){
        setMessage("Kullanıcı adı veya şifre hatalı.");
        console.log(e);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Kullanıcı adı zorunludur'),
      password: Yup.string().required('Şifre zorunludur'),
    }),
  });



  return (
    <>
    <h1>Admin Login</h1>
    <p>Admin Paneline giriş yapınız.</p>
    <form onSubmit={formik.handleSubmit}>
        <input type="text" name="username" placeholder='Username' value={formik.values.username} onChange={formik.handleChange} />
        <input type="password" name="password" placeholder='Password' value={formik.values.password} onChange={formik.handleChange} />
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
    </form>
    </>
  );
}