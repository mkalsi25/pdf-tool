import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import Property from "../components/Property";
import Seo from "../components/Seo";
import Edit from "../components/Edit";
import Layout from "../components/Layout";
import { useEditPDF, useGeneratePDF } from "../lib/queries";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import Errors from "../components/form/Errors";
import Button from "../components/form/Button";
import Loader from "../components/form/Loader";
import { Transition } from "@headlessui/react";
import Progress from "../components/form/Progress";

export default function Index() {
  const [step, setStep] = useState(0);
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
  useEffect(() => {
    if (output) {
      setStep(1);
    }
  }, [output]);
  const {
    mutate: update,
    isLoading: Loading,
    data: collect,
  } = useEditPDF("/api/idealista");

  const onUpdate = (data) => {
    update(data);
    setStep(2);
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
      <Progress step={step} setStep={setStep} />
      <div className="h-auto py-12">
        <div className="relative max-w-3xl mx-auto w-11/12">
          <div className="w-full h-full space-y-12 mt-6 absolute">
            <Transition
              as="form"
              show={step === 0 ? true : false}
              enter="transition ease-in-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in-out duration-300"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-6 items-center"
            >
              <div className="grid gap-2  col-span-2">
                <Input
                  register={register}
                  required
                  label="Enter Listing ID"
                  name="id"
                  type="number"
                  placeholder="Enter Listing ID"
                  errors={errors}
                />
                {isError && <Errors error={error} />}
              </div>
              <div className="flex justify-end col-span-2">
                <Button type="submit" label="Submit" isLoading={isLoading} />
              </div>
            </Transition>
            <Transition
              as="div"
              show={step === 1 ? true : false}
              enter="transition ease-in-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in-out duration-300"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
              className="absolute w-full"
            >
              <div>
                {isLoading ? (
                  <Loader className={"h-24 w-24 text-black"} />
                ) : (
                  <Edit
                    isLoading={Loading}
                    update={onUpdate}
                    content={output}
                  />
                )}
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <Transition
        as="div"
        show={step === 2 ? true : false}
        enter="transition ease-in-out duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in-out duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
        className="grid gap-6"
      >
        {Loading ? (
          <Loader className={"h-24 w-24 text-black"} />
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
      </Transition>
    </Layout>
  );
}
