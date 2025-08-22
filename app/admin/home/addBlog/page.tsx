"use client";
import { useState } from "react";
import './page.css';
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddBlog() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content:"",
    },
    onSubmit: async (values, {resetForm}) => {
      try{
          const res = await axios.post("/api/v1/newBlog",values)
          setMessage(res.data.message);
          resetForm();

      }catch(e){
        setMessage("Client tarafında bir hata oluştu.");
        console.log(e);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Başlık zorunludur'),
      author: Yup.string().required('Yazar zorunludur'),
      content: Yup.string().required('Içerik zorunludur'),
    }),
  });


  return (
    <>
    <h1>Add Blog</h1>
    <form onSubmit={formik.handleSubmit}>
        <input type="text" name="title" placeholder='Title' value={formik.values.title} onChange={formik.handleChange} />
        <p id="error1">
            {formik.touched.title && formik.errors.title ? formik.errors.title : ""}
        </p>
        <input type="text" name="author" placeholder='Author' value={formik.values.author} onChange={formik.handleChange} />
          <p id="error2">
            {formik.touched.author && formik.errors.author ? formik.errors.author : ""}
        </p>
        <textarea name="content" placeholder='Content' value={formik.values.content} onChange={formik.handleChange}></textarea>
        {message && <p>{message}</p>}
        <button type="submit">Submit</button>
    </form>
    </>
  );
}