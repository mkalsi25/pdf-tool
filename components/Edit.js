import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./form/Input";
import Loader from "./form/Loader";
export default function Edit({ content, update, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (content) {
      reset(content);
    }
  }, [content, reset]);
  return (
    <div className="relative mb-12 max-w-3xl w-11/12 mx-auto bg-stone-200 rounded-xl p-7">
      <form onSubmit={handleSubmit(update)} className="grid gap-4">
        <h3 className="text-2xl lg:text-4xl font-bold">
          Update content before generating PDF.
        </h3>

        <Input
          type="text"
          name="name"
          errors={errors}
          register={register}
          label="Title"
        />
        <div>
          <label
            className="uppercase tracking-widest text-xs"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="8"
            {...register("details")}
            className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
          ></textarea>
        </div>
        {content.price && (
          <Input
            type="text"
            name="price"
            errors={errors}
            register={register}
            label="Price"
          />
        )}
        {content.location && (
          <Input
            type="text"
            name="location"
            errors={errors}
            register={register}
            label="Location"
          />
        )}
        {content.beds && (
          <Input
            type="text"
            name="beds"
            errors={errors}
            register={register}
            label="No. of bed"
          />
        )}

        {content["AmenitiesCertificado energético"] && (
          <div>
            <div>
              <h3 className="uppercase tracking-widest text-xs">Amenities</h3>
              <div className="grid grid-cols-4 gap-4 py-2">
                {content["AmenitiesCertificado energético"].map((item, key) => {
                  return (
                    <input
                      key={key}
                      type="text"
                      id="bed"
                      name="bed"
                      {...register(`AmenitiesCertificado energético[${key}]`)}
                      className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {content["Basic features"] && (
          <div>
            <div>
              <h3 className="uppercase tracking-widest text-xs">
                Basic features
              </h3>
              <div className="grid grid-cols-4 gap-4 py-2">
                {content["Basic features"].map((item, key) => {
                  return (
                    <input
                      key={key}
                      type="text"
                      id="bed"
                      name="bed"
                      {...register(`Basic features[${key}]`)}
                      className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {content.BuildingAmenities && (
          <div>
            <div>
              <h3 className="uppercase tracking-widest text-xs">Amenities</h3>
              <div className="grid grid-cols-4 gap-4 py-2">
                {content.BuildingAmenities.map((item, key) => {
                  return (
                    <input
                      key={key}
                      type="text"
                      id="bed"
                      name="bed"
                      {...register(`BuildingAmenities[${key}]`)}
                      className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {content.image.length !== 0 && (
          <div className="grid gap-1">
            <label
              className="uppercase tracking-widest text-xs"
              htmlFor="description"
            >
              Images
            </label>

            <strong className="text-5xl">{content.image.length}</strong>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-2 rounded-xl bg-black text-white flex items-center gap-4"
          >
            <span>Generate Now</span>
            {isLoading && <Loader className={"h-4 w-4 text-black"} />}
          </button>
        </div>
      </form>
    </div>
  );
}
