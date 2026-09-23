"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  icon,
  widthClassName = "w-[343px] md:w-full xl:w-[574px]",
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("bottom");
  const ref = useRef(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!open || !ref.current) return;

    // ✅ MOBILE: always open top (fix overflow hidden issue)
    if (isMobile) {
      setPosition("top");
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const dropdownHeight = 220;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [open]);

  return (
    <div ref={ref} className="relative z-50 w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex h-[50px] ${widthClassName} items-center justify-between rounded-[12px] border border-gray-300 bg-[#F6F8FD] pl-[50px] pr-[16px] text-[16px] font-[500] text-[#242323] lg:h-[55px]`}
      >
        {icon && (
          <span className="pointer-events-none absolute left-[18px] text-[#666666]">{icon}</span>
        )}

        <span className={selectedLabel ? "text-[#242323]" : "text-[#666666]"}>
          {selectedLabel || placeholder}
        </span>

        <ChevronDownIcon
          className={`h-5 w-5 text-[#666666] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute z-[9999] max-h-[220px] w-full overflow-auto rounded-[12px] border border-gray-200 bg-white shadow-xl ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"} `}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-3 text-[14px] text-black hover:bg-[#F6F8FD]"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
