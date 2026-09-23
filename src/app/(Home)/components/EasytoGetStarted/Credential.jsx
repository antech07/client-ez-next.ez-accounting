import React from "react";
import Image from "next/image";

export default function Credential({ professionalCredentials }) {
  return (
    <>
      <div className="mx-auto max-w-7xl bg-transparent px-6 md:px-10 md:py-[50px] 2xl:w-[1280px] 2xl:px-0">
        {/* ====== CREDENTIALS SECTION (LEFT TEXT + RIGHT CARDS) ====== */}
        <div className="mt-20 grid items-center gap-10 md:grid-cols-[.70fr_1.30fr]">
          {/* Left Title */}
          <div>
            <h2 className="font-fustat text-[40px] font-bold leading-tight text-[#050503] max-md:text-center">
              Our Professional <br /> Credentials
            </h2>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end md:gap-2">
            {/* Card 1 */}
            <div className="flex h-[100px] w-full items-center gap-5 rounded-2xl border border-[#193269] bg-[#FFFFFF] p-2 shadow-sm md:max-w-[230px]">
              <div className="relative h-[80px] w-[80px] flex-shrink-0">
                <Image
                  src="/assets/home/hero/fipa.png"
                  alt="FIPA"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-fustat text-[14px] font-bold text-[#777] xl:mb-2">
                  FIPA Credential
                </span>
                <span className="text-[20px] font-medium text-[#11122C]">
                  #{professionalCredentials[0].fipa}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden h-[80px] w-[1px] bg-[#CCCCCC] md:block" />

            {/* Card 2 */}
            <div className="flex h-[100px] w-full items-center gap-5 rounded-2xl border border-[#193269] bg-[#FFFFFF] p-2 shadow-sm md:max-w-[290px]">
              <div className="relative h-[80px] w-[80px] flex-shrink-0">
                <Image src="/assets/home/hero/ipa.png" alt="IPA" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-fustat text-[14px] font-bold text-[#777] xl:mb-2">
                  IPA Membership Number
                </span>
                <span className="text-[20px] font-medium text-[#11122C]">
                  #{professionalCredentials[0].ipa}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden h-[80px] w-[1px] bg-[#CCCCCC] md:block" />

            {/* Card 2 */}
            <div className="flex h-[100px] w-full items-center gap-5 rounded-2xl border border-[#193269] bg-[#FFFFFF] p-2 shadow-sm md:max-w-[250px]">
              <div className="relative h-[80px] w-[80px] flex-shrink-0">
                <Image
                  src="/assets/home/share/experience.png"
                  alt="experience"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-fustat text-[14px] font-bold text-[#777]">
                  Years of Experience
                </span>
                <span className="text-[30px] font-medium text-[#11122C]">
                  {professionalCredentials[0].experience}+
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
