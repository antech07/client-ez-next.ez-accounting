"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

function StandardBusinessCard({ onGetPlan }) {
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
            Package for GPs
          </h3>
          <p className="font-plusJakarta font-[500] leading-[1.4] text-[#4D4D4D] lg:text-[12px] 2xl:text-[14px]">
            Preparation of Annual financial accounts, based on the information being entered and
            reconciled in an accounting software package.
          </p>
        </div>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            $350
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
            {[
              "Preparation of Income Tax Returns and Tax planning",
              "Review and analysis of your financial accounts",
              "Bookkeeping ( Up to 500 transactions in a year, additional charges apply)",
              "Review and assist in preparation and lodgement of your BAS/GST, PAYGW and PAYGI obligations to the ATO as necessary",
              "Review and analysis of your financial accounts",
              "Accounting Software subscription includedt",
              "Finalizations and compilation of all documents as required for your signature and for lodgement with the Australian Taxation Office where required",
              "Annual package for GP",
            ].map((item, i) => (
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
            Small Businesses
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
          Preparation of Annual financial accounts, based on the information being entered and
          reconciled in an accounting software package.
        </p>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            $450
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

        {/* Includes (FIXED HERE) */}
        <div className="flex flex-1 flex-col gap-[12px]">
          <p className="font-[600] text-[#333333]">This Plan Includes:</p>

          <div className="flex flex-col gap-[10px]">
            {[
              "Preparation of Income Tax Returns and Tax planning",
              "Review and analysis of your financial accounts",
              "Bookkeeping ( Up to 500 transactions in a year, additional charges apply)",
              "Review and assist in preparation and lodgement of your BAS/GST, PAYGW and PAYGI obligations to the ATO as necessary",
              "Review and analysis of your financial accounts",
              "Accounting Software subscription included",
              "Finalizations and compilation of all documents as required for your signature and for lodgement with the Australian Taxation Office where required",
            ].map((item, i) => (
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
            Businesses with Payroll
          </h3>
          <p className="font-plusJakarta font-[500] leading-[1.4] text-[#4D4D4D] lg:text-[12px] 2xl:text-[14px]">
            Preparation of Annual financial accounts, based on the information being entered and
            reconciled in an accounting software package.
          </p>
        </div>

        {/* Price */}
        <div className="mt-[8px] flex items-end gap-[8px] font-fustat">
          <span className="text-[48px] font-[700] leading-[1.7] text-[#121212] lg:text-[25px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px]">
            $600
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

        {/* Includes (FIXED) */}
        <div className="flex flex-1 flex-col gap-[12px]">
          <p className="font-fustat text-[16px] font-[600] text-[#050503]">This Plan Includes:</p>

          <div className="flex flex-col gap-[10px]">
            {[
              "Preparation of Income Tax Returns and Tax planning",
              "Review and analysis of your financial accounts",
              "Bookkeeping (Up to 500 transactions in a year, additional charges apply)",
              "Review and assist in preparation and lodgement of your BAS/GST, PAYGW and PAYGI obligations to the ATO as necessary",
              "Review and analysis of your financial accounts",
              "Accounting Software subscription included",
              "Finalizations and compilation of all documents as required for your signature and for lodgement with the Australian Taxation Office where required",
            ].map((item, i) => (
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
