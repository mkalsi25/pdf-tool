import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/IdealistaProperty";
import axios from "axios";
import Seo from "../components/Seo";
import Edit from "../components/Edit";
import Layout from "../components/Layout";

export default function Index() {
  const [formData, updateFormData] = useState({});
  const [load, setLoad] = useState(false);
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setLoad((load) => !load);

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
      axios.post("/api/idealista", { formData }).then((res) => {
        console.log(res.data);
        setLoad((load) => !load);

        ReactDOM.render(
          <div>
            {/* <Edit content={res.data} path={"UpdatedPDF"} /> */}
            <PDFViewer style={styles.body}>
              <Property data={res.data} />
            </PDFViewer>
          </div>,
          document.getElementById("UpdatedPDF")
        );
      });
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
            PDF Generator Tool for Idealista.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className="grid gap-2  col-span-2">
              <label htmlFor="listingID" className="text-xs">
                Please Enter Listing ID
              </label>
              <input
                id="listingID"
                type="number"
                required
                name="listing"
                onChange={handleChange}
                placeholder="123435435"
                className="px-4 py-2 outline-none focus:outline-none rounded bg-white w-full filter drop-shadow-md"
              />
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
        <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
          <div id="UpdatedPDF" />
        </div>
        <div className="w-11/12 mx-auto rounded-2xl overflow-hidden">
          <div id="PDF" />
        </div>
      </div>
    </Layout>
  );
}
