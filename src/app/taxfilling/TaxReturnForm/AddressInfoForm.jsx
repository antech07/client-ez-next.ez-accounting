"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddressInfoForm({ formData, handleInputChange }) {
  const [isStateOpen, setIsStateOpen] = useState(false);

  const renderLabel = (text) => {
    if (text.endsWith("*")) {
      return (
        <span className="flex items-center gap-[2px]">
          {text.slice(0, -1)}
          <span className="text-[#F95555]">*</span>
        </span>
      );
    }
    return text;
  };

  return (
    <div className="flex flex-col gap-[30px] rounded-[24px] bg-[#E6ECF9] p-[24px] md:p-[40px]">
      {/* Row 1: Street, Town/City, State */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        <FormInput
          label={renderLabel("Street*")}
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Enter street address"
          required
        />
        <FormInput
          label={renderLabel("Town/City*")}
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Enter town/city"
          required
        />
        <div className="flex flex-col gap-[8px]">
          <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
            {renderLabel("State*")}
          </label>
          <div className="relative">
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              onFocus={() => setIsStateOpen(true)}
              onBlur={() => setIsStateOpen(false)}
              required
              className="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] outline-none transition-all focus:border-[#2758D0]"
              style={{ color: formData.state ? "#0F0F0F" : "#666666" }}
            >
              <option value="" className="text-[#666666]">
                Select State
              </option>
              <option value="NSW" className="text-[#0F0F0F]">
                New South Wales
              </option>
              <option value="VIC" className="text-[#0F0F0F]">
                Victoria
              </option>
              <option value="QLD" className="text-[#0F0F0F]">
                Queensland
              </option>
              <option value="WA" className="text-[#0F0F0F]">
                Western Australia
              </option>
              <option value="SA" className="text-[#0F0F0F]">
                South Australia
              </option>
              <option value="TAS" className="text-[#0F0F0F]">
                Tasmania
              </option>
              <option value="ACT" className="text-[#0F0F0F]">
                ACT
              </option>
              <option value="NT" className="text-[#0F0F0F]">
                Northern Territory
              </option>
            </select>
            <motion.div
              animate={{ rotate: isStateOpen ? 180 : 0 }}
              className="pointer-events-none absolute right-[20px] top-[14px] text-[#666666]"
            >
              <ChevronDownIcon />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Row 2: ZIP Code and TFN */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        <FormInput
          label={renderLabel("ZIP Code*")}
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
          placeholder="Enter zip code"
          required
        />
        <FormInput
          label={renderLabel("TFN*")}
          name="tfn"
          value={formData.tfn}
          onChange={handleInputChange}
          placeholder="Enter TFN number"
          required
        />
      </div>

      {/* Row 3: BSB Number and ABN */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        <FormInput
          label={renderLabel("BSB Number*")}
          name="bsb"
          value={formData.bsb}
          onChange={handleInputChange}
          placeholder="Enter BSB number"
          required
        />
        <FormInput
          label={renderLabel("ABN")}
          name="abn"
          value={formData.abn}
          onChange={handleInputChange}
          placeholder="Enter ABN number"
        />
      </div>

      {/* Row 4: Account No and Account Name */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        <FormInput
          label={renderLabel("Account No*")}
          name="accountNo"
          value={formData.accountNo}
          onChange={handleInputChange}
          placeholder="Enter account number"
          required
        />
        <FormInput
          label={renderLabel("Account Name*")}
          name="accountName"
          value={formData.accountName}
          onChange={handleInputChange}
          placeholder="Enter account name"
          required
        />
      </div>
    </div>
  );
}

function FormInput({ label, type = "text", ...props }) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">{label}</label>
      <input
        type={type}
        className="h-[52px] w-full rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] text-[#0F0F0F] outline-none transition-all placeholder:text-[#666666] focus:border-[#2758D0]"
        {...props}
      />
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
