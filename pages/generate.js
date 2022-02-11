import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { render } from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
export default function Generate() {
  const [load, setLoad] = useState(false);

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
    try {
      setLoad((load) => !load);
      e.preventDefault();

      render(
        <div>
          <PDFViewer style={styles.body}>
            <Property generate={data} />
          </PDFViewer>
        </div>,
        document.getElementById("PDF")
      );
      setLoad((load) => !load);
    } catch (e) {
      console.log(e + "Error");
    }
  };

  return (
    <Layout>
      <Seo
        title="PDF Generator"
        description="A PDF generator from data of web scraping. It's based on property belongs to Ibiza."
      />
      <div className="h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold text-center max-w-3xl mx-auto">
            Manual PDF Generator Tool
          </h1>
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
                className="px-8 py-2 rounded w-full bg-black text-white outline-none focus:outline flex items-center space-x-2"
              >
                <span>Submit</span>
                {load && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
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
    </Layout>
  );
}
