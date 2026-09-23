"use client";

import React from "react";

export default function OthersForm({ formData, handleInputChange, setFormData }) {
  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showUploadHeader =
    formData.sharesCryptoIncome === "yes" || formData.rentalPropertyStatus === "yes";

  return (
    <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#E6ECF9] p-[24px] md:p-[40px]">
      {/* Row 1: Bank Interest */}
      <div className="flex flex-col gap-[8px]">
        <FormInput
          label="Bank interest received on any savings or deposits in Australia (Australian Bank)"
          name="bankInterest"
          type="number"
          value={formData.bankInterest}
          onChange={handleInputChange}
          placeholder="Enter Amount"
        />
      </div>

      {/* Row 2: Any Comments */}
      <div className="flex flex-col gap-[8px]">
        <FormInput
          label="Any Comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          placeholder="Type your comments here..."
        />
      </div>

      {/* Row 3: Income Toggles */}
      <div className="flex flex-col gap-[20px]">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          <div className="flex flex-col gap-[8px]">
            <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
              Do you have any income from Shares/Crypto?
            </label>
            <div className="flex gap-[12px]">
              <ToggleButton
                active={formData.sharesCryptoIncome === "yes"}
                onClick={() => handleToggle("sharesCryptoIncome", "yes")}
                label="Yes"
              />
              <ToggleButton
                active={formData.sharesCryptoIncome === "no"}
                onClick={() => handleToggle("sharesCryptoIncome", "no")}
                label="No"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
              Do you have rental property?
            </label>
            <div className="flex gap-[12px]">
              <ToggleButton
                active={formData.rentalPropertyStatus === "yes"}
                onClick={() => handleToggle("rentalPropertyStatus", "yes")}
                label="Yes"
              />
              <ToggleButton
                active={formData.rentalPropertyStatus === "no"}
                onClick={() => handleToggle("rentalPropertyStatus", "no")}
                label="No"
              />
            </div>
          </div>
        </div>
        <p className="font-plusJakarta text-[12px] text-[#808080]">
          If yes please attach supported Documents
        </p>
      </div>

      {/* Row 4: Description */}
      <div className="flex flex-col gap-[8px]">
        <FormTextArea
          label="Description"
          name="otherPropertiesDescription"
          value={formData.otherPropertiesDescription}
          onChange={handleInputChange}
          placeholder="If you have any other properties please mention here"
          rows={1.5}
        />
      </div>

      {/* Conditional Upload Link */}
      {showUploadHeader && (
        <button
          type="button"
          className="mt-[10px] w-fit font-plusJakarta text-[16px] font-[600] text-[#F36C24] transition-all hover:underline"
        >
          + Upload Supported Documents here
        </button>
      )}
    </div>
  );
}

function FormInput({ label, type = "text", ...props }) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">{label}</label>
      <input
        type={type}
        className="h-[52px] w-full rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] text-[#0F0F0F] outline-none transition-all placeholder:text-[#666666] focus:border-[#2758D0] [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
    </div>
  );
}

function FormTextArea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">{label}</label>
      <textarea
        className="w-full resize-none rounded-[12px] border border-[#3333331A] bg-white p-[20px] font-plusJakarta text-[16px] text-[#0F0F0F] outline-none transition-all placeholder:text-[#666666] focus:border-[#2758D0]"
        {...props}
      />
    </div>
  );
}

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[52px] flex-1 items-center justify-center gap-[10px] rounded-[12px] border font-plusJakarta text-[16px] font-[500] transition-all ${
        active
          ? "border-[#F36C24] bg-[#F6F8FD] text-[#F36C24] shadow-md"
          : "border-[#D9D9D9] bg-[#F6F8FD] text-[#333333] hover:border-[#F36C24]/50"
      }`}
    >
      {label}
    </button>
  );
}
