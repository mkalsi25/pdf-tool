import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/CasafariProperty";
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
    // setLoad((load) => !load)
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
    axios.post("/api/casafari", { formData }).then((res) => {
      // console.log(res.data);
      ReactDOM.render(
        <div>
          <PDFViewer style={styles.body}>
            <Property data={res.data} />
          </PDFViewer>
        </div>,
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
      <div className="h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold">PDF Generator Tool</h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className="grid gap-2  col-span-2">
              <label htmlFor="id" className="text-xs">
                Please Enter Casafari ID
              </label>
              <input
                id="id"
                type="number"
                required
                name="id"
                onChange={handleChange}
                placeholder="42808793"
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
      <div className="bg-black p-6 mt-24 text-center uppercase text-xs tracking-[0.2em] text-white">
        <strong>Tool Developed by: Danny Waite & Team.</strong>
      </div>
    </div>
  );
}
