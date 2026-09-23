"use client";

import Image from "next/image";

export default function ServiceCard({ service, onClick }) {
  if (!service) return null;

  return (
    <div
      onClick={onClick}
      className="group relative h-[182px] w-[165px] lg:h-[240px] lg:w-[270px] 2xl:h-[260px] 2xl:w-[297px]"
    >
      {/* clip shapes */}
      <svg width="0" height="0">
        <defs>
          {/*  DESKTOP CLIP (unchanged) */}
          <clipPath id="card-clip-desktop" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.04 0
                H 0.75
                C 0.83 0 0.83 0.01 0.83 0.085
                V 0.108
                C 0.83 0.19 0.85 0.19 0.88 0.19
                H 0.96
                C 0.985 0.19 1 0.215 1 0.24
                V 0.958
                C 1 0.98 0.98 1 0.955 1
                H 0.045
                C 0.01 1 0 0.98 0 0.954
                V 0.05
                C 0 0.02 0.02 0 0.04 0
                Z
              "
            />
          </clipPath>

          {/* ✅ MOBILE CLIP (slightly bigger cut for the arrow area) */}
          <clipPath id="card-clip-mobile" clipPathUnits="objectBoundingBox">
            <path
              d="
    M 0.04 0
    H 0.65
    C 0.83 0 0.83 0.01 0.83 0.085
    V 0.082
    C 0.83 0.15 0.85 0.15 0.88 0.15
    H 0.96
    C 0.985 0.15 1 0.175 1 0.20
    V 0.958
    C 1 0.98 0.98 1 0.955 1
    H 0.045
    C 0.01 1 0 0.98 0 0.954
    V 0.05
    C 0 0.02 0.02 0 0.04 0
    Z
  "
            />
          </clipPath>
        </defs>
      </svg>

      {/* card border */}
      <div className="relative overflow-hidden [clip-path:url(#card-clip-mobile)] lg:[clip-path:url(#card-clip-desktop)]">
        {/* normal border */}
        <div className="absolute inset-0 bg-[#E6E6E6] transition-opacity group-hover:opacity-0" />

        {/* hover border */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: "linear-gradient(225deg,#2758D0 0%,#193269 50%,#0F152C 100%)",
          }}
        />

        {/* card body */}
        <div
          className="relative h-[182px] bg-white px-[10px] pb-[10px] pt-[10px] [clip-path:url(#card-clip-mobile)] lg:h-[240px] lg:px-[16px] lg:pb-[16px] lg:pt-[16px] lg:[clip-path:url(#card-clip-desktop)] 2xl:h-[260px] 2xl:px-[20px] 2xl:pb-[20px] 2xl:pt-[20px]"
          style={{ margin: "1px" }}
        >
          {/* icon */}
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border-[0.58px] border-[#E6E6E6] bg-white lg:h-[48px] lg:w-[48px] 2xl:h-[56px] 2xl:w-[56px] 2xl:rounded-[12px]">
            <Image
              src={service.icon}
              alt={service.title}
              width={38}
              height={38}
              className="h-[24px] w-[24px] lg:h-[38px] lg:w-[38px] 2xl:h-[48px] 2xl:w-[48px]"
            />
          </div>

          {/* title */}
          <h3 className="mt-[10px] text-[14px] font-[600] leading-[1.5] text-black lg:mt-[18px] lg:text-[18px] 2xl:mt-[24px] 2xl:text-[20px]">
            {service.title}
          </h3>

          {/* desc */}
          <p className="mt-[8px] text-[12px] leading-[1.5] text-[#4D4D4D] lg:mt-[12px] lg:text-[13px] 2xl:mt-[16px] 2xl:text-[14px]">
            {service.description}
          </p>
        </div>
      </div>

      {/* arrow */}
      <div
        className="absolute right-0 top-0 z-50 overflow-hidden"
        style={{ padding: "1.2px", borderRadius: "10px" }}
      >
        {/* border */}
        <div className="absolute inset-0 bg-[#E6E6E6] transition-opacity group-hover:opacity-0" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: "linear-gradient(225deg,#2758D0 0%,#193269 50%,#0F152C 100%)",
          }}
        />

        {/* btn */}
        <div className="relative flex h-[24px] w-[24px] items-center justify-center rounded-[8px] bg-white text-[#2758D0] transition-all group-hover:bg-transparent group-hover:text-white lg:h-[38px] lg:w-[38px] lg:rounded-[8px] 2xl:h-[44px] 2xl:w-[44px] 2xl:rounded-[10px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 29 29"
            className="xl:h-[24px] xl:w-[24px] 2xl:h-[29px] 2xl:w-[29px]"
            fill="none"
          >
            <path
              d="M17.97 10.31L10.02 18.27M18.27 17.09C18.27 17.09 19.2 10.95 18.27 10.02C17.34 9.09 11.2 10.02 11.2 10.02"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
