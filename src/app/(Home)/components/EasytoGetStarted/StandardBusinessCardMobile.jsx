"use client";

import React, { useEffect, useState, useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRICING_API, PRICINGPOINT_API } from "@/utils/api";

/*  ICONS  */
const CheckIcon = ({ className }) => {
  const uid = useId();

  return (
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
      <rect
        x="0.4"
        y="0.4"
        width="15.2"
        height="15.2"
        rx="7.6"
        stroke="#B3B3B3"
        strokeWidth="0.8"
      />
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
};

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

/* ---------------- MEDIA QUERY ---------------- */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);

    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

/* ---------------- SLIDE WRAPPER ---------------- */
function SlideFromLeft({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -140 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

/*  STANDARD CARD  */
function StandardCard({ onGetPlan, cardData, points = [] }) {
  return (
    <div className="mx-auto flex h-[950px] w-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[20px] py-[28px] lm:h-[890px]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="h-[40px] font-fustat text-[24px] font-[700] leading-[1.4] text-[#121212] lg:text-[32px]">
          {cardData?.title}
        </h3>
        <p className="font-plusJakarta text-[14px] font-[500] leading-[1.3] text-[#4D4D4D]">
          {cardData?.subtitle}
        </p>
      </div>

      <div className="mt-[16px] flex h-[52px] items-end gap-[8px] font-fustat lm:mt-[14px]">
        <span className="text-[32px] font-[700] leading-[1.7] text-[#121212] lg:text-[48px]">
          {cardData?.price !== undefined ? `$${cardData.price}` : ""}
        </span>
        <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
          + GST/per month
        </span>
      </div>

      <div className="mx-auto mt-[16px] inline-block w-[303px] overflow-hidden rounded-[12px] bg-gradient-to-r from-[#F37023] via-[#F38B23] to-[#FBAD16] p-[1px]">
        <button
          onClick={onGetPlan}
          className="h-[52px] w-full rounded-[11px] bg-[#FEFEFE] font-plusJakarta text-[18px] font-[600] leading-[1.6] text-[#050503]"
        >
          Get this plan
        </button>
      </div>

      <div
        className="my-[20px] h-px w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #D9D9D9 0, #D9D9D9 6px, transparent 6px, transparent 10px)",
        }}
      />

      <div className="flex h-[171px] flex-col gap-[12px] pb-[67px]">
        <p className="font-fustat text-[16px] font-[600] text-[#050503]">This Plan Includes:</p>

        {points.map((item, i) => (
          <div key={i} className="flex items-center gap-[12px]">
            <CheckIcon className="h-4 w-4 flex-shrink-0" />
            <span className="font-plusJakarta text-[14px] font-[500] leading-[1.7] text-[#4D4D4D]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/*  BUSINESS CARD  */
function BusinessCard({ onGetPlan, cardData, points = [] }) {
  return (
    <div
      className="relative z-20 mx-auto flex h-[940px] w-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] bg-no-repeat px-[20px] py-[28px] text-white lm:h-[860px]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="h-[40px] font-fustat text-[20px] font-[700] leading-[1.4] text-[#121212] lg:text-[32px]">
          {cardData?.title}
        </h3>

        <span className="flex h-[26px] w-[90px] items-center justify-center rounded-[6px] bg-cover bg-center bg-no-repeat">
          <Image
            src="/assets/home/share/popularimg2.svg"
            alt="Popular"
            width={104}
            height={26}
            className="scale-[1.15] object-contain"
          />
        </span>
      </div>

      {/* Subtitle */}
      <p className="font-plusJakarta text-[14px] font-[500] leading-[1.3] text-[#4D4D4D]">
        {cardData?.subtitle}
      </p>

      {/* Price */}
      <div className="mt-[16px] flex h-[52px] items-end gap-[8px] font-fustat lm:mt-[14px]">
        <span className="text-[32px] font-[700] leading-[1.7] text-[#121212] lg:text-[48px]">
          {cardData?.price !== undefined ? `$${cardData.price}` : ""}
        </span>
        <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
          + GST /per month
        </span>
      </div>

      {/* Button (same hover as before) */}
      <div
        className="mx-auto mt-[20px] inline-block w-[303px] overflow-hidden rounded-[12px] p-[1px]"
        style={{
          background: "linear-gradient(237deg, #FDCB0C 1.16%, #F8911D 55.56%, #F36C24 109.96%)",
        }}
      >
        <button
          onClick={onGetPlan}
          className="h-[52px] w-full rounded-[11px] bg-transparent font-plusJakarta text-[18px] font-[600] leading-[1.6] text-white transition-all duration-300 hover:bg-transparent hover:text-white"
        >
          Get this plan
        </button>
      </div>

      {/* Divider */}
      <div
        className="my-[20px] h-px w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #4D4D4D 0, #4D4D4D 6px, transparent 6px, transparent 10px)",
        }}
      />

      {/* Includes */}
      <div className="flex h-[171px] flex-col gap-[12px] pb-[67px]">
        <p className="font-plusJakarta text-[16px] font-[600] text-[#333333]">
          This Plan Includes:
        </p>

        {points.map((item, i) => (
          <div key={i} className="flex items-center gap-[12px]">
            <CheckIconSolid className="h-4 w-4 flex-shrink-0" />
            <span className="font-plusJakarta text-[14px] font-[500] leading-[1.7] text-[#4D4D4D]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/*  ENTERPRISE CARD  */
function EnterpriseCard({ onGetPlan, cardData, points = [] }) {
  return (
    <div className="mx-auto flex h-[940px] w-full flex-col rounded-[24px] border border-[#E6E6E6] bg-[#FEFEFE] px-[20px] py-[28px] lm:h-[860px]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="h-[45px] font-fustat text-[24px] font-[700] leading-[1.4] text-[#121212] lg:text-[32px]">
          {cardData?.title}
        </h3>
        <p className="font-plusJakarta text-[14px] font-[500] leading-[1.3] text-[#4D4D4D]">
          {cardData?.subtitle}
        </p>
      </div>

      <div className="mt-[16px] flex items-end gap-[8px] font-fustat lm:mt-[14px]">
        <span className="text-[32px] font-[700] leading-[1.7] text-[#121212] lg:text-[48px]">
          {cardData?.price !== undefined ? `$${cardData.price}` : ""}
        </span>
        <span className="mb-[15px] text-[18px] font-[500] leading-[1.7] text-[#121212]">
          + GST /per month
        </span>
      </div>

      <div className="mx-auto mt-[20px] inline-block w-[303px] overflow-hidden rounded-[12px] bg-gradient-to-r from-[#F37023] via-[#F38B23] to-[#FBAD16] p-[1px]">
        <button
          onClick={onGetPlan}
          className="h-[52px] w-full rounded-[11px] bg-[#FEFEFE] font-plusJakarta text-[18px] font-[600] leading-[1.6] text-[#050503]"
        >
          Get this plan
        </button>
      </div>

      <div
        className="my-[20px] h-px w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #D9D9D9 0, #D9D9D9 6px, transparent 6px, transparent 10px)",
        }}
      />

      <div className="flex h-[171px] flex-col gap-[12px] pb-[67px]">
        <p className="font-fustat text-[16px] font-[600] text-[#050503]">This Plan Includes:</p>

        {points.map((item, i) => (
          <div key={i} className="flex items-center gap-[12px]">
            <CheckIcon className="h-4 w-4 flex-shrink-0" />
            <span className="font-plusJakarta text-[14px] font-[500] leading-[1.7] text-[#4D4D4D]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/*  MAIN (MOBILE ONLY)  */
export default function StandardBusinessCardMobile({ onGetPlan }) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [pricingList, setPricingList] = useState([]);
  const [pricingPoints, setPricingPoints] = useState([]);

  useEffect(() => {
    if (!isMobile) return;

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
      }
    };

    fetchData();
  }, [isMobile]);

  if (!isMobile) return null;

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
    <div className="mx-auto w-full px-[16px]">
      <div className="flex flex-col gap-[24px]">
        <SlideFromLeft delay={0}>
          <StandardCard onGetPlan={onGetPlan} cardData={card1Data} points={card1Points} />
        </SlideFromLeft>

        <SlideFromLeft delay={0.1}>
          <BusinessCard onGetPlan={onGetPlan} cardData={card2Data} points={card2Points} />
        </SlideFromLeft>

        <SlideFromLeft delay={0.2}>
          <EnterpriseCard onGetPlan={onGetPlan} cardData={card3Data} points={card3Points} />
        </SlideFromLeft>
      </div>
    </div>
  );
}
