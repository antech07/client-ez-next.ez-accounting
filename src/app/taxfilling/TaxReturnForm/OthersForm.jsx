"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function OthersForm({ formData, handleInputChange, setFormData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(formData.documentFile || null);
  const fileInputRef = useRef(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          documentFile: file,
          document: file.name,
        }));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          documentFile: file,
          document: file.name,
        }));
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (setFormData) setFormData((prev) => ({ ...prev, documentFile: null, document: "doc" }));
  };

  const handleSaveModal = () => {
    if (selectedFile) {
      toast.success("Document attached successfully!");
    }
    setIsModalOpen(false);
  };

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
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-[10px] w-fit font-plusJakarta text-[16px] font-[600] text-[#F36C24] transition-all hover:underline"
          >
            + Upload Supported Documents here
          </button>
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2 font-plusJakarta text-[14px] text-[#0F0F0F]">
              <span className="font-[600]">Attached:</span>
              <span>{selectedFile.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1111] flex items-center justify-center p-4">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal container */}
          <div className="relative z-50 w-full max-w-[750px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex min-h-[450px] flex-col justify-between rounded-[24px] border border-[#3333331A] bg-white p-6 shadow-2xl md:p-8">
              <div>
                <h3 className="mb-6 text-center font-fustat text-2xl font-[600] text-[#0F0F0F]">
                  Attach Supported Documents Below
                </h3>

                {/* Drag & Drop area */}
                <div
                  className="flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#F36C24]/40 bg-[#F6F8FD] px-4 py-8 transition-all duration-200 hover:border-[#F36C24]"
                  style={{
                    height: selectedFile ? "180px" : "240px",
                  }}
                  onClick={handleClickUpload}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <Image
                    src="/assets/home/FileArrowUp.png"
                    alt="Upload Icon"
                    width={50}
                    height={50}
                  />
                  <p className="mt-3 text-center font-plusJakarta text-[15px] text-[#666666]">
                    Drag and Drop or{" "}
                    <span
                      className="cursor-pointer font-[600] text-[#F36C24] underline"
                      onClick={handleClickUpload}
                    >
                      Click to Upload
                    </span>
                  </p>
                  <p className="mt-1 text-center font-plusJakarta text-sm text-[#808080]">
                    Supported Formats: JPG, PNG or PDF (max size 5 mb)
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>

                {/* File preview */}
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-between rounded-[16px] border border-[#D9D9D9] bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <Image src="/assets/home/pdficon.png" alt="PDF Icon" width={40} height={40} />
                      <div className="flex flex-col">
                        <span className="font-plusJakarta text-[15px] font-[600] text-[#0F0F0F]">
                          {selectedFile.name}
                        </span>
                        <span className="font-plusJakarta text-sm text-[#808080]">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-[#F0F0F0]"
                      onClick={handleRemoveFile}
                    >
                      <Image src="/assets/home/bin.png" alt="Remove File" width={22} height={22} />
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveModal}
                  style={{
                    background:
                      "linear-gradient(237deg, #FBAD16 1.16%, #F38B23 55.56%, #F37023 109.96%)",
                  }}
                  className="h-[48px] rounded-[12px] px-[28px] font-plusJakarta text-[16px] font-[600] text-white shadow-md transition-all hover:opacity-90"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
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
