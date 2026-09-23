"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { getImageUrl } from "@/utils/getImageUrl";

function OurStandards({ partners }) {
  // console.log(partners);
  const x = useMotionValue(0);

  // store animation instance
  const animationRef = React.useRef(null);

  useEffect(() => {
    animationRef.current = animate(x, ["0%", "-50%"], {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    });

    return () => animationRef.current?.stop();
  }, [x]);

  return (
    <section className="w-full pb-6 lg:pb-0">
      <div className="w-full">
        <div className="mx-auto flex max-w-7xl items-center gap-6 pb-4 pt-8">
          <div className="h-[1px] flex-grow bg-[#D9D9D9]" />
          <h2 className="flex-shrink-0 font-plusJakarta text-[14px] font-bold text-[#666666]">
            Our Trusted Partners
          </h2>
          <div className="h-[1px] flex-grow bg-[#D9D9D9]" />
        </div>
        {/* Marquee */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            style={{ x, width: "max-content" }}
            onHoverStart={() => animationRef.current?.pause()}
            onHoverEnd={() => animationRef.current?.play()}
          >
            {[...partners, ...partners].map((img, i) => (
              <Image
                key={i}
                src={getImageUrl(img.logo)}
                width={400}
                height={400}
                alt={`client-${i}`}
                className="mr-[50px] h-[50px] w-auto object-contain lg:mr-[50px] lg:h-[48px] xl:mr-[60px] xl:h-[100px] xl:w-[200px] 2xl:h-[100px] 2xl:w-[240px]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OurStandards;
