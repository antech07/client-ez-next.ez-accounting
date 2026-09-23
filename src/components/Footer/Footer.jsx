import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerLogo, faceBook, email, phone, linkeDin, loveIcon, footerMobileLogo } from "./icons";

export default function Footer() {
  return (
    <footer className="h-[909px] w-full overflow-hidden bg-[url('/assets/footer/footerBgMobile.png')] bg-cover bg-center bg-no-repeat lg:h-[480px] lg:bg-[url('/assets/footer/footerBg.png')] lg:px-4 xl:h-[530px] 2xl:h-[584px] 2xl:px-0">
      {/* CONTENT WRAPPER */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-between text-center lg:max-w-[1000px] lg:items-stretch lg:pt-[80px] lg:text-left xl:max-w-[1100px] xl:pt-[100px] 2xl:max-w-[1279px] 2xl:pt-[124px]">
        {/* TOP CONTENT */}
        <div className="w-full justify-between lg:flex">
          {/* LEFT */}
          <div className="flex flex-col items-center justify-between lg:items-start">
            <div className="mt-[60px] block lg:mt-0">
              {/* Desktop Logo */}
              <div className="mx-auto hidden h-[38px] w-[272px] lg:mx-0 lg:block xl:h-[48px]">
                <Image src={footerLogo} alt="Logo" width={300} height={300} />
              </div>

              {/* Mobile Logo */}
              <div className="mx-auto block h-[69px] w-[134px] lg:hidden">
                <Image src={footerMobileLogo} alt="Logo" width={300} height={300} />
              </div>

              <p className="mx-auto mt-[16px] w-full max-w-[285px] font-plusJakarta text-[16px] font-[400] leading-[1.7] text-[#D9D9D9]/80 lg:mx-0 lg:mt-[40px] lg:max-w-[408px] xl:w-[458px]">
                Empowering businesses with reliable accounting support built for long-term success.
              </p>
            </div>

            {/* SOCIAL ICONS (UNCHANGED) */}
            <div className="mt-[14px] hidden gap-[24px] lg:flex xl:mt-[18px]">
              {[faceBook, email, phone, linkeDin].map((icon, i) => {
                const isFacebook = i === 0;

                const content = (
                  <div className="rounded p-[4px] transition-all duration-300 hover:ring-[4px] hover:ring-[#FEFEFE]/15">
                    <Image
                      className="h-[24px] w-[24px]"
                      src={icon}
                      alt="social"
                      width={40}
                      height={40}
                    />
                  </div>
                );

                return isFacebook ? (
                  <Link
                    key={i}
                    href="https://www.facebook.com/people/EZ-Accounting-Business-Solutions/100069277013130/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-[40px] w-full items-center justify-end gap-[30px] lg:mt-0 lg:flex lg:w-[583px] lg:items-start xl:gap-[70px]">
            {/* Company */}
            <div className="mx-auto w-full max-w-[167px]">
              <h4 className="font-fustat text-[20px] font-[600] text-[#FFFFFF] lg:mb-[20px] xl:mb-[27px]">
                Company
              </h4>

              <ul className="space-y-[16px] font-plusJakarta text-[14px] font-[400] text-[#CCCCCC]/80 2xl:text-[16px]">
                <li className="hover:underline">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/service">Services</Link>
                </li>
                {/* <li className="hover:underline">
                  <Link href="/about">About</Link>
                </li> */}
                {/* <li className="hover:underline">
                  <Link href="/taxfilling">Tax Filling</Link>
                </li> */}
                <li className="hover:underline">
                  <Link
                    href="https://app.taxdome.com/en-au/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Client Portal
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mx-auto mt-[40px] w-full max-w-[347px] lg:mt-0">
              <h4 className="font-fustat text-[20px] font-[600] text-[#FFFFFF] lg:mb-[20px] xl:mb-[27px]">
                Contact Information
              </h4>

              <ul className="space-y-[16px] font-plusJakarta text-[14px] text-[#CCCCCC] 2xl:text-[16px]">
                <li className="font-plusJakarta text-[14px] text-[#CCCCCC]/80 2xl:text-[16px]">
                  <span className="mb-[6px] block text-[14px] font-[500] text-[#FEFEFE] lg:text-[18px]">
                    Email
                  </span>
                  admin@ezaccountingsolutions.com.au
                </li>

                <li className="font-plusJakarta text-[14px] text-[#CCCCCC]/80 2xl:text-[16px]">
                  <span className="mb-[6px] block text-[14px] font-[500] text-[#FEFEFE] lg:text-[18px]">
                    Phone
                  </span>
                  1300 530 700
                </li>

                <li className="font-plusJakarta text-[14px] leading-[1.6] text-[#CCCCCC]/80 2xl:text-[16px]">
                  <span className="mb-[10px] block text-[14px] font-[500] text-[#FEFEFE] lg:text-[18px]">
                    Office Address
                  </span>

                  <p className="mb-[22px]">
                    Suite 1, Level 1, Building C2, Point Cook <br />
                    Business Center
                  </p>

                  <p className="mb-[22px] font-[600] text-[#CCCCCC]">
                    4 Main St, Point Cook, Vic 3030
                  </p>

                  <p>
                    Branch Office: 960 Morris Road, Truganina, Vic <br />
                    3029
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOCIAL ICONS (UNCHANGED) */}
        <div className="mt-[14px] flex w-full justify-center gap-[24px] lg:hidden xl:mt-[18px]">
          {[faceBook, email, phone, linkeDin].map((icon, i) => (
            <div
              key={i}
              className="rounded p-[4px] transition-all duration-300 hover:ring-[4px] hover:ring-[#FEFEFE]/15"
            >
              <Image className="h-[24px] w-[24px]" src={icon} alt="social" width={40} height={40} />
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="mt-[36px] h-[1.5px] w-full bg-[#666666]/30" />

        {/* BOTTOM */}
        <div className="mt-[36px] w-full items-center justify-between font-plusJakarta text-[14px] font-[500] lg:flex">
          <p className="text-center text-[#FBF9F5]/80 lg:text-left">
            copyright@ezaccounting. All Right Reserved
          </p>

          <p className="mt-[14px] flex items-center justify-center gap-1 text-[#FEFEFE]/80 lg:mt-0 lg:justify-start">
            Made with
            <Image src={loveIcon} alt="love" width={15} height={12} />
            by{" "}
            <Link
              href="https://clerkstop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ClerkStop
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
