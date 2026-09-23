const ArrowIcon = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M15.418 10H4.16797M10.8347 15C10.8347 15 15.8347 11.3176 15.8347 10C15.8347 8.68233 10.8347 5 10.8347 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CommonButton({ text = "Book A Meeting", onClick }) {
  return (
    <div className="inline-block rounded-[17px] border-[4px] border-transparent transition-colors duration-300 hover:border-[#F37023]/40 lg:border-[5px]">
      <button
        onClick={onClick}
        style={{
          background: "linear-gradient(237deg, #FBAD16 1.16%, #F38B23 55.56%, #F37023 109.96%)",
        }}
        className="flex items-center gap-[8px] rounded-[12px] py-[11px]"
      >
        <span className="whitespace-nowrap pl-[20px] font-plusJakarta text-[16px] font-[600] leading-[1.6] text-[#FEFEFE] lg:pl-[24px] lg:text-[18px]">
          {text}
        </span>
        <span className="pr-[20px]">
          <ArrowIcon className="h-[20px] w-[20px] text-[#FEFEFE]" />
        </span>
      </button>
    </div>
  );
}
