import React, { useEffect } from "react";

import { gsap, Power3 } from "gsap";
export default function Progress({ step, setStep }) {
  const items = ["Add", "Edit", "Generate"];

  useEffect(() => {
    gsap.to(".progress", {
      duration: 0.5,
      ease: Power3.easeInOut,
      width: `${100 * (step / 2)}%`,
    });
  });
  return (
    <div className="py-12 w-11/12 mx-auto">
      <div className="max-w-4xl mx-auto grid items-center w-full rounded ">
        <div className="bg-stone-200 h-2 col-start-1 row-start-1 relative z-0 px-2">
          <div className="h-full w-0 bg-gradient-to-r to-stone-800 from-stone-500 progress " />
        </div>
        <div className="flex justify-between col-start-1 row-start-1 relative z-10">
          {items.map((item, key) => {
            return (
              <div key={key} className="relative">
                <span
                  className={`absolute text-xs ${
                    step >= key
                      ? "bg-black text-stone-50"
                      : "border-stone-200 border text-stone-300"
                  } px-1  rounded -mt-6 ${key === 0 ? "left-0" : ""} ${
                    key === items.length - 1 ? "right-0" : ""
                  }`}
                >
                  {item}
                </span>
                <button onClick={step >= key ? () => setStep(key) : () => null}>
                  <div
                    className={`h-6 w-6 rounded-full shadow top-0.5 relative ${
                      key === 0 ? "-left-2" : ""
                    } ${key === items.length - 1 ? "-right-2" : ""} ${
                      step >= key ? "bg-black" : "bg-stone-200"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
