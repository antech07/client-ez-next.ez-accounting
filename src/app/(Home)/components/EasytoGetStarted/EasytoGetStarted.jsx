"use client";
import React, { useEffect, useState } from "react";
import OurStandards from "./OurStandards";
import StandardBusinessCard from "./StandardBusinessCard";
import StandardBusinessCardMobile from "./StandardBusinessCardMobile";
import Credential from "./Credential";
import BookingModal from "../BookAMeeting/BookingModal";
import { SERVICES_API } from "@/utils/api";

function EasytoGetStarted({ professionalCredentials, partners, services: initialServices }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState(initialServices || []);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServices(initialServices);
      return;
    }

    const normalizeArray = (result) => {
      if (Array.isArray(result)) return result;
      if (Array.isArray(result?.data)) return result.data;
      if (Array.isArray(result?.result)) return result.result;
      if (Array.isArray(result?.data?.data)) return result.data.data;
      if (Array.isArray(result?.data?.result)) return result.data.result;
      return [];
    };

    const fetchServices = async () => {
      try {
        const res = await fetch(SERVICES_API, { cache: "no-store" });
        const result = await res.json();
        setServices(normalizeArray(result));
      } catch (error) {
        console.error("Services fetch error:", error);
      }
    };

    fetchServices();
  }, [initialServices]);

  const openBookingModal = () => setIsModalOpen(true);

  return (
    <div className="bg-[#F2F3F6]">
      <div className="pt-[80px]">
        <h1 className="text-center font-fustat text-[30px] font-[700] leading-[1.2] text-[#050503] lg:text-[48px]">
          Easy to Get Started
        </h1>

        <p className="mx-auto mt-[12px] max-w-[343px] text-center font-plusJakarta text-[16px] font-[500] leading-[1.5] text-[#4D4D4D] lg:max-w-[560px]">
          Easily track and manage your sales pipeline with real-time updates, visual deal stages to
          keep your sales flow seamless.
        </p>
      </div>
      <div className="mt-[40px] hidden lg:block">
        <StandardBusinessCard onGetPlan={openBookingModal} />
      </div>
      <div className="mt-[24px] block lg:hidden">
        <StandardBusinessCardMobile onGetPlan={openBookingModal} />
      </div>

      <div className="pb-[20px]">
        <Credential professionalCredentials={professionalCredentials} />
      </div>

      <div className="pb-[60px]">
        <OurStandards partners={partners} />
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
      />
    </div>
  );
}

export default EasytoGetStarted;
