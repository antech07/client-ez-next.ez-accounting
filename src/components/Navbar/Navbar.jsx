"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Heart } from "lucide-react";

export default function Navbar() {
  const leftImage = "/assets/navbar/logotext.png";
  const hamburger = "/assets/navbar/open.svg";
  const closeIcon = "/assets/navbar/close.svg";
  const MobileImage = "/assets/navbar/logo.png";
  const pathname = usePathname();

  // define mobileItems (tumi use korecho)
  const mobileItems = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/about", label: "About" },
    { id: 3, href: "/service", label: "Services & Pricing" },
    { id: 4, href: "/taxfilling", label: "Tax Filling" },
    {
      id: 5,
      href: "https://app.taxdome.com/en-au/login",
      target: "_blank",
      rel: "noopener noreferrer",
      label: "Client Portal",
    },
    { id: 6, href: "/contact", label: "Contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = () => {
    setIsMenuVisible(true);
    requestAnimationFrame(() => {
      setIsMobileMenuOpen(true);
    });
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setIsMenuVisible(false);
    }, 500);
  };

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (isMenuVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuVisible]);

  // Reset menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMenuVisible(false);
    document.body.style.overflow = "";
  }, [pathname]);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = useMemo(() => {
    return (href) => pathname === href;
  }, [pathname]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-[999] bg-[#FDFCFC] shadow-sm backdrop-blur-md transition-all duration-300 md:h-[72px]">
      {/* DESKTOP WRAPPER */}
      <div className="mx-auto w-full px-[16px] lg:max-w-[1000px] lg:px-4 xl:max-w-[1100px] xl:px-0 2xl:max-w-[1280px]">
        <div className="flex items-center justify-between py-[8px] 2xl:py-[6px]">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src={leftImage}
              alt="Logo"
              width={218}
              height={56}
              className="hidden h-[52px] w-[52px] lg:block lg:h-[56px] lg:w-[218px]"
            />

            <Image
              src={MobileImage}
              alt="Logo"
              width={218}
              height={56}
              className="h-[52px] w-[52px] lg:hidden lg:h-[56px] lg:w-[218px]"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden items-center justify-between lg:flex lg:gap-[16px] xl:gap-[20px] 2xl:gap-[32px]">
            {[
              { href: "/about", label: "About" },
              { href: "/service", label: "Services & Pricing" },
              { href: "/taxfilling", label: "Tax Filing" },
              {
                href: "https://app.taxdome.com/en-au/login",
                target: "_blank",
                rel: "noopener noreferrer",
                label: "Client Portal",
              },
              { href: "/contact", label: "Contact" },
            ].map((item, index) => {
              const isActiveItem = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className={`rounded-[8px] px-[16px] py-[4px] font-plusJakarta leading-[1.8] text-[#333333] transition-all hover:bg-[#F36C2426] lg:text-[15px] xl:text-[16px] ${
                    isActiveItem ? "font-[700] text-[#F36C24]" : "font-[500] text-[#333333]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={openMenu} className="flex lg:hidden">
            <Image src={hamburger} alt="Open Menu" width={44} height={44} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuVisible &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100000000] lg:hidden">
            <div className="absolute inset-0" onClick={closeMenu} />

            <div
              className={`absolute inset-y-0 right-0 w-full bg-[url('/assets/navbar/Navbardrop.png')] bg-cover bg-no-repeat transition-transform duration-500 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex h-[72px] justify-between bg-[#FDFCFC] px-[20px] py-[15px] shadow-md">
                <Link className="h-[52px] w-[52px]" href="/" onClick={closeMenu}>
                  <Image src={MobileImage} alt="Logo" width={90} height={90} />
                </Link>

                {/* Close Icon */}
                <button onClick={closeMenu} className="" aria-label="Close menu">
                  <Image src={closeIcon} alt="Close Menu" width={44} height={44} />
                </button>
              </div>

              <div className="mx-auto flex h-full w-[343px] flex-col pt-[100px]">
                <nav className="space-y-[12px] text-center">
                  {mobileItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      onClick={closeMenu}
                      className={`block rounded-[10px] py-[14px] font-plusJakarta text-[16px] font-[600] transition-all ${
                        isActive(item.href)
                          ? "bg-gradient-to-l from-[#2758D0] via-[#193269] to-[#0F152C] text-[#FEFEFE]"
                          : "text-[#4D4D4D]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA (NO CommonBtn) */}
                <div className="mb-[25px] mt-[72px] flex justify-center"></div>

                <div className="mt-auto pb-20 text-center font-plusJakarta text-[14px] font-[500] lm:pb-20">
                  <p className="text-[#121212]">copyright@ezaccounting. All Right Reserved</p>
                  <p className="mt-[8px] flex items-center justify-center gap-1 text-[#121212]">
                    Made with
                    <Heart className="h-4 w-4 fill-[#1A4BED] text-[#1A4BED]" />
                    by{" "}
                    <Link href="https://antopolis.io" target="_blank">
                      Antopolis
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
