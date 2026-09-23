"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ServiceDetailsDrawerMobile({ service, onClose }) {
  const leftItems = service?.weHandle?.filter((_, i) => i % 2 === 0) || [];
  const rightItems = service?.weHandle?.filter((_, i) => i % 2 === 1) || [];
  const addOns = service?.addOns || [];

  useEffect(() => {
    if (service) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [service]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      key="drawer-root-mobile"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/60"
        style={{ zIndex: 999999 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none fixed inset-y-0 right-0 w-full"
        style={{ zIndex: 1000000 }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto relative mx-auto mt-8 flex h-[720px] w-[340px] flex-col overflow-hidden rounded-[24px] bg-[#FEFEFE] px-[16px] py-[20px] lm:mt-12"
        >
          {/* ✅ Close (X) button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-1 top-1 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-sm transition hover:bg-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="shrink-0 rounded-[20px] bg-[#FEFEFE] pb-[12px]">
            <div className="rounded-[6px] bg-[#F5F5F5] p-[12px]">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={800}
                className="h-[160px] w-full rounded-[16px] object-cover"
              />

              <h3 className="mt-[14px] font-plusJakarta text-[20px] font-[600] leading-[1.4] text-[#000000]">
                {service.title}
              </h3>

              <p className="mt-[8px] font-plusJakarta text-[14px] font-[500] leading-[1.5] text-[#4D4D4D]">
                {service.description}
              </p>
            </div>
          </div>

          <div className="drawer-scroll scrollbar-thin scrollbar-thumb-[#C9C9C9] scrollbar-track-transparent flex-1 overflow-y-auto pr-[8px]">
            {(!rightItems.length == 0 || !leftItems.length == 0) && (
              <h4 className="mb-[12px] font-plusJakarta text-[18px] font-[600] leading-[1.4] text-[#000000]">
                We Handle
              </h4>
            )}

            <div className="grid grid-cols-1 gap-y-[14px]">
              {[...leftItems, ...rightItems].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-[8px] font-plusJakarta text-[14px] font-[500] leading-[1.5] text-[#333333]"
                >
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#2758D0]" />
                  <span className="block" dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
            {(!rightItems.length == 0 || !leftItems.length == 0) && (
              <hr className="my-[18px] h-[1px] border-0 bg-[repeating-linear-gradient(to_right,#D9D9D9_0_10px,transparent_10px_20px)]" />
            )}
            <h4 className="font-plusJakarta text-[18px] font-[600] leading-[1.4] text-[#121212]">
              Transparent Pricing (Indicative)
            </h4>

            <p className="mt-[6px] font-plusJakarta text-[13px] font-[500] leading-[1.5] text-[#333333]">
              {service.pricingNote}
            </p>

            {/* <h4 className="mt-[18px] font-plusJakarta text-[16px] font-[600] leading-[1.4] text-[#000000]">
              Individual Tax Returns
            </h4> */}

            <div className="mt-[12px] overflow-hidden rounded-[14px] border border-[#CCCCCC]">
              <div className="grid bg-[#EEF2FC] font-plusJakarta text-[18px] font-[600] leading-[1.6] text-[#121212] [grid-template-columns:120px_70px_1fr]">
                <div className="p-[8px]">Service</div>
                <div className="border-l border-r p-[8px]">
                  Fee <br /> <span className="text-[12px]">(Exl GST)</span>
                </div>
                <div className="p-[8px]">Details</div>
              </div>
              {service.pricing.map((row, i) => (
                <div
                  key={i}
                  className="grid border-t border-[#E6E6E6] font-plusJakarta text-[12px] font-[500] leading-[1.6] text-[#333333] [grid-template-columns:120px_70px_1fr]"
                >
                  <div className="p-[8px]">{row.service}</div>
                  <div className="border-l border-r p-[8px]">{row.fee}</div>
                  <div className="p-[8px]">{row.details}</div>
                </div>
              ))}
            </div>

            {/* ADD ONS (SAFE) */}
            {addOns.length > 0 && (
              <>
                <h4 className="mt-[18px] font-plusJakarta text-[16px] font-[600] leading-[1.4] text-[#000000]">
                  Common Add-Ons (if applicable)
                </h4>

                <div className="mt-[10px] overflow-hidden rounded-[14px] border border-[#E6E6E6]">
                  <div className="grid bg-[#F1F6FF] font-plusJakarta text-[16px] font-[600] text-[#0F0F0F] [grid-template-columns:120px_70px_1fr]">
                    <div className="p-[8px]">Service</div>
                    <div className="border-l border-r p-[8px]">
                      Fee <br /> <span className="text-[12px]">(Exl GST)</span>
                    </div>
                    <div className="p-[8px]">Details</div>
                  </div>

                  {service.addOns.map((row, i) => (
                    <div
                      key={i}
                      className="grid border-t border-[#E6E6E6] font-plusJakarta text-[12px] font-[500] leading-[1.6] text-[#333333] [grid-template-columns:120px_70px_1fr]"
                    >
                      <div className="p-[8px]">{row.service}</div>
                      <div className="border-l border-r p-[8px]">{row.fee}</div>
                      <div className="p-[8px]">{row.details}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="h-[100px]" />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
