import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
// import axios from "axios";
import Seo from "../components/Seo";
// import Edit from "../components/Edit";
export default function Generate() {
  //   const [formData, updateFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {},
  });
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });

  const Submit = (data, e) => {
    e.preventDefault();
    ReactDOM.render(
      <div>
        {/* <Edit content={res.data} path="UpdatedPDF" /> */}
        <PDFViewer style={styles.body}>
          <Property generate={data} />
        </PDFViewer>
      </div>,
      document.getElementById("PDF")
    );
  };

  return (
    <div>
      <Seo
        title="PDF Generator"
        description="A PDF generator from data of web scraping. It's based on property belongs to Ibiza."
      />
      <div className="h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold">PDF Generator Tool</h1>
          <form
            onSubmit={handleSubmit(Submit)}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className=" col-span-2">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="text"
                {...register("title")}
                placeholder="Title"
                className="px-4 py-2 outline-none focus:outline-none rounded bg-white w-full filter drop-shadow-md"
              />
            </div>
            <div className="col-span-2">
              <label className="sr-only" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="8"
                placeholder="write description"
                {...register("description")}
                className="p-2 rounded-2xl outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="sr-only" htmlFor="img">
                image
              </label>
              <input
                type="file"
                multiple
                name="img"
                id="img"
                accept="image/x-png,image/gif,image/jpeg"
                {...register("image")}
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-2 rounded w-full bg-black text-white outline-none focus:outline"
              >
                Generate Now!
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
          <div id="PDF" />
        </div>
      </div>
      <div className="bg-black p-6 mt-24 text-center uppercase text-xs tracking-[0.2em] text-white">
        <strong>Tool Developed by: Danny Waite & Team.</strong>
      </div>
    </div>
  );
}
