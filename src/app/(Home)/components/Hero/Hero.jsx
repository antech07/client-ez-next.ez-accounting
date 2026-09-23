"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CommonButton from "@/components/shared/CommonButton/CommonButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

function Hero() {
  const slides = [
    "/assets/home/hero/compressed-slideimg1.webp",
    "/assets/home/hero/compressed-slideimg2.webp",
    "/assets/home/hero/compressed-slideimg3.webp",
    "/assets/home/hero/compressed-slideimg4.webp",
    "/assets/home/hero/compressed-slideimg5.webp",
  ];

  return (
    <div className="relative top-[72px] h-[740px] w-full overflow-hidden lg:h-[660px] xl:h-[690px] 2xl:h-[958px]">
      {/* BOTTOM LAYER: AUTO SWIPER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={2500}
          loop={true}
          allowTouchMove={false}
          className="h-full w-full"
        >
          {slides.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MIDDLE LAYER: OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <Image
          src="/assets/home/hero/overlay2.png"
          alt="Overlay"
          fill
          className="hidden object-cover lg:block"
          quality={100}
          priority
        />
        <Image
          src="/assets/home/hero/overlaymobileimg2.png"
          alt="Overlay"
          fill
          className="object-cover lg:hidden"
          quality={100}
          priority
        />
      </div>

      {/* TOP LAYER: TEXT CONTENT */}
      <div className="relative z-20 mx-auto w-full lg:max-w-[1000px] lg:px-4 xl:max-w-[1100px] xl:px-0 2xl:max-w-[1280px]">
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -180 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="block pt-[150px] text-left lg:pt-[clamp(120px,20vh,190px)] 2xl:pt-[250px]"
        >
          <h1 className="mx-auto max-w-[260px] font-fustat text-[48px] font-[800] leading-[130%] text-[#FEFEFE] lg:mx-0 lg:max-w-[450px] lg:text-[88px]">
            Accounting With Ease.
          </h1>

          <p className="mx-auto mt-[8px] max-w-[317px] text-center font-['Plus_Jakarta_Sans'] text-[20px] font-[400] leading-[170%] text-[#E6E6E6] lg:mx-0 lg:max-w-[455px] lg:text-left lg:text-[18px]">
            Clear books, accurate reports, and expert support – without the hassle.
          </p>

          <div className="mt-[40px] text-center lg:text-left">
            <Link href="/service">
              <CommonButton text="View Services" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
