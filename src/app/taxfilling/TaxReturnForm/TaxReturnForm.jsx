"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import WorkExpensesForm from "./WorkExpensesForm";
import OthersForm from "./OthersForm";
import { submitTaxFillingRequest } from "@/utils/contact";
import { toast } from "react-hot-toast";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Address Info" },
  { id: 3, title: "Work Related Expenses" },
  { id: 4, title: "Others" },
];

export default function TaxReturnForm() {
  const formTopRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    occupation: "",
    married: "",
    children: "",
    residencyStatus: "",
    // Step 2: Address Info
    street: "",
    city: "",
    state: "",
    zip: "",
    tfn: "",
    bsb: "",
    abn: "",
    accountNo: "",
    accountName: "",
    // Step 3: Work Expenses
    carExpenseName: "",
    carExpenseAmount: "",
    travelExpenseName: "",
    travelExpenseAmount: "",
    clothingExpenseName: "",
    clothingExpenseAmount: "",
    selfEduOtherName: "Other Expense",
    selfEduOtherAmount: "",
    selfEduDepreciableName: "Depreciable Expenses",
    selfEduDepreciableAmount: "",
    selfEduMotorName: "Motor Vehicle Expenses",
    selfEduMotorAmount: "",
    otherExpOtherName: "Other Expense",
    otherExpOtherAmount: "",
    otherExpDepreciableName: "Depreciable Expenses",
    otherExpDepreciableAmount: "",
    otherExpMotorName: "Motor Vehicle Expenses",
    otherExpMotorAmount: "",
    charityExpenseName: "",
    charityExpenseAmount: "",
    taxAgentFee: "",
    // Step 4: Others
    bankInterest: "",
    comments: "",
    sharesCryptoIncome: "",
    rentalPropertyStatus: "",
    otherPropertiesDescription: "",
  });

  const scrollToTop = () => {
    if (formTopRef.current && window.innerWidth < 768) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      setIsSubmitting(true);

      try {
        const result = await submitTaxFillingRequest(formData);
        if (result) {
          toast.success("Form Submitted Successfully!");
          // Reset form
          setFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: "",
            gender: "",
            occupation: "",
            married: "",
            children: "",
            residencyStatus: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            tfn: "",
            bsb: "",
            abn: "",
            accountNo: "",
            accountName: "",
            carExpenseName: "",
            carExpenseAmount: "",
            travelExpenseName: "",
            travelExpenseAmount: "",
            clothingExpenseName: "",
            clothingExpenseAmount: "",
            selfEduOtherName: "Other Expense",
            selfEduOtherAmount: "",
            selfEduDepreciableName: "Depreciable Expenses",
            selfEduDepreciableAmount: "",
            selfEduMotorName: "Motor Vehicle Expenses",
            selfEduMotorAmount: "",
            otherExpOtherName: "Other Expense",
            otherExpOtherAmount: "",
            otherExpDepreciableName: "Depreciable Expenses",
            otherExpDepreciableAmount: "",
            otherExpMotorName: "Motor Vehicle Expenses",
            otherExpMotorAmount: "",
            charityExpenseName: "",
            charityExpenseAmount: "",
            bankInterest: "",
            comments: "",
            sharesCryptoIncome: "",
            rentalPropertyStatus: "",
            otherPropertiesDescription: "",
          });
          setCurrentStep(1);
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  return (
    <section ref={formTopRef} className="relative w-full py-[40px] lg:py-[100px]">
      <div className="mx-auto max-w-[343px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
        <h2 className="mb-[40px] text-center font-fustat text-[40px] font-[600] text-[#0F0F0F]">
          Fill Your Tax Return
        </h2>

        {/* Progress Bar Container */}
        <div className="relative mb-[60px] w-full px-[10px] md:px-[20px]">
          {/* Titles Row */}
          <div className="mb-[16px] flex">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <p
                  className={`text-center font-plusJakarta text-[12px] font-[600] md:text-[14px] ${
                    currentStep >= step.id ? "text-[#F36C24]" : "text-[#666666]"
                  } px-1 transition-colors duration-300`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* Lines and Circles Row */}
          <div className="relative flex h-[24px] items-center">
            {/* Layer 1: Inactive Line Background (Lowest) */}
            <div className="absolute left-[12.5%] right-[12.5%] z-0 h-[8px] rounded-full bg-[#F0F0F0]" />

            {/* Layer 2: Active Progress Line (z-20 - Above Inactive Circle, Below Active Circle Marker) */}
            <motion.div
              className="absolute left-[12.5%] right-[12.5%] z-20 h-[4px] origin-left rounded-full bg-[#F36C24]"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: Math.min((currentStep - 0.5) / (steps.length - 1), 1),
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Circles Layer */}
            <div className="absolute inset-0 flex">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-1 items-center justify-center">
                  <div className="relative flex h-[24px] w-[24px] items-center justify-center">
                    {/* Layer 3: Large Inactive Circle BG (z-10) */}
                    <div className="absolute inset-0 z-10 rounded-full bg-[#F0F0F0]" />

                    {/* Layer 4: Smaller Active Circle FG (z-30) */}
                    <AnimatePresence>
                      {currentStep >= step.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute z-30 h-[14px] w-[14px] rounded-full bg-[#F36C24]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="custom-scrollbar overflow-y-auto md:max-h-[575px]">
          <form id="tax-return-form" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <PersonalInfoForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    setFormData={setFormData}
                  />
                )}

                {currentStep === 2 && (
                  <AddressInfoForm formData={formData} handleInputChange={handleInputChange} />
                )}

                {currentStep === 3 && (
                  <WorkExpensesForm formData={formData} handleInputChange={handleInputChange} />
                )}

                {currentStep === 4 && (
                  <OthersForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    setFormData={setFormData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>

        {/* Navigation Buttons Outside Form Container */}
        <div className="mt-[40px] flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex h-[48px] items-center justify-center rounded-[12px] border border-[#D9D9D9] px-[24px] font-plusJakarta text-[16px] font-[600] text-[#4D4D4D] transition-all hover:bg-[#4D4D4D] hover:text-white disabled:opacity-50"
              >
                Back
              </button>
            )}
          </div>

          <div>
            {currentStep < steps.length ? (
              <button
                type="submit"
                form="tax-return-form"
                style={{
                  background:
                    "linear-gradient(237deg, #FBAD16 1.16%, #F38B23 55.56%, #F37023 109.96%)",
                }}
                disabled={isSubmitting}
                className="flex h-[48px] items-center justify-center rounded-[12px] px-[24px] font-plusJakarta text-[16px] font-[600] text-white transition-all hover:opacity-90 disabled:opacity-50"
              >
                Save & Continue
              </button>
            ) : (
              <button
                type="submit"
                form="tax-return-form"
                style={{
                  background:
                    "linear-gradient(237deg, #FBAD16 1.16%, #F38B23 55.56%, #F37023 109.96%)",
                }}
                disabled={isSubmitting}
                className="flex h-[48px] items-center justify-center rounded-[12px] px-[24px] font-plusJakarta text-[16px] font-[600] text-white transition-all hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
