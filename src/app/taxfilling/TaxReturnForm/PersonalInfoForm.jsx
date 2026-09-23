"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PersonalInfoForm({ formData, handleInputChange, setFormData }) {
  const [isResidencyOpen, setIsResidencyOpen] = useState(false);
  const [isDobFocused, setIsDobFocused] = useState(false);

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      {/* Row 1: First, Middle, Last Names */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        <FormInput
          label={renderLabel("First Name*")}
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter First Name"
          required
        />
        <FormInput
          label={renderLabel("Middle Name", false)}
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
          placeholder="Enter Middle Name"
        />
        <FormInput
          label={renderLabel("Last Name*")}
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter Last Name"
          required
        />
      </div>

      {/* Row 2: Email, Phone, DOB */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        <FormInput
          label={renderLabel("Email*")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email address"
          required
        />
        <FormInput
          label={renderLabel("Phone*")}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter contact no."
          required
        />
        <div className="relative">
          <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
            {renderLabel("Date of Birth*")}
          </label>
          <div className="relative mt-[8px]">
            {/* Ghost Placeholder */}
            {!formData.dob && (
              <span className="pointer-events-none absolute left-[20px] top-1/2 -translate-y-1/2 font-plusJakarta text-[16px] text-[#666666]">
                Enter date of birth
              </span>
            )}
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleInputChange}
              required
              className={`h-[52px] w-full rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] outline-none transition-all focus:border-[#2758D0] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-clear-button]:appearance-none [&::-webkit-datetime-edit-day-field]:p-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0 [&::-webkit-datetime-edit-month-field]:p-0 [&::-webkit-datetime-edit-text]:p-0 [&::-webkit-datetime-edit-year-field]:p-0 [&::-webkit-inner-spin-button]:appearance-none ${
                !formData.dob ? "text-transparent" : "text-[#0F0F0F]"
              }`}
            />
            <span className="pointer-events-none absolute bottom-[14px] right-[16px] text-[#4D4D4D]">
              <CalendarIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Gender and Occupation */}
      <div className="flex flex-col gap-[20px] md:flex-row">
        <div className="relative flex w-full flex-col gap-[8px] md:w-[40%]">
          <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
            {renderLabel("Select Your Gender*")}
          </label>
          <div className="flex gap-[12px]">
            <ToggleButton
              active={formData.gender === "male"}
              onClick={() => handleToggle("gender", "male")}
              icon={<MaleIcon />}
              label="Male"
            />
            <ToggleButton
              active={formData.gender === "female"}
              onClick={() => handleToggle("gender", "female")}
              icon={<FemaleIcon />}
              label="Female"
            />
          </div>
          {/* Hidden Required Input for Validation */}
          <input
            type="text"
            name="gender"
            value={formData.gender}
            required
            className="absolute left-1/2 top-1/2 -z-10 h-[1px] w-[1px] -translate-x-1/2 -translate-y-1/2 opacity-0"
            tabIndex={-1}
            onChange={() => {}}
          />
        </div>
        <div className="w-full md:w-[60%]">
          <FormInput
            label={renderLabel("Occupation*")}
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="Enter your occupation"
            required
          />
        </div>
      </div>

      {/* Row 4: Married, Children, Residency */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        <div className="relative flex flex-col gap-[8px]">
          <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
            {renderLabel("Are You Married?*")}
          </label>
          <div className="flex gap-[12px]">
            <ToggleButton
              active={formData.married === "yes"}
              onClick={() => handleToggle("married", "yes")}
              label="Yes"
            />
            <ToggleButton
              active={formData.married === "no"}
              onClick={() => handleToggle("married", "no")}
              label="No"
            />
          </div>
          {/* Hidden Required Input for Validation */}
          <input
            type="text"
            name="married"
            value={formData.married}
            required
            className="absolute left-1/2 top-1/2 -z-10 h-[1px] w-[1px] -translate-x-1/2 -translate-y-1/2 opacity-0"
            tabIndex={-1}
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FormInput
            label={renderLabel("Number of Depended Children*")}
            name="children"
            type="number"
            value={formData.children}
            onChange={handleInputChange}
            placeholder="Enter number of children"
            required
          />
          <p className="font-plusJakarta text-[12px] text-[#808080]">
            if you don’t have children please enter 0
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-plusJakarta text-[14px] font-[600] text-[#0F0F0F]">
            {renderLabel("Residency Status*")}
          </label>
          <div className="relative">
            <select
              name="residencyStatus"
              value={formData.residencyStatus}
              onChange={handleInputChange}
              onFocus={() => setIsResidencyOpen(true)}
              onBlur={() => setIsResidencyOpen(false)}
              required
              className="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] outline-none transition-all focus:border-[#2758D0]"
              style={{ color: formData.residencyStatus ? "#0F0F0F" : "#666666" }}
            >
              <option value="" className="text-[#666666]">
                Select Status
              </option>
              <option value="citizen" className="text-[#0F0F0F]">
                Citizen
              </option>
              <option value="resident" className="text-[#0F0F0F]">
                Permanent Resident
              </option>
              <option value="visa" className="text-[#0F0F0F]">
                Visa Holder
              </option>
            </select>
            <motion.div
              animate={{ rotate: isResidencyOpen ? 180 : 0 }}
              className="pointer-events-none absolute right-[20px] top-[14px] text-[#666666]"
            >
              <ChevronDownIcon />
            </motion.div>
          </div>
        </div>
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
        className="h-[52px] w-full rounded-[12px] border border-[#3333331A] bg-white px-[20px] font-plusJakarta text-[16px] text-[#0F0F0F] outline-none transition-all placeholder:text-[#666666] focus:border-[#2758D0] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-[16px] [&::-webkit-calendar-picker-indicator]:h-[24px] [&::-webkit-calendar-picker-indicator]:w-[24px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-clear-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
    </div>
  );
}

function ToggleButton({ active, onClick, icon, label }) {
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
      {icon && <span className={`${active ? "text-[#F36C24]" : "text-[#333333]"}`}>{icon}</span>}
      {label}
    </button>
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

function MaleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0008 0H11.2508C11.085 0 10.9261 0.0658481 10.8089 0.183058C10.6916 0.300269 10.6258 0.45924 10.6258 0.625C10.6258 0.79076 10.6916 0.949731 10.8089 1.06694C10.9261 1.18415 11.085 1.25 11.2508 1.25H13.4922L10.2055 4.53672C8.96401 3.52193 7.38 3.0231 5.78106 3.14341C4.18213 3.26372 2.6906 3.99396 1.61495 5.18309C0.539299 6.37223 -0.0381757 7.92929 0.00196033 9.53224C0.0420964 11.1352 0.696772 12.6614 1.83058 13.7952C2.9644 14.929 4.49061 15.5837 6.09356 15.6238C7.69651 15.664 9.25357 15.0865 10.4427 14.0108C11.6318 12.9352 12.3621 11.4437 12.4824 9.84473C12.6027 8.2458 12.1039 6.66179 11.0891 5.42031L14.3758 2.13438V4.375C14.3758 4.54076 14.4416 4.69973 14.5589 4.81694C14.6761 4.93415 14.835 5 15.0008 5C15.1666 5 15.3255 4.93415 15.4427 4.81694C15.5599 4.69973 15.6258 4.54076 15.6258 4.375V0.625C15.6258 0.45924 15.5599 0.300269 15.4427 0.183058C15.3255 0.0658481 15.1666 0 15.0008 0ZM9.78517 12.9133C9.08582 13.6123 8.1949 14.0883 7.22506 14.281C6.25521 14.4738 5.25 14.3746 4.3365 13.9961C3.423 13.6176 2.64224 12.9768 2.09293 12.1546C1.54362 11.3324 1.25043 10.3658 1.25043 9.37695C1.25043 8.38814 1.54362 7.42153 2.09293 6.59934C2.64224 5.77714 3.423 5.13627 4.3365 4.75777C5.25 4.37927 6.25521 4.28012 7.22506 4.47286C8.1949 4.66561 9.08582 5.14159 9.78517 5.84063C10.7214 6.77939 11.2472 8.05111 11.2472 9.37695C11.2472 10.7028 10.7214 11.9745 9.78517 12.9133Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V21M9 18H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29639 13.7H8.30537M8.29639 16.7H8.30537"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
