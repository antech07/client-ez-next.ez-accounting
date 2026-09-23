"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { getImageUrl } from "@/utils/getImageUrl";

function TrustedRecognized({ gallery }) {
  const x = useMotionValue(0);

  const images = [
    "/assets/home/share/trusted_1.png",
    "/assets/home/share/trusted_2.png",
    "/assets/home/share/trusted_3.png",
    "/assets/home/share/trusted_4.png",
    "/assets/home/share/trusted_5.png",
    "/assets/home/share/trusted_6.png",
    "/assets/home/share/trusted_7.png",
  ];

  // store animation instance
  const animationRef = React.useRef(null);

  useEffect(() => {
    animationRef.current = animate(x, ["0%", "-50%"], {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    });

    return () => animationRef.current?.stop();
  }, [x]);

  return (
    <section
      className="-mb-20 w-screen overflow-hidden lg:h-[500px] xl:h-[580px] 2xl:h-[628px]"
      style={{
        backgroundImage: "url(/assets/home/share/focusedBg2.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full">
        <h1 className="pb-[24px] pt-[40px] text-center font-fustat text-[30px] font-[700] leading-[1.2] text-[#050503] lg:pb-[80px] lg:pt-[80px] lg:text-[32px] xl:pt-[90px] xl:text-[38px] 2xl:pt-[100px] 2xl:text-[48px]">
          Trusted. Recognized. Community-Focused.
        </h1>
        {/* Marquee */}
        <div className="relative w-full overflow-hidden pb-[40px] lg:pb-[100px]">
          <motion.div
            className="flex"
            style={{ x, width: "max-content" }}
            onHoverStart={() => animationRef.current?.pause()}
            onHoverEnd={() => animationRef.current?.play()}
          >
            {[...gallery, ...gallery].map((img, i) => (
              <Image
                key={i}
                src={getImageUrl(img.image)}
                width={400}
                height={400}
                alt={`client-${i}`}
                className="h-[101px] w-[121px] object-contain lg:h-[200px] lg:w-[200px] xl:h-[230px] xl:w-[230px] 2xl:mr-[30px] 2xl:h-[280px] 2xl:w-[280px]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TrustedRecognized;
