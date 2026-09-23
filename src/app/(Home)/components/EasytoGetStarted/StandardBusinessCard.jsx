"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRICING_API, PRICINGPOINT_API } from "@/utils/api";

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.4"
      y="0.4"
      width="15.2"
      height="15.2"
      rx="7.6"
      fill="url(#paint0_linear_1047_7691)"
    />
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" fill="#FEFEFE" />
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" stroke="#B3B3B3" strokeWidth="0.8" />
    <path
      d="M11.76 5.87988L7.14004 10.4999L5.04004 8.39988"
      stroke="#4D4D4D"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1047_7691"
        x1="13.76"
        y1="-2.92307"
        x2="-6.36315"
        y2="10.3731"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2758D0" />
        <stop offset="0.5" stopColor="#193269" />
        <stop offset="1" stopColor="#0F152C" />
      </linearGradient>
    </defs>
  </svg>
);
const CheckIconSolid = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.4"
      y="0.4"
      width="15.2"
      height="15.2"
      rx="7.6"
      fill="url(#paint0_linear_1047_7675)"
    />
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" fill="#FEFEFE" />
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" stroke="#F36C24" strokeWidth="0.8" />
    <path
      d="M11.76 5.87988L7.14004 10.4999L5.04004 8.39988"
      stroke="#F36C24"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1047_7675"
        x1="13.76"
        y1="-2.92307"
        x2="-6.36315"
        y2="10.3731"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2758D0" />
        <stop offset="0.5" stopColor="#193269" />
        <stop offset="1" stopColor="#0F152C" />
      </linearGradient>
    </defs>
  </svg>
);

const CardSkeleton = ({ initial }) => (
  <motion.div
    initial={initial}
    animate={initial}
    className="mx-auto flex h-full animate-pulse flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[24px] py-[32px] lg:h-[910px] lg:w-[300px] xl:h-[860px] xl:w-[366px] 2xl:h-[800px] 2xl:w-[406.67px]"
  >
    {/* Title & Subtitle Skeleton */}
    <div className="flex flex-col gap-[8px]">
      <div className="h-[28px] w-3/4 rounded-md bg-gray-200" />
      <div className="mt-2 h-[14px] w-full rounded bg-gray-200" />
      <div className="h-[14px] w-5/6 rounded bg-gray-200" />
    </div>

    {/* Price Skeleton */}
    <div className="mt-[20px] flex items-end gap-[8px]">
      <div className="h-[48px] w-[120px] rounded-md bg-gray-200" />
      <div className="mb-[6px] h-[18px] w-[100px] rounded bg-gray-200" />
    </div>

    {/* Button Skeleton */}
    <div className="mt-[20px] h-[52px] w-full rounded-[12px] bg-gray-200" />

    {/* Divider */}
    <div className="my-[24px] h-px w-full bg-gray-200" />

    {/* Includes Skeleton */}
    <div className="flex flex-1 flex-col gap-[16px]">
      <div className="h-[18px] w-2/5 rounded bg-gray-200" />

      <div className="flex flex-col gap-[12px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-[12px]">
            <div className="h-4 w-4 flex-shrink-0 rounded-full bg-gray-200" />
            <div className="h-[14px] w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

function StandardBusinessCard({ onGetPlan }) {
  const [pricingList, setPricingList] = useState([]);
  const [pricingPoints, setPricingPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const normalizeArray = (result) => {
      if (Array.isArray(result)) return result;
      if (Array.isArray(result?.data)) return result.data;
      if (Array.isArray(result?.result)) return result.result;
      if (Array.isArray(result?.data?.data)) return result.data.data;
      if (Array.isArray(result?.data?.result)) return result.data.result;
      return [];
    };

    const fetchData = async () => {
      try {
        const [resPricing, resPoints] = await Promise.all([
          fetch(PRICING_API, { cache: "no-store" }),
          fetch(PRICINGPOINT_API, { cache: "no-store" }),
        ]);

        const jsonPricing = await resPricing.json();
        const jsonPoints = await resPoints.json();

        setPricingList(normalizeArray(jsonPricing));
        setPricingPoints(normalizeArray(jsonPoints));
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full overflow-hidden lg:max-w-[1000px] lg:gap-[20px] xl:max-w-[1100px] xl:gap-[20px] 2xl:max-w-[1280px] 2xl:gap-[30px]">
        <CardSkeleton initial={{ opacity: 0, x: 440 }} />
        <CardSkeleton initial={{ opacity: 0 }} />
        <CardSkeleton initial={{ opacity: 0, x: -440 }} />
      </div>
    );
  }

  const activePricings = pricingList.filter((p) => p.isActive !== false);

  const sortedPricing = [...activePricings].sort(
    (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
  );

  const card1Data =
    activePricings.find(
      (p) => p.slug === "package-for-gps" || p.title?.toLowerCase().includes("gp"),
    ) || sortedPricing[0];

  const card2Data =
    activePricings.find(
      (p) => p.slug === "small-businesses" || p.title?.toLowerCase().includes("small"),
    ) || sortedPricing[1];

  const card3Data =
    activePricings.find(
      (p) => p.slug === "businesses-with-payroll" || p.title?.toLowerCase().includes("payroll"),
    ) || sortedPricing[2];

  const getPointsForPricing = (pricingId) => {
    if (!pricingId) return [];
    return pricingPoints
      .filter((pt) => {
        if (pt.isActive === false) return false;
        const ptPricingId = typeof pt.pricing === "object" ? pt.pricing?._id : pt.pricing;
        return String(ptPricingId) === String(pricingId);
      })
      .map((pt) => pt.planPoint);
  };

  const card1Points = card1Data ? getPointsForPricing(card1Data._id) : [];
  const card2Points = card2Data ? getPointsForPricing(card2Data._id) : [];
  const card3Points = card3Data ? getPointsForPricing(card3Data._id) : [];

  return (
    <div className="mx-auto flex w-full lg:max-w-[1000px] lg:gap-[20px] xl:max-w-[1100px] xl:gap-[20px] 2xl:max-w-[1280px] 2xl:gap-[30px]">
      {/* STANDARD */}
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.6 }}
        className="mx-auto flex h-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[24px] py-[32px] lg:h-[910px] lg:w-[300px] xl:h-[860px] xl:w-[366px] 2xl:h-[800px] 2xl:w-[406.67px]"
      >
        {/* Title */}
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-fustat text-[24px] font-[700] leading-[1.4] text-[#121212] lg:text-[14px] xl:text-[17px] 2xl:text-[19px] 3xl:text-[24px]">
            {card1Data?.title}
          </h3>
          <p className="font-plusJakarta font-[500] leading-[1.4] text-[#4D4D4D] lg:text-[12px] 2xl:text-[14px]">
            {card1Data?.subtitle}
          </p>
        </div>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            {card1Data?.price !== undefined ? `$${card1Data.price}` : ""}
          </span>
          <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
            + GST /per month
          </span>
        </div>

        {/* Button */}
        <div className="mt-[20px] inline-block overflow-hidden rounded-[12px] bg-gradient-to-r from-[#F37023] via-[#F38B23] to-[#FBAD16] p-[1px] transition-all duration-300">
          <button
            onClick={onGetPlan}
            className="h-[52px] w-full rounded-[11px] bg-[#FEFEFE] font-plusJakarta text-[18px] font-[600] text-[#050503] hover:bg-transparent hover:text-white"
          >
            Get this plan
          </button>
        </div>

        {/* Divider */}
        <div
          className="my-[24px] h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #D9D9D9 0, #D9D9D9 6px, transparent 6px, transparent 10px)",
          }}
        />

        {/* Includes */}
        <div className="flex flex-1 flex-col gap-[12px]">
          <p className="font-fustat text-[16px] font-[600] text-[#050503]">This Plan Includes:</p>

          <div className="flex flex-col gap-[10px]">
            {card1Points.map((item, i) => (
              <div key={i} className="flex items-start gap-[12px]">
                <CheckIcon className="h-4 w-4 flex-shrink-0" />
                <span className="font-plusJakarta text-[14px] text-[#4D4D4D]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* BUSINESS */}
      <div
        className="relative z-20 mx-auto flex h-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[24px] py-[32px] lg:h-[910px] lg:w-[300px] xl:h-[860px] xl:w-[366px] 2xl:h-[800px] 2xl:w-[406.67px]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-fustat text-[24px] font-[700] leading-[1.4] text-[#121212] lg:text-[14px] xl:text-[17px] 2xl:text-[19px] 3xl:text-[24px]">
            {card2Data?.title}
          </h3>

          <span className="flex h-[26px] w-[104px] items-center justify-center rounded-[6px]">
            <Image
              src="/assets/home/share/popularimg2.svg"
              alt="Popular"
              width={104}
              height={26}
              className="object-contain"
            />
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-[4px] leading-[1.4] text-[#4D4D4D] lg:text-[12px] 2xl:text-[14px]">
          {card2Data?.subtitle}
        </p>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            {card2Data?.price !== undefined ? `$${card2Data.price}` : ""}
          </span>
          <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
            + GST /per month
          </span>
        </div>

        {/* Button */}
        <div
          className="mx-auto mt-[20px] block rounded-[12px] p-[1px] lg:w-[250px] xl:w-[308px] 2xl:w-[358px]"
          style={{
            background: "linear-gradient(237deg, #FDCB0C 1.16%, #F8911D 55.56%, #F36C24 109.96%)",
          }}
        >
          <button
            onClick={onGetPlan}
            className="h-[55px] w-full rounded-[11px] bg-transparent font-plusJakarta text-[18px] font-[600] leading-[1.7] text-white transition-all hover:bg-white hover:text-[#F36C24]"
          >
            Get this plan
          </button>
        </div>

        {/* Divider */}
        <div
          className="my-[24px] h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #4D4D4D 0, #4D4D4D 6px, transparent 6px, transparent 10px)",
          }}
        />

        {/* Includes */}
        <div className="flex flex-1 flex-col gap-[12px]">
          <p className="font-[600] text-[#333333]">This Plan Includes:</p>

          <div className="flex flex-col gap-[10px]">
            {card2Points.map((item, i) => (
              <div key={i} className="flex items-start gap-[12px]">
                <CheckIconSolid className="h-4 w-4 flex-shrink-0" />
                <span className="font-plusJakarta text-[14px] text-[#4D4D4D]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ENTERPRISE */}
      <motion.div
        initial={{ opacity: 0, x: -400 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.6 }}
        className="mx-auto flex h-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[24px] py-[32px] lg:h-[910px] lg:w-[300px] xl:h-[860px] xl:w-[366px] 2xl:h-[800px] 2xl:w-[406.67px]"
      >
        {/* Title */}
        <div className="flex flex-col gap-[4px]">
          <h3 className="font-fustat text-[24px] font-[700] text-[#121212] lg:text-[14px] xl:text-[17px] 2xl:text-[19px] 3xl:text-[24px]">
            {card3Data?.title}
          </h3>
          <p className="font-plusJakarta font-[500] leading-[1.4] text-[#4D4D4D] lg:text-[12px] 2xl:text-[14px]">
            {card3Data?.subtitle}
          </p>
        </div>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            {card3Data?.price !== undefined ? `$${card3Data.price}` : ""}
          </span>
          <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
            + GST /per month
          </span>
        </div>

        {/* Button */}
        <div className="mt-[20px] inline-block overflow-hidden rounded-[12px] bg-gradient-to-r from-[#F37023] via-[#F38B23] to-[#FBAD16] p-[1px] transition-all duration-300">
          <button
            onClick={onGetPlan}
            className="h-[52px] w-full rounded-[11px] bg-[#FEFEFE] font-plusJakarta text-[18px] font-[600] text-[#050503] hover:bg-transparent hover:text-white"
          >
            Get this plan
          </button>
        </div>

        {/* Divider */}
        <div
          className="my-[24px] h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #D9D9D9 0, #D9D9D9 6px, transparent 6px, transparent 10px)",
          }}
        />

        {/* Includes */}
        <div className="flex flex-1 flex-col gap-[12px]">
          <p className="font-fustat text-[16px] font-[600] text-[#050503]">This Plan Includes:</p>

          <div className="flex flex-col gap-[10px]">
            {card3Points.map((item, i) => (
              <div key={i} className="flex items-start gap-[12px]">
                <CheckIcon className="h-4 w-4 flex-shrink-0" />
                <span className="font-plusJakarta text-[14px] text-[#4D4D4D]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StandardBusinessCard;
