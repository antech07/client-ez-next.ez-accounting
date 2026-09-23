"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionItem = ({ number, title, isOpen, onToggle, children }) => {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#3333331A] bg-[#F6F8FD]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-[20px] text-left transition-colors hover:bg-[#F2F3F6]"
      >
        <div className="flex items-center gap-[16px]">
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-transparent font-plusJakarta text-[14px] font-[600] text-[#121212]">
            {number}.
          </span>
          <span className="font-plusJakarta text-[16px] font-[600] text-[#0F0F0F]">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-[#666666]">
          <ChevronDownIcon />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-[#3333331A] p-[20px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function WorkExpensesForm({ formData, handleInputChange }) {
  const [openAccordions, setOpenAccordions] = useState([1]);

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const renderLabel = (text, isRequired = true) => {
    return (
      <span className="flex items-center gap-[2px]">
        {text}
        {/* {isRequired && <span className="text-[#F95555]">*</span>} */}
      </span>
    );
  };

  return (
    <div className="rounded-[24px] bg-[#E6ECF9] p-[24px] md:p-[40px]">
      <div className="flex flex-col gap-[16px]">
        {/* Tab 1: Car Expense */}
        <AccordionItem
          number="01"
          title="Car Expense"
          isOpen={openAccordions.includes(1)}
          onToggle={() => toggleAccordion(1)}
        >
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
            <FormInput
              label={renderLabel("Car Make & Model")}
              name="carExpenseName"
              value={formData.carExpenseName}
              onChange={handleInputChange}
              placeholder="Enter make & model"
            />
            <FormInput
              label={renderLabel("KM")}
              name="carExpenseAmount"
              type="number"
              value={formData.carExpenseAmount}
              onChange={handleInputChange}
              placeholder="Enter km"
            />
          </div>
        </AccordionItem>

        {/* Tab 2: Travel Expenses */}
        <AccordionItem
          number="02"
          title="Travel Expenses"
          isOpen={openAccordions.includes(2)}
          onToggle={() => toggleAccordion(2)}
        >
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
            <FormInput
              label={renderLabel("Expense Name")}
              name="travelExpenseName"
              value={formData.travelExpenseName}
              onChange={handleInputChange}
              placeholder="Enter expense name"
            />
            <FormInput
              label={renderLabel("Amount")}
              name="travelExpenseAmount"
              type="number"
              value={formData.travelExpenseAmount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
        </AccordionItem>

        {/* Tab 3: Clothing, Laundry, and Dry Cleaning Expenses */}
        <AccordionItem
          number="03"
          title="Clothing, Laundry, and Dry Cleaning Expenses"
          isOpen={openAccordions.includes(3)}
          onToggle={() => toggleAccordion(3)}
        >
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
            <FormInput
              label={renderLabel("Expense Name")}
              name="clothingExpenseName"
              value={formData.clothingExpenseName}
              onChange={handleInputChange}
              placeholder="Enter expense name"
            />
            <FormInput
              label={renderLabel("Amount")}
              name="clothingExpenseAmount"
              type="number"
              value={formData.clothingExpenseAmount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
        </AccordionItem>

        {/* Tab 4: Self Education Expense */}
        <AccordionItem
          number="04"
          title="Self Education Expense"
          isOpen={openAccordions.includes(4)}
          onToggle={() => toggleAccordion(4)}
        >
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Other Expense")}
                name="selfEduOtherName"
                value={formData.selfEduOtherName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="selfEduOtherAmount"
                type="number"
                value={formData.selfEduOtherAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Depreciable Expenses")}
                name="selfEduDepreciableName"
                value={formData.selfEduDepreciableName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="selfEduDepreciableAmount"
                type="number"
                value={formData.selfEduDepreciableAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Motor Vehicle Expenses")}
                name="selfEduMotorName"
                value={formData.selfEduMotorName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="selfEduMotorAmount"
                type="number"
                value={formData.selfEduMotorAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </AccordionItem>

        {/* Tab 5: Other Expense */}
        <AccordionItem
          number="05"
          title="Other Expense"
          isOpen={openAccordions.includes(5)}
          onToggle={() => toggleAccordion(5)}
        >
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Other Expense")}
                name="otherExpOtherName"
                value={formData.otherExpOtherName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="otherExpOtherAmount"
                type="number"
                value={formData.otherExpOtherAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Depreciable Expenses")}
                name="otherExpDepreciableName"
                value={formData.otherExpDepreciableName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="otherExpDepreciableAmount"
                type="number"
                value={formData.otherExpDepreciableAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <FormInput
                label={renderLabel("Motor Vehicle Expenses")}
                name="otherExpMotorName"
                value={formData.otherExpMotorName}
                onChange={handleInputChange}
                readOnly
              />
              <FormInput
                label={renderLabel("Amount")}
                name="otherExpMotorAmount"
                type="number"
                value={formData.otherExpMotorAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </AccordionItem>

        {/* Tab 6: Gifts or donations to any Australian charities */}
        <AccordionItem
          number="06"
          title="Gifts or donations to any Australian charities"
          isOpen={openAccordions.includes(6)}
          onToggle={() => toggleAccordion(6)}
        >
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
            <FormInput
              label={renderLabel("Expense Name")}
              name="charityExpenseName"
              value={formData.charityExpenseName}
              onChange={handleInputChange}
              placeholder="Enter expense name"
            />
            <FormInput
              label={renderLabel("Amount")}
              name="charityExpenseAmount"
              type="number"
              value={formData.charityExpenseAmount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
        </AccordionItem>
        {/* Tab 7: Tax Agent Fee */}
        <AccordionItem
          number="07"
          title="Tax Agent Fee"
          isOpen={openAccordions.includes(7)}
          onToggle={() => toggleAccordion(7)}
        >
          <div className="grid w-full grid-cols-1">
            <FormInput
              label={renderLabel("Tax agent fee")}
              name="taxAgentFee"
              type="number"
              value={formData.taxAgentFee}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
        </AccordionItem>
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
        className="h-[52px] w-full rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] text-[#0F0F0F] outline-none transition-all placeholder:text-[#666666] focus:border-[#2758D0] [&::-webkit-clear-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
