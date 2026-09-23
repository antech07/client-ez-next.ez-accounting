import React, { Suspense } from "react";
import ReadytoSimplify from "../(Home)/components/ReadytoSimplify";
import ServicesGrid from "./ServicesGrid/ServicesGrid";
import ServicesHero from "./ServicesHero/ServicesHero";

import { $fetch } from "@/lib/fetcher";
import {
  SERVICES_API,
  WE_HANDLE_API,
  INDIVIDUALTAXRETURN_API,
  COMMONADDONS_API,
} from "@/utils/api";
import { mapServicesData } from "@/utils/serviceMapper";

async function page() {
  const [servicesData, weHandle, individualTax, addons] = await Promise.all([
    $fetch(SERVICES_API),
    $fetch(WE_HANDLE_API),
    $fetch(INDIVIDUALTAXRETURN_API),
    $fetch(COMMONADDONS_API),
  ]);

  const services = mapServicesData(
    servicesData.data,
    weHandle.data,
    individualTax.data,
    addons.data,
  );

  // console.log(services, "service");

  return (
    <div>
      <div className="mb-[-40px] md:mb-[-60px]">
        <ServicesHero />
      </div>
      <Suspense>
        <div
          className="relative z-20 mb-[-40px] rounded-t-[30px] bg-[#FEFEFE] lg:mb-[-80px] lg:rounded-t-[45px] xl:rounded-t-[65px] 2xl:mb-[-132px] 2xl:rounded-t-[80px]"
          style={{ boxShadow: "0 -10px 10px rgba(0,0,0,0.08)" }}
        >
          <ServicesGrid services={services} />
        </div>
      </Suspense>

      <div className="relative z-20 lg:bottom-[-35px] xl:bottom-[-50px] 2xl:bottom-[-68px]">
        <ReadytoSimplify />
      </div>
    </div>
  );
}

export default page;
