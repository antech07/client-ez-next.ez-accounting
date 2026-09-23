import React from "react";
import Image from "next/image";

export default function Highlights() {
  const cards = [
    {
      title: "Trustworthy Plan Management Organization",
      desc: "We are a trustworthy plan management organisation with experienced plan managers",
      icon: "/assets/home/ourServices/shield.png",
      bg: "#FEFEFE",
    },
    {
      title: "Offer Tailored Management",
      desc: "We offer tailored management that will meet the specific needs of participants",
      icon: "/assets/home/ourServices/slider.png",
      bg: "#E6ECF9",
    },
    {
      title: "Holistic & Transparent",
      desc: "Our plan management is holistic & transparent, and helps in development of skills needed for independently keeping track of the funds.",
      icon: "/assets/home/ourServices/plate.png",
      bg: "#FEFEFE",
    },
  ];

  return (
    <section className="relative w-full bg-[#193167]">
      <div className="relative z-10 w-full rounded-b-[30px] bg-[#F2F3F6] py-[50px] md:rounded-b-[80px] md:py-[100px]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-[1fr_1fr] md:px-0 lg:w-[1000px] xl:w-[1100px] 2xl:w-[1280px]">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-fustat text-[40px] font-bold leading-tight text-[#0D2440] max-lg:text-center lg:text-[48px]">
              Highlights of <br /> Our Services
            </h2>
            <p className="mb-auto max-w-[450px] font-plusJakarta text-[18px] leading-relaxed text-[#4D4D4D] max-lg:text-center">
              Mortgage eligibility is determined by various factors, including credit score, income,
              employment history, debt-to-income ratio.
            </p>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-2">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex gap-6 rounded-[15px] border border-[#D9D9D9] p-6 transition-shadow hover:shadow-md max-lg:flex-col md:items-center"
                style={{ backgroundColor: card.bg }}
              >
                {/* Icon Container */}
                <div className="flex h-[70px] w-[100px] flex-shrink-0 items-center bg-transparent md:justify-center">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={70}
                    height={70}
                    quality={100}
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="flex max-w-[400px] flex-1 flex-col gap-2">
                  <h3 className="font-fustat text-[19px] font-bold text-[#121212]">{card.title}</h3>
                  <p className="font-plusJakarta text-[16px] leading-relaxed text-[#4D4D4D]">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
