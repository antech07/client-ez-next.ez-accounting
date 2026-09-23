import React, { Suspense } from "react";
import ContactHero from "./ContactHero/ContactHero";
import GetInTouch from "./GetInTouch/GetInTouch";

import { $fetch } from "@/lib/fetcher";
import { SERVICES_API } from "@/utils/api";
import { mapServicesData } from "@/utils/serviceMapper";

async function page() {
  const [servicesData, weHandle, individualTax, addons] = await Promise.all([$fetch(SERVICES_API)]);

  const services = mapServicesData(
    servicesData?.data || [],
    weHandle?.data || [],
    individualTax?.data || [],
    addons?.data || [],
  );

  return (
    <div>
      <div className="mb-[-40px] lg:mb-[-70px] xl:mb-[-115px]">
        <ContactHero />
      </div>
      <Suspense>
        <div
          className="relative bottom-0 z-20 overflow-hidden rounded-t-[30px] bg-white lm:bottom-[-20px] lm:rounded-[30px] lg:bottom-[-35px] lg:rounded-[45px] xl:bottom-[-50px] xl:rounded-[65px] 2xl:bottom-[-55px] 2xl:rounded-[80px]"
          style={{ boxShadow: "0 -10px 10px rgba(0,0,0,0.08)" }}
        >
          <GetInTouch services={services} />
        </div>
      </Suspense>
    </div>
  );
}

export default page;
