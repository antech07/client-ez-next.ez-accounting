"use client";
import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative w-full bg-[#FEFEFE]">
      {/* ================= TOP HERO IMAGE ================= */}
      <div className="relative mt-[60px] h-[350px] w-full md:mt-[72px] md:h-[45vh]">
        <Image
          src="/assets/home/hero/abouthero.png"
          alt="About Hero"
          fill
          priority
          quality={100}
          className="hidden object-cover md:block"
        />

        <Image
          src="/assets/home/hero/serviceheromobile.png"
          alt="About Hero"
          fill
          priority
          quality={100}
          className="object-cover md:hidden"
        />

        {/* Centered Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-fustat text-4xl font-bold text-white md:text-[50px]">
            Our Accounting Services
          </h1>

          <div className="ml-[50px] h-[6px] w-[100px] bg-[#F36C24] md:ml-[130px] md:mt-4 md:w-[440px]" />
        </div>
      </div>
    </section>
  );
}
