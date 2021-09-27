import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import UpdateProperty from "../components/UpdateProperty";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
export default function Edit({ content, path }) {
  const [edit, setEdit] = useState(false);
  const [formData, updateFormData] = useState({});
  const pop = () => {
    setEdit((edit) => !edit);
  };
  // console.log(content.name);
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: "100vh",
    },
  });

  const DOM = ReactDOM;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: content?.name,
      description: content?.details[0]?.text,
      images: content?.image,
    },
  });

  const HandleClick = (data) => {
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
      document.getElementById(path)
    );
    axios.patch("/api", { data }).then((res) => {
      DOM.render(
        <div>
          {/* <Edit content={res.data} /> */}
          <PDFViewer style={styles.body}>
            <UpdateProperty data={res.data} />
          </PDFViewer>
        </div>,
        document.getElementById(path)
      );
    });
  };

  return (
    <div className="w-11/12 mx-auto absolute">
      {edit ? (
        <div className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-screen flex items-center justify-center">
          <div className="relative h-[50vh] max-w-3xl w-11/12 mx-auto bg-white rounded-2xl shadow-xl p-7">
            <div
              onClick={pop}
              role="button"
              className="absolute w-12 h-12 rounded-full bg-black text-white flex items-center justify-center -top-4 -right-4"
            >
              X
            </div>
            <form onSubmit={handleSubmit(HandleClick)} className="grid gap-4">
              <h3 className="text-2xl lg:text-4xl font-bold">
                Please edit your description for PDF.
              </h3>
              <div>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  {...register("description")}
                  className="p-2 rounded-2xl outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-8 py-2 rounded-2xl bg-black text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          role="button"
          onClick={pop}
          className="bg-black rounded px-8 py-2 text-white inline-block drop-shadow-md filter relative top-10 ml-8"
        >
          Edit PDF
        </div>
      )}
    </div>
  );
}
