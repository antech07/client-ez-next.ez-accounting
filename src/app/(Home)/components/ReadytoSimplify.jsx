"use client";

import CommonButton from "@/components/shared/CommonButton/CommonButton";
import React, { useState } from "react";
import BookingModal from "./BookAMeeting/BookingModal";

function ReadytoSimplify() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#FEFEFE] py-[40px] lg:rounded-b-[45px] lg:py-[65px] xl:rounded-b-[65px] xl:py-[65px] 2xl:rounded-b-[75px] 2xl:py-[75px]">
      <div className="bg-fill relative mx-auto h-[460px] max-w-[343px] rounded-[24px] bg-[url('/assets/home/share/readySimplifyMobile.png')] bg-center bg-no-repeat lg:h-[420px] lg:max-w-[980px] lg:bg-[url('/assets/home/share/ReadySimplify.png')] xl:h-[420px] xl:max-w-[1100px] 2xl:h-[480px] 2xl:max-w-[1285px]">
        {/*  CONTENT */}
        <div className="relative z-10 flex h-[73%] w-full items-center justify-center md:ml-[80px] md:h-full md:justify-start">
          <div className="w-[276px] text-center md:text-left lg:w-[782px]">
            <h1 className="font-fustat text-[30px] font-[700] leading-[1.4] tracking-[-0.3px] text-[#121212] xl:text-[40px]">
              Ready to Simplify Your Accounting?
            </h1>
            <p className="mx-auto mt-[12px] font-plusJakarta text-[16px] font-[400] leading-[1.5] text-[#4D4D4D] lg:text-[14px] xl:text-[16px]">
              Talk to an expert and see exactly how your finances can run smoother—starting this
              week.
            </p>

            <div className="mt-[40px] flex justify-center md:justify-start lg:mt-[30px] xl:mt-[40px]">
              <CommonButton text="Book A Meeting" onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default ReadytoSimplify;
