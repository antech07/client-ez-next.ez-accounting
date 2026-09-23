"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
// import { services } from "./data";
import ServiceDetailsDrawer from "@/app/service/ServiceDetailsDrawer/ServiceDetailsDrawer";
import ServiceDetailsDrawerMobile from "@/app/service/ServiceDetailsDrawer/ServiceDetailsDrawerMobile";

export default function OurServices({ services = [] }) {
  const itemHeight = 64;
  const borderHeight = 48;
  const visibleCount = 7;
  const containerHeight = itemHeight * visibleCount;
  const animationDuration = 1000;

  const [isDesktop, setIsDesktop] = useState(false);

  const loopedServices = [...services, ...services, ...services];

  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);
  const [paused, setPaused] = useState(false);

  const listRef = useRef(null);
  const blockScrollRef = useRef(null);
  const manualScrollRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const isWheelAnimatingRef = useRef(false);

  /*  AUTO SCROLL  */
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;

      manualScrollRef.current = false;

      setStartIndex((prev) => {
        const next = prev + 1;
        setActiveIndex(next % services.length);
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [paused]);

  /*  SEAMLESS RESET (AUTO ONLY)  */
  useEffect(() => {
    if (manualScrollRef.current) return;

    const maxIndex = loopedServices.length - visibleCount - 1;

    if (startIndex >= maxIndex) {
      setTimeout(() => {
        setDisableTransition(true);
        setStartIndex(startIndex % services.length);

        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      }, animationDuration);
    }
  }, [startIndex]);

  /* MANUAL SCROLL */
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWheelAnimatingRef.current) return;

    setPaused(true);
    manualScrollRef.current = true;

    const deltaY = e.deltaY || 0;
    const delta = Math.max(-80, Math.min(80, deltaY));

    wheelAccumRef.current += delta;

    const THRESHOLD = 60;

    if (Math.abs(wheelAccumRef.current) < THRESHOLD) return;

    const direction = wheelAccumRef.current > 0 ? 1 : -1;

    isWheelAnimatingRef.current = true;

    setStartIndex((prev) => {
      const maxManualIndex = services.length - visibleCount;

      const next = direction > 0 ? Math.min(prev + 1, maxManualIndex) : Math.max(prev - 1, 0);

      return next;
    });

    wheelAccumRef.current = 0;

    setTimeout(() => {
      isWheelAnimatingRef.current = false;
    }, animationDuration - 150);
  };

  useEffect(() => {
    const el = blockScrollRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [services.length]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const active = services[activeIndex];

  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="bg-[#F6F7F9] py-[80px]">
      <div className="mx-auto flex w-full justify-between gap-[60px] lg:max-w-[960px] xl:max-w-[1100px] xl:gap-[100px] 2xl:max-w-[1280px] 2xl:gap-[221px]">
        {/* LEFT */}
        <div className="w-[297px]">
          <h2 className="font-fustat font-[700] leading-[1.2] text-[#101010] lg:text-[38px] xl:text-[48px]">
            Our Services
          </h2>

          <p className="mt-[12px] w-[297px] font-plusJakarta text-[14px] font-[500] leading-[1.5] text-[#4D4D4D] xl:text-[16px]">
            Comprehensive accounting solutions designed to simplify your financial management
          </p>

          <div className="relative w-[380px]">
            <div className="pointer-events-none absolute top-0 z-20 h-[8px] w-full bg-gradient-to-b from-[#F6F3F2] to-transparent" />

            <div
              ref={blockScrollRef}
              className="relative mt-[45px] overflow-hidden"
              style={{ height: containerHeight }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => {
                setPaused(false);
                wheelAccumRef.current = 0;
              }}
            >
              <div
                ref={listRef}
                className="relative"
                style={{
                  transform: `translateY(-${startIndex * itemHeight}px)`,
                  transition: disableTransition
                    ? "none"
                    : `transform ${animationDuration}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
              >
                {loopedServices.map((item, i) => {
                  const realIndex = i % services.length;
                  const isActive = realIndex === activeIndex;

                  return (
                    <div
                      key={i}
                      className="relative flex h-[64px] w-[380px] cursor-pointer items-center gap-[8px] pl-[20px]"
                      onClick={() => {
                        setPaused(true);
                        manualScrollRef.current = true;

                        //  NO MORE JUMP TO TOP
                        setActiveIndex(realIndex);
                      }}
                    >
                      <div
                        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 rounded-[12px] border border-blue-500 bg-[#FFFFFF] transition-all"
                        style={{
                          width: "380px",
                          height: `${borderHeight}px`,
                          opacity: isActive ? 1 : 0,
                          transitionDuration: `${animationDuration}ms`,
                        }}
                      />

                      <Image
                        className="relative h-[32px] w-[32px]"
                        src={item.icon}
                        alt={item.title}
                        width={20}
                        height={20}
                      />

                      <span className="relative z-10 font-plusJakarta text-[14px] font-[600] text-[#000000]">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 z-20 h-[38px] w-full bg-gradient-to-t from-[#F6F3F2]/10 to-transparent" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="sticky top-[120px] lg:w-[600px] xl:w-[662px] 2xl:w-[762px]">
          <div className="h-[480px] overflow-hidden rounded-[20px]">
            <Image
              src={active.image}
              alt={active.title}
              width={780}
              height={505}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="mt-[24px] flex items-center justify-between">
            <h3 className="font-plusJakarta text-[24px] font-[600] leading-[1.5] text-[#000000]">
              {active.title}
            </h3>

            <button
              onClick={() => setSelectedService(active)}
              className="group relative h-[30px] overflow-hidden rounded-[8px] px-[10px] transition-all duration-300 hover:bg-[#F37023]"
            >
              {/* Gradient background layer */}
              <span
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(237deg, #F37023 1.16%, #F38B23 55.56%, #FBAD16 109.96%)",
                }}
              />
              <span className="relative z-10 font-plusJakarta text-[14px] font-[400] leading-[1] text-white hover:underline">
                Learn More
              </span>
            </button>
          </div>

          <p className="mt-[12px] font-plusJakarta text-[16px] leading-[1.5] text-[#4D4D4D]">
            {active.description}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && isDesktop && (
          <ServiceDetailsDrawer
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedService && !isDesktop && (
          <ServiceDetailsDrawerMobile
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
