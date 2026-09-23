"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";
import { SERVICES_API } from "@/utils/api";

export default function BookAMeeting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const normalizeArray = (result) => {
      if (Array.isArray(result)) return result;
      if (Array.isArray(result?.data)) return result.data;
      if (Array.isArray(result?.result)) return result.result;
      if (Array.isArray(result?.data?.data)) return result.data.data;
      if (Array.isArray(result?.data?.result)) return result.data.result;
      return [];
    };

    const fetchServices = async () => {
      try {
        const res = await fetch(SERVICES_API, {
          cache: "no-store",
        });

        const result = await res.json();
        setServices(normalizeArray(result));
      } catch (error) {
        console.error("Services fetch error:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group fixed bottom-[52px] right-[16px] z-50 cursor-pointer lg:bottom-[52px] lg:right-[60px] xl:bottom-[20px] xl:right-[30px] 2xl:bottom-[52px] 2xl:right-[60px]"
      >
        <div className="relative flex h-[70px] w-[70px] items-center justify-center lg:h-[120px] lg:w-[120px]">
          <div className="absolute inset-0 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#2758D0]" />

          <div
            className="absolute inset-0 rounded-full border-2 border-[#2758D0] bg-white transition-colors duration-300 group-hover:bg-[#2758D0]"
            style={{
              boxShadow: "0 0 10px rgba(39, 88, 208, 0.45)",
            }}
          />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <defs>
              <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>

            <g className="spin-text">
              <text
                fontSize="9.18"
                fontWeight="600"
                letterSpacing="0.6"
                dominantBaseline="middle"
                textAnchor="middle"
                className="circular-text font-plusJakarta lg:text-[13px]"
              >
                <textPath href="#circlePath" startOffset="50%">
                  <tspan className="star">✱</tspan>
                  <tspan className="label"> Book A Meeting </tspan>

                  <tspan className="star label" fontSize="7.5">
                    ✱
                  </tspan>
                  <tspan className="label"> Book A Meeting </tspan>

                  <tspan className="star label" fontSize="7.5">
                    ✱
                  </tspan>
                  <tspan className="label"> Book A Meeting </tspan>
                </textPath>
              </text>
            </g>
          </svg>

          <div className="absolute z-10 h-[42px] w-[42px] rounded-full bg-white transition-colors duration-300 group-hover:bg-[#2758D0] lg:h-[60px] lg:w-[60px]" />

          <div className="relative z-20 h-[30px] w-[34px] lg:h-[42px] lg:w-[47px]">
            <Image
              src="/assets/home/share/bookAMeeting.png"
              alt="Book a Meeting Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .spin-text {
            animation: spin-slow 8s linear infinite;
            transform-origin: center;
          }

          .circular-text .label {
            fill: #000000;
            transition: fill 0.3s ease;
          }

          .group:hover .circular-text .label {
            fill: #ffffff;
          }

          .circular-text .star {
            fill: #2758d0;
          }
        `}</style>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
      />
    </>
  );
}
