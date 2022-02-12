import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { render } from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Loader from "../components/form/Loader";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
export default function Generate() {
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <div className="w-full">
          <form
            onSubmit={handleSubmit(Submit)}
            className="grid grid-cols-2 gap-6 w-11/12  items-center mt-6 max-w-3xl mx-auto"
          >
            <div className="col-span-2">
              <Input
                type={"text"}
                name="title"
                register={register}
                required
                errors={errors}
                placeholder="Your title"
                label={"Your title"}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                type={"text"}
                name="description"
                register={register}
                required
                errors={errors}
                placeholder="Your Description"
                label={"Your Description"}
              />
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
                className="file:rounded-xl file:border file:px-8 file:py-4 uppercase text-xs tracking-widest file:uppercase file:text-xs file:tracking-widest file:mr-4 file:bg-stone-100 file:border-stone-100/10 "
                accept="image/x-png,image/gif,image/jpeg"
                {...register("image")}
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-2 rounded bg-black text-white outline-none focus:outline flex items-center space-x-2"
              >
                <span>Submit</span>
                {load && <Loader className={"h-4 w-4 text-black"} />}
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
