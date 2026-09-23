"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ServiceDetailsDrawerMobile from "@/app/service/ServiceDetailsDrawer/ServiceDetailsDrawerMobile";
import ServiceDetailsDrawer from "@/app/service/ServiceDetailsDrawer/ServiceDetailsDrawer";

export default function OurServicesMobile({ services = [] }) {
  const itemWidth = 236;
  const itemGap = 12;
  const borderHeight = 48;

  const visibleCount = 2;
  const containerWidth = visibleCount * itemWidth + (visibleCount - 1) * itemGap;
  const step = itemWidth + itemGap;

  const animationDuration = 1000;
  const autoScrollDelay = 3500;

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const scrollRef = useRef(null);
  const autoIndexRef = useRef(0);
  const animationRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  const loopedServices = useMemo(() => {
    if (!services.length) return [];
    return [...services, ...services, ...services];
  }, [services]);

  const easeInOutCubic = useCallback((t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, []);

  const smoothScrollTo = useCallback(
    (targetLeft) => {
      const el = scrollRef.current;
      if (!el) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const startLeft = el.scrollLeft;
      const distance = targetLeft - startLeft;
      const startTime = performance.now();

      isAutoScrollingRef.current = true;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const easedProgress = easeInOutCubic(progress);

        el.scrollLeft = startLeft + distance * easedProgress;

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          el.scrollLeft = targetLeft;
          isAutoScrollingRef.current = false;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [easeInOutCubic],
  );

  const pauseAutoScroll = () => {
    setPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    isAutoScrollingRef.current = false;
  };

  const resumeAutoScrollLater = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, 1800);
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // Start from middle copy for seamless loop
  useEffect(() => {
    if (!services.length || !scrollRef.current) return;

    const middleIndex = services.length;
    autoIndexRef.current = middleIndex;

    requestAnimationFrame(() => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft = middleIndex * step;
      setActiveIndex(0);
    });
  }, [services.length, step]);

  // Auto scroll smooth
  useEffect(() => {
    if (!services.length) return;

    const interval = setInterval(() => {
      if (paused || !scrollRef.current) return;

      const nextIndex = autoIndexRef.current + 1;
      const realIndex = ((nextIndex % services.length) + services.length) % services.length;

      autoIndexRef.current = nextIndex;
      setActiveIndex(realIndex);

      smoothScrollTo(nextIndex * step);

      // Seamless reset
      if (nextIndex >= services.length * 2) {
        setTimeout(() => {
          if (!scrollRef.current) return;

          const resetIndex = services.length + realIndex;
          autoIndexRef.current = resetIndex;
          scrollRef.current.scrollLeft = resetIndex * step;
        }, animationDuration + 50);
      }
    }, autoScrollDelay);

    return () => clearInterval(interval);
  }, [paused, services.length, step, smoothScrollTo]);

  // Normal native x-scroll sync
  const handleScroll = () => {
    if (!scrollRef.current || !services.length) return;

    const currentIndex = Math.round(scrollRef.current.scrollLeft / step);
    const realIndex = ((currentIndex % services.length) + services.length) % services.length;

    autoIndexRef.current = currentIndex;
    setActiveIndex(realIndex);

    // Infinite loop balance, but only when user is not auto-scrolling
    if (!isAutoScrollingRef.current) {
      if (currentIndex <= services.length * 0.5) {
        const resetIndex = currentIndex + services.length;
        autoIndexRef.current = resetIndex;
        scrollRef.current.scrollLeft = resetIndex * step;
      }

      if (currentIndex >= services.length * 2.5) {
        const resetIndex = currentIndex - services.length;
        autoIndexRef.current = resetIndex;
        scrollRef.current.scrollLeft = resetIndex * step;
      }
    }
  };

  const handleItemClick = (index) => {
    if (!scrollRef.current || !services.length) return;

    pauseAutoScroll();

    const realIndex = ((index % services.length) + services.length) % services.length;

    autoIndexRef.current = index;
    setActiveIndex(realIndex);

    smoothScrollTo(index * step);
    resumeAutoScrollLater();
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!services.length) return null;

  const active = services[activeIndex] || services[0];

  return (
    <section className="bg-[#F6F7F9] py-[80px]">
      {/* up */}
      <div className="px-[16px] text-center">
        <h2 className="text-center font-fustat text-[30px] font-[700] leading-[1.2] text-[#101010]">
          Our Services
        </h2>

        <p className="mx-auto mt-[12px] w-[343px] text-center font-plusJakarta text-[16px] font-[500] leading-[1.5] text-[#4D4D4D] xl:text-[16px]">
          Comprehensive accounting solutions designed to simplify your financial management
        </p>
      </div>

      {/* middle: auto-scroll + normal mobile x-scroll */}
      <div className="mt-[24px] px-[16px]">
        <div
          ref={scrollRef}
          className="relative overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            width: "100%",
            maxWidth: `${containerWidth}px`,
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pan-y",
          }}
          onScroll={handleScroll}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScrollLater}
          onPointerDown={pauseAutoScroll}
          onPointerUp={resumeAutoScrollLater}
          onPointerCancel={resumeAutoScrollLater}
        >
          <div
            className="flex w-max"
            style={{
              gap: `${itemGap}px`,
            }}
          >
            {loopedServices.map((item, i) => {
              const realIndex = i % services.length;
              const isActive = realIndex === activeIndex;

              return (
                <div
                  key={`${item?._id || item?.id || item?.title || "service"}-${i}`}
                  className="relative flex h-[64px] shrink-0 cursor-pointer items-center gap-[8px] pl-[14px]"
                  style={{ width: `${itemWidth}px` }}
                  onClick={() => handleItemClick(i)}
                >
                  {/* Active border box */}
                  <div
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 rounded-[12px] border border-[#2758D0] bg-[#FFFFFF] transition-all"
                    style={{
                      width: `${itemWidth}px`,
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
      </div>

      {/* down */}
      <div className="mt-[18px] px-[16px]">
        <div className="relative h-[240px] overflow-hidden rounded-[20px] sm:h-[320px] lg:h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active?._id || active?.id || active?.title || activeIndex}
              className="absolute inset-0 h-full w-full"
              initial={{
                opacity: 0,
                x: 35,
                scale: 1.03,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -35,
                scale: 0.98,
              }}
              transition={{
                duration: 0.75,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Image
                src={active.image}
                alt={active.title}
                width={780}
                height={505}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-[18px] flex items-center justify-between lg:mt-[24px]">
          <h3 className="font-plusJakarta text-[20px] font-[600] leading-[1.5] text-[#000000] lg:text-[24px]">
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

        <p className="mt-[12px] font-plusJakarta text-[14px] leading-[1.6] text-[#4D4D4D] lg:text-[16px] lg:leading-[1.5]">
          {active.description}
        </p>
      </div>

      <AnimatePresence>
        {selectedService && !isDesktop && (
          <ServiceDetailsDrawerMobile
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedService && isDesktop && (
          <ServiceDetailsDrawer
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
