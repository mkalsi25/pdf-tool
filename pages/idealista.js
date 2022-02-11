import React, { useEffect } from "react";
import { render } from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import Seo from "../components/Seo";
import Edit from "../components/Edit";
import Layout from "../components/Layout";
import { useEditPDF, useGeneratePDF } from "../lib/queries";
import { useForm } from "react-hook-form";

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
  } = useForm({
    defaultValues: {},
  });

  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });

  const {
    mutate,
    isError,
    isLoading,
    error,
    data: output,
  } = useGeneratePDF("/api/idealista");

  const onSubmit = (data) => {
    mutate(data);
  };

  const {
    mutate: update,
    isLoading: Loading,
    data: collect,
  } = useEditPDF("/api/idealista");

  const onUpdate = (data) => {
    update(data);
  };

  useEffect(() => {
    if (collect) {
      render(
        <div>
          <PDFViewer style={styles.body}>
            <Property data={collect} />
          </PDFViewer>
        </div>,
        document.getElementById("PDF")
      );
      console.log("results", collect);
    }
  }, [collect, styles]);
  // console.log("collect", collect);
  return (
    <Layout>
      <Seo
        title="PDF Generator"
        description="A PDF generator from data of web scraping. It's based on property belongs to Ibiza."
      />
      <div className="h-auto py-12">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold text-center max-w-3xl mx-auto">
            PDF Generator Tool for Idealista.
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className="grid gap-2  col-span-2">
              <label htmlFor="listingID" className="text-xs">
                Please Enter Listing ID
              </label>
              <input
                id="listingID"
                type="number"
                name="listing"
                {...register("id", { required: true })}
                placeholder="123435435"
                className="px-4 py-2 outline-none focus:outline-none rounded bg-white w-full filter drop-shadow-md"
              />
              {isError && (
                <div className=" flex items-center justify-between bg-red-100 px-6 py-3 rounded text-white fixed top-0 right-0 mt-3 mr-3">
                  <span className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-red-600 font-bold">
                      {error.message}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-2 rounded w-full bg-black text-white outline-none focus:outline flex items-center space-x-2"
              >
                <span>Generate Now!</span>
                {isLoading && (
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
        <div>
          {output && (
            <div>
              <Edit isLoading={Loading} update={onUpdate} content={output} />
            </div>
          )}

          {Loading ? (
            <div className="flex items-center justify-center ">
              <svg
                className="animate-spin h-24 w-24 text-black"
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
            </div>
          ) : (
            <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
              <div className="py-6 text-center">
                <h3
                  className="text-xs
                uppercase tracking-widest text-stone-400"
                >
                  <strong>NOTE:</strong> Please wait. Sometime it takes too much
                  time to load PDF
                </h3>
              </div>
              <div id="PDF" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
