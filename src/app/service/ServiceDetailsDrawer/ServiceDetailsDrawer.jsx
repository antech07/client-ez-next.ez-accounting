"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceDetailsDrawer({ service, onClose }) {
  const leftItems = service?.weHandle?.filter((_, i) => i % 2 === 0) || [];
  const rightItems = service?.weHandle?.filter((_, i) => i % 2 === 1) || [];
  const addOns = service?.addOns || [];

  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [service]);

  if (typeof window === "undefined") return null;

  console.log(service.pricing.row);

  return createPortal(
    <motion.div
      key="drawer-root"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* OVERLAY */}
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/60"
        style={{ zIndex: 999999 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* DRAWER WRAPPER */}
      <motion.div
        className="pointer-events-none fixed inset-y-0 right-0 w-full lg:top-[92px] xl:top-[32px]"
        style={{ zIndex: 1000000 }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* DRAWER CONTENT */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto mx-auto flex h-[605px] gap-[30px] rounded-[24px] bg-[#FEFEFE] p-[24px] lg:max-w-[960px] xl:max-w-[1160px] 2xl:h-[700px] 2xl:max-w-[1436px] 3xl:h-[880px] 3xl:max-w-[1536px]"
        >
          {/* LEFT — FIXED */}
          <div className="32xl:h-[832px] sticky top-[40px] h-[560px] shrink-0 rounded-[32px] bg-[#F5F5F5] p-[16px] lg:w-[440px] xl:w-[460px] 2xl:h-[650px] 2xl:w-[560px]">
            <div className="lg:w-[400px] xl:h-[360px] xl:w-[428px] 2xl:h-[500px] 2xl:w-[528px] 3xl:h-[560px]">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={800}
                className="rounded-[20px] lg:w-[400px] xl:h-[360px] xl:w-[428px] 2xl:h-[500px] 2xl:w-[528px] 3xl:h-[560px]"
              />
            </div>

            <h3 className="mt-[20px] font-plusJakarta text-[24px] font-[600] leading-[1.5] text-[#000000] 2xl:text-[26px]">
              {service.title}
            </h3>

            <p className="mt-[28px] font-plusJakarta font-[500] leading-[1.5] text-[#4D4D4D] xl:text-[14px] 2xl:text-[16px]">
              {service.description}
            </p>
          </div>

          {/* RIGHT — SCROLL */}
          <div className="scrollbar-none mx-auto w-[898px] flex-1 overflow-y-auto pr-[12px]">
            {(!rightItems.length == 0 || !leftItems.length == 0) && (
              <h4 className="mb-[16px] font-plusJakarta font-[600] leading-[1.5] text-[#000000] xl:text-[24px] 2xl:text-[26px]">
                We Handle
              </h4>
            )}
            {(!rightItems.length == 0 || !leftItems.length == 0) && (
              <div className="flex lg:gap-x-[70px] xl:gap-x-[100px] 2xl:gap-x-[224px]">
                {/* LEFT COLUMN */}
                <div className="flex w-[309px] flex-col gap-y-[20px]">
                  {leftItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-[6px] font-plusJakarta text-[14px] font-[500] leading-[1.4] text-[#333333]"
                    >
                      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#2758D0]" />
                      <span className="block" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex w-[365px] flex-col gap-y-[20px]">
                  {rightItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-[6px] font-plusJakarta text-[14px] font-[500] leading-[1.4] text-[#333333]"
                    >
                      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#2758D0]" />
                      <span className="block">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(!rightItems.length == 0 || !leftItems.length == 0) && (
              <hr className="mx-auto my-[24px] h-[1px] border-0 bg-[repeating-linear-gradient(to_right,#D9D9D9_0_10px,transparent_10px_20px)]" />
            )}
            <h4 className="font-plusJakarta font-[600] leading-[1.5] text-[#121212] xl:text-[24px] 2xl:text-[26px]">
              Transparent Pricing (Indicative)
            </h4>

            <p className="mt-[4px] font-plusJakarta text-[14px] font-[500] leading-[1.5] text-[#333333]">
              {service.pricingNote}
            </p>

            {/* <h4 className="mt-[32px] font-plusJakarta font-[600] leading-[1.5] text-[#000000] xl:text-[20px] 2xl:text-[22px]">
              Individual Tax Returns
            </h4> */}

            {Array.isArray(service?.pricing) && service.pricing.length > 0 && (
              <div className="mt-[32px] overflow-hidden rounded-[16px] border border-[#CCCCCC]">
                {/* HEADER */}
                <div className="grid bg-[#EEF2FC] font-plusJakarta text-[14px] font-[600] leading-[1.8] text-[#121212] [grid-template-columns:280px_160px_240px] lg:[grid-template-columns:180px_80px_180px] xl:text-[16px] xl:[grid-template-columns:260px_100px_260px] 2xl:[grid-template-columns:378px_200px_320px]">
                  <div className="lg:p-[8px] xl:p-[10px]">Service</div>
                  <div className="border-l border-r lg:p-[8px] xl:p-[10px]">Fee (Excl GST)</div>
                  <div className="lg:p-[8px] xl:p-[10px]">Details</div>
                </div>

                {/* ROWS */}
                {service.pricing.map((row, i) => (
                  <div
                    key={i}
                    className="grid border-t border-[#E6E6E6] font-plusJakarta text-[12px] font-[500] leading-[1.8] text-[#333333] [grid-template-columns:280px_160px_240px] lg:[grid-template-columns:180px_80px_180px] xl:[grid-template-columns:260px_100px_260px] 2xl:text-[14px] 2xl:[grid-template-columns:378px_200px_320px]"
                  >
                    <div className="lg:p-[8px] xl:p-[10px]">{row?.service}</div>
                    <div className="border-l border-r lg:p-[8px] xl:p-[10px]">{row?.fee}</div>
                    <div className="lg:p-[8px] xl:p-[10px]">{row?.details}</div>
                  </div>
                ))}
              </div>
            )}
            {/* ADD ONS */}
            {addOns.length > 0 && (
              <>
                <h4 className="mt-[32px] font-plusJakarta font-[600] leading-[1.5] text-[#000000] xl:text-[20px] 2xl:text-[22px]">
                  Common Add-Ons (if applicable)
                </h4>

                <div className="mt-[12px] overflow-hidden rounded-[18px] border border-[#E6E6E6]">
                  <div className="grid bg-[#F1F6FF] font-plusJakarta text-[14px] font-[600] text-[#0F0F0F] [grid-template-columns:280px_160px_240px] lg:[grid-template-columns:180px_80px_180px] xl:text-[16px] xl:[grid-template-columns:260px_100px_260px] 2xl:[grid-template-columns:378px_200px_320px]">
                    <div className="lg:p-[8px] xl:p-[10px]">Service</div>
                    <div className="border-l border-r lg:p-[8px] xl:p-[10px]">Fee (Excl GST)</div>
                    <div className="lg:p-[8px] xl:p-[10px]">Details</div>
                  </div>

                  {service.addOns.map((row, i) => (
                    <div
                      key={i}
                      className="grid border-t border-[#E6E6E6] font-plusJakarta text-[12px] font-[500] leading-[1.8] text-[#333333] [grid-template-columns:100px_60px_100px] lg:[grid-template-columns:180px_80px_180px] xl:text-[14px] xl:[grid-template-columns:260px_100px_260px] 2xl:text-[14px] 2xl:[grid-template-columns:378px_200px_320px]"
                    >
                      <div className="lg:p-[8px] xl:p-[10px]">{row.service}</div>
                      <div className="border-l border-r lg:p-[8px] xl:p-[10px]">{row.fee}</div>
                      <div className="lg:p-[8px] xl:p-[10px]">{row.details}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="h-[180px]" />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
