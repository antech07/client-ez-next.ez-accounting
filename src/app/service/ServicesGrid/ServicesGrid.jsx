"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ServiceCard from "../ServiceCard/ServiceCard";
import ServiceDetailsDrawer from "../ServiceDetailsDrawer/ServiceDetailsDrawer";
import ServiceDetailsDrawerMobile from "../ServiceDetailsDrawer/ServiceDetailsDrawerMobile";

export default function ServicesGrid({ services = [] }) {
  // console.log(services);

  const [activeService, setActiveService] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const serviceId = searchParams.get("id");
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setActiveService(service);
      }
    }
  }, [searchParams]);

  const handleCardClick = (service) => {
    setActiveService(null);
    requestAnimationFrame(() => {
      setActiveService(service);
    });
  };

  return (
    <>
      <div className="mx-auto grid max-w-[343px] grid-cols-2 justify-items-center gap-[20px] pb-[60px] pt-[70px] sm:max-w-[640px] lg:max-w-[980px] lg:grid-cols-3 xl:max-w-[1100px] xl:grid-cols-4 xl:pb-[70px] xl:pt-[80px] 2xl:max-w-[1280px] 2xl:gap-[30px] 2xl:pb-[80px] 2xl:pt-[100px]">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => handleCardClick(service)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeService && isDesktop && (
          <ServiceDetailsDrawer service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeService && !isDesktop && (
          <ServiceDetailsDrawerMobile
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
