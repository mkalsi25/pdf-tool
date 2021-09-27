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
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });
  // useEffect(() => {
  //   axios.get("/api").then((res) => {
  //     ReactDOM.render(
  //       <div>
  //         <Edit content={res.data} path="PDF" />
  //         <PDFViewer style={styles.body}>
  //           <Property data={res.data} />
  //         </PDFViewer>
  //       </div>,
  //       document.getElementById("PDF")
  //     );
  //   });
  // });
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api", { formData }).then((res) => {
      // console.log(res.data);
      ReactDOM.render(
        <div>
          <Edit content={res.data} path="UpdatedPDF" />
          <PDFViewer style={styles.body}>
            <Property data={res.data} />
          </PDFViewer>
        </div>,
        document.getElementById("UpdatedPDF")
      );
    });
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
