"use client";

import Image from "next/image";
import features from "./data";
import { useEffect, useRef, useState } from "react";

export default function WhyChoose() {
  const rotates = [-15, -15, 15, 15];
  const offsetsY = [20, 10, -10, 30];
  const zIndexes = [4, 3, 2, 1];

  const startOffsets = [-180, -80, 80, 180];

  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [finalOffsets, setFinalOffsets] = useState(startOffsets);
  const [flat, setFlat] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  /* Responsive spacing (desktop only logic) */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cardWidth = 280;
    let gap = 30;

    if (window.innerWidth < 1536 && window.innerWidth >= 1280) {
      gap = 15;
    }

    if (window.innerWidth < 1280) {
      cardWidth = 240;
      gap = 8;
    }

    const step = cardWidth + gap;
    setFinalOffsets([-step * 1.5, -step * 0.5, step * 0.5, step * 1.5]);
  }, []);

  /* Scroll animation (desktop only trigger) */
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlat(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full rounded-t-[40px] bg-[#FEFEFE] lm:rounded-t-[60px] lg:rounded-t-[80px]"
    >
      <div
        className="absolute inset-0 rounded-t-[40px] bg-contain bg-bottom bg-no-repeat opacity-50 lm:rounded-t-[60px] lg:rounded-t-[80px]"
        style={{ backgroundImage: "url(/assets/home/share/ChooseBg2.png)" }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-[16px]">
        {/* Heading */}
        <div className="mx-auto max-w-[600px] pt-[80px] text-center">
          <h2 className="font-fustat text-[30px] font-[700] leading-[1.2] text-[#101010] lg:text-[48px]">
            Why Choose <br /> EZ Accounting?
          </h2>

          <p className="mx-auto mt-[12px] w-[343px] font-plusJakarta text-[16px] font-[500] leading-[1.4] text-[#4D4D4D] lg:w-[490px]">
            We combine expertise, technology, and personalized service to deliver exceptional
            results.
          </p>
        </div>

        {/* MOBILE: 2-column grid */}
        <div className="mt-[40px] grid grid-cols-2 gap-[12px] px-[16px] pb-[60px] lg:hidden">
          {features.map((item, i) => (
            <div
              key={i}
              className="w-full rounded-[24px] border border-[#E6E6E6] bg-white py-[16px] pl-[16px] pr-[18px]"
            >
              <div className="flex flex-col">
                <div className="h-[36px] w-[36px]">
                  <Image src={item.Image} alt={item.title} width={80} height={80} />
                </div>

                <h3 className="mb-[8px] mt-[10px] font-fustat text-[18px] font-[600] leading-[1.5] text-[#121212]">
                  {item.title}
                </h3>

                <p className="text-[12px] leading-[1.5] text-[#4D4D4D]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LG+: keep your existing animated absolute cards (unchanged) */}
        <div
          ref={containerRef}
          className="relative mt-[60px] hidden h-[360px] items-center justify-center pb-[87px] lg:flex"
        >
          {features.map((item, i) => (
            <div
              key={i}
              className="absolute h-[235px] w-[230px] rounded-[24px] border border-[#E6E6E6] bg-white py-[16px] pl-[16px] pr-[18px] xl:h-[252px] xl:w-[280px] xl:py-[20px] xl:pl-[20px] xl:pr-[23px]"
              style={{
                transform: `
                  translateX(${flat ? finalOffsets[i] : startOffsets[i]}px)
                  translateY(${flat ? 0 : offsetsY[i]}px)
                  rotate(${flat ? 0 : rotates[i]}deg)
                `,
                transformOrigin: "top center",
                zIndex: zIndexes[i],
                transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex flex-col">
                <div className="h-[65px] w-[65px]">
                  <Image src={item.Image} alt={item.title} width={80} height={80} />
                </div>

                <h3 className="mb-[16px] mt-[18px] font-fustat text-[18px] font-[600] leading-[1.5] text-[#121212] xl:mb-[24px] xl:mt-[30px] xl:text-[20px]">
                  {item.title}
                </h3>

                <p className="text-[13px] leading-[1.5] text-[#4D4D4D] xl:text-[14px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
