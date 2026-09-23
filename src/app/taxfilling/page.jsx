import React from "react";
import ContactHero from "./TaxFillingHero/TaxFillingHero";
import GetInTouch from "./TaxReturnForm/TaxReturnForm";

function page() {
  return (
    <div>
      <div className="mb-[-40px] lg:mb-[-115px]">
        <ContactHero />
      </div>
      <div
        className="relative bottom-0 z-20 overflow-hidden rounded-t-[30px] bg-white lm:bottom-[-20px] lm:rounded-[30px] lg:bottom-[-35px] lg:rounded-[45px] xl:bottom-[-50px] xl:rounded-[65px] 2xl:bottom-[-55px] 2xl:rounded-[80px]"
        style={{ boxShadow: "0 -10px 10px rgba(0,0,0,0.08)" }}
      >
        <GetInTouch />
      </div>
    </div>
  );
}

export default page;
