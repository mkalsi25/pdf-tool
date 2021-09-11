import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import axios from "axios";
import Seo from "../components/Seo";
export default function Index() {
  const [formData, updateFormData] = useState({});
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });
  useEffect(() => {
    axios
      .get("/api/idealista", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        ReactDOM.render(
          <PDFViewer style={styles.body}>
            <Property data={res.data} />
          </PDFViewer>,
          document.getElementById("PDF")
        );
      });
  });
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/idealista", { formData }).then((res) => {
      //   console.log(res.data);
      ReactDOM.render(
        <PDFViewer style={styles.body}>
          <Property data={res.data} />
        </PDFViewer>,
        document.getElementById("UpdatedPDF")
      );
    });
  };

  return (
    <div>
      <Seo
        title="PDF Generator"
        description="A PDF generator from data of web scraping. It's based on property belongs to Ibiza."
      />
      <div className="h-[50vh] flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold">PDF Generator Tool</h1>
          <form
            onSubmit={handleSubmit}
            className="grid gap-2 sm:gap-0 sm:flex items-center justify-center space-x-4 mt-6 "
          >
            <div>
              <label htmlFor="url" className="sr-only">
                Please Enter URL
              </label>
              <input
                id="url"
                type="url"
                name="url"
                onChange={handleChange}
                placeholder="https://"
                className="px-4 py-2 outline-none focus:outline-none rounded bg-white w-full lg:w-80 filter drop-shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-8 py-2 rounded bg-black text-white outline-none focus:outline"
              >
                Generate Now!
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
      <div className="bg-black p-6 mt-24 text-center uppercase text-xs tracking-[0.2em] text-white">
        <strong>Tool Developed by: Danny Waite & Team.</strong>
      </div>
    </div>
  );
}
