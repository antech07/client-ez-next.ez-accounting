"use client";
import React, { useState } from "react";
import OurStandards from "./OurStandards";
import StandardBusinessCard from "./StandardBusinessCard";
import StandardBusinessCardMobile from "./StandardBusinessCardMobile";
import Credential from "./Credential";
import BookingModal from "../BookAMeeting/BookingModal";

function EasytoGetStarted({ professionalCredentials, partners }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        {/* <div className="mt-[24px] flex items-center justify-center gap-[16px] lg:mt-[60px]">
          <span className="font-plusJakarta text-[16px] font-[400] leading-[1.7] text-[#121212]">
            Billed monthly
          </span>

          <button
            type="button"
            className="relative h-[24px] w-[40px] cursor-pointer rounded-full border-none bg-[#2F5BEA] lg:h-[30px] lg:w-[52px]"
          >
            <span className="absolute left-[-2px] top-[2px] h-[20px] w-[20px] translate-x-[20px] rounded-full bg-[#FBF9F5] lg:left-[4px] lg:h-[25px] lg:w-[25px]" />
          </button>

          <span className="font-plusJakarta text-[16px] font-[400] leading-[1.7] text-[#121212]">
            Billed Yearly
          </span>
        </div> */}
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

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default EasytoGetStarted;
