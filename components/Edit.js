import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
export default function Edit({ content, update, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: [content.image],
    },
  });

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
        <div>
          <label className="uppercase tracking-widest text-xs" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("name")}
            className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
          />
        </div>
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
          <div>
            <label
              className="uppercase tracking-widest text-xs"
              htmlFor="price"
            >
              price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              {...register("price")}
              className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
            />
          </div>
        )}
        {content.location && (
          <div>
            <label
              className="uppercase tracking-widest text-xs"
              htmlFor="location"
            >
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              {...register("location")}
              className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
            />
          </div>
        )}
        {content.beds && (
          <div>
            <label className="uppercase tracking-widest text-xs" htmlFor="Beds">
              No. of Beds
            </label>
            <input
              type="number"
              id="bed"
              name="bed"
              {...register("beds")}
              className="p-2 rounded-lg outline-none focus:outline-none filter drop-shadow-md bg-white w-full"
            />
          </div>
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
  );
}
