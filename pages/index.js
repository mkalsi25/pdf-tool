import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import axios from "axios";
import Seo from "../components/Seo";
import Edit from "../components/Edit";
import Layout from "../components/Layout";
export default function Index() {
  const [formData, updateFormData] = useState({});
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);

  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });
  // us
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    try {
      setLoad((load) => !load);
      e.preventDefault();
      ReactDOM.render(
        <div className="flex items-center justify-center ">
          {/* <Edit content={res.data} path="UpdatedPDF" /> */}

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
        </div>,
        document.getElementById("UpdatedPDF")
      );
      axios.post("/api", { formData }).then((res) => {
        // console.log(res.data);
        setLoad((load) => !load);
        if (res.status === 200) {
          ReactDOM.render(
            <div>
              <Edit content={res.data} path="UpdatedPDF" />
              <PDFViewer style={styles.body}>
                <Property data={res.data} />
              </PDFViewer>
            </div>,
            document.getElementById("UpdatedPDF")
          );
        } else {
          setErr((err) => !err);
        }
      });
    } catch (e) {
      console.log(e + "Errror");
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
            PDF Generator Tool for Kyero.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className="grid gap-2  col-span-2">
              <label htmlFor="url" className="text-xs">
                Please Enter URL
              </label>
              <input
                id="url"
                type="url"
                required
                name="url"
                onChange={handleChange}
                placeholder="https://"
                className="px-4 py-2 outline-none focus:outline-none rounded bg-white w-full filter drop-shadow-md"
              />
              {err && (
                <div className="flex items-center justify-between bg-red-600 px-6 py-3 rounded-xl text-white">
                  <span className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Wrong Entry</span>
                  </span>
                  <button
                    onClick={() => setErr((err) => !err)}
                    className="px-4 py-2 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-2 rounded w-full bg-black text-white outline-none focus:outline flex items-center space-x-2"
              >
                <span>Generate Now!</span>
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
        <div>
          <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
            <div id="UpdatedPDF" />
          </div>
        </div>
        <div>
          <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
            <div id="PDF" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
