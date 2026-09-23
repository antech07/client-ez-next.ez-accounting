import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { submitContactRequest } from "@/utils/contact";
import { toast } from "react-hot-toast";
import CustomSelect from "@/app/contact/GetInTouch/CustomSelect";

export default function BookingModal({ isOpen, onClose, services = [] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reasonForBooking: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactRequest(formData);
      if (result) {
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          reasonForBooking: "",
          message: "",
        });
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px] md:p-[2px]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
          />

          {/* Modal Content - Slide from Right */}
          <motion.div
            initial={{ x: "150%" }}
            animate={{ x: 0 }}
            exit={{ x: "150%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="custom-scrollbar relative z-10 h-[76%] w-full overflow-y-auto bg-white shadow-2xl lg:h-[96%] lg:max-w-[1080px] lg:rounded-[32px] xl:h-fit xl:max-w-[1080px] xl:rounded-[42px] 2xl:h-fit 2xl:max-w-[1300px] 2xl:rounded-[48px] 3xl:h-fit 3xl:rounded-[60px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-[16px] top-[16px] z-20 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/20 text-[#666666] transition-colors hover:bg-white/40 hover:text-[#0F0F0F] md:right-[40px] md:top-[40px]"
            >
              <CloseIcon />
            </button>

            <div className="mx-auto w-full max-w-[343px] py-[40px] md:max-w-full md:px-[40px] lg:max-w-[1080px] xl:max-w-[1180px] 2xl:max-w-[1280px]">
              <div className="flex flex-col max-md:px-[20px] lg:flex-row lg:gap-[50px] xl:gap-[60px] 2xl:gap-[100px]">
                {/* Left Panel - Info */}
                <div
                  className="relative h-auto min-h-[324px] w-full rounded-[40px] bg-cover bg-center bg-no-repeat p-[23px] text-white lg:h-[600px] lg:w-[480px] lg:p-[40px] xl:h-[450px] xl:w-[500px] xl:p-[30px] 2xl:h-[530px] 2xl:w-[550px] 2xl:p-[40px] 3xl:h-[600px] 3xl:w-[606px]"
                  style={{ backgroundImage: "url(/assets/home/share/getInTouchBg.png)" }}
                >
                  <h3 className="font-fustat text-[30px] font-[700] leading-[1.2] text-[#FEFEFE] lg:text-[46px] xl:text-[50px] 2xl:text-[66px]">
                    Get In Touch
                  </h3>

                  <p className="mt-[11px] font-plusJakarta text-[12px] leading-[1.7] text-[#E6E6E6] lg:text-[14px] xl:mt-[8px] xl:text-[16px] 2xl:mt-[13px]">
                    Explore flexible pricing options tailored to your needs and budget, providing
                    access to powerful tools and features.
                  </p>

                  <div className="mt-[20px] space-y-[16px] text-[14px] lg:mt-[40px] lg:space-y-[20px] xl:mt-[20px] xl:space-y-[20px] 2xl:mt-[40px] 2xl:space-y-[20px] 3xl:mt-[60px] 3xl:space-y-[40px]">
                    <div>
                      <p className="font-fustat text-[12px] font-[400] leading-[1.7] tracking-[-0.4px] text-[#E6E6E6]/70 lg:text-[16px] xl:text-[20px]">
                        Address
                      </p>
                      <p className="mt-[2px] font-fustat text-[14px] leading-[1.3] tracking-[-0.50px] text-[#FEFEFE] lg:text-[11px] lg:font-[600] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]">
                        Suite 1, Level 1, Building C2, Point Cook Business Center 4 Main St, Point
                        Cook, Vic 3030 Branch Office: 960 Morris Road, Truganina, Vic 3029
                      </p>
                    </div>

                    <div>
                      <p className="font-fustat text-[12px] font-[400] leading-[1.7] tracking-[-0.4px] text-[#E6E6E6]/70 lg:text-[16px] xl:text-[20px]">
                        Email address
                      </p>
                      <p className="mt-[2px] font-fustat text-[14px] leading-[1.3] tracking-[-0.50px] text-[#FEFEFE] lg:text-[11px] lg:font-[600] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]">
                        admin@ezaccountingsolutions.com.au
                      </p>
                    </div>

                    <div>
                      <p className="font-fustat text-[12px] font-[400] leading-[1.7] tracking-[-0.4px] text-[#E6E6E6]/70 lg:text-[16px] xl:text-[20px]">
                        Phone
                      </p>
                      <p className="mt-[2px] font-fustat text-[14px] leading-[1.3] tracking-[-0.50px] text-[#FEFEFE] lg:text-[11px] lg:font-[600] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]">
                        1300 530 700
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex flex-1 flex-col items-center lg:items-start lg:pt-[20px]">
                  <h4 className="mb-[16px] mt-[30px] text-center font-fustat text-[30px] font-[700] leading-[1.5] tracking-[-0.67px] text-[#0F0F0F] lg:mb-[40px] lg:mt-0 lg:text-left lg:text-[28px] xl:mb-[10px] xl:text-[32px] 2xl:mb-[40px] 3xl:mb-[60px]">
                    Send us a message
                  </h4>

                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col items-center gap-[16px] lg:items-start lg:gap-[20px] xl:gap-[20px] 2xl:gap-[40px]"
                  >
                    <div className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-[20px]">
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        icon={<UserIcon />}
                        required
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        icon={<UserIcon />}
                        required
                      />
                    </div>

                    <div className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-[20px]">
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        icon={<MailIcon />}
                        type="email"
                        required
                      />
                      <Input
                        name="phone"
                        type="number"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        icon={<PhoneIcon />}
                        required
                      />
                    </div>

                    <div className="relative flex w-full max-w-[343px] justify-center lg:max-w-full lg:justify-start">
                      <CustomSelect
                        widthClassName="w-[300px] lg:w-full"
                        icon={<ReasonIcon />}
                        value={formData.reasonForBooking}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, reasonForBooking: val }))
                        }
                        placeholder="Reason for Booking"
                        options={services.map((service) => ({
                          label: service.title,
                          value: service.title.toLowerCase().replace(/\s+/g, "-"),
                        }))}
                      />
                    </div>

                    <div className="relative flex w-full justify-center lg:justify-start">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Enter your message"
                        required
                        className="peer h-[100px] w-full resize-none rounded-[12px] border border-[#3333331A]/10 bg-[#F6F8FD] py-[15px] pl-[59px] pr-[20px] text-[16px] leading-[1.7] tracking-[-0.4px] text-[#242323] outline-none placeholder:font-plusJakarta placeholder:text-[14px] placeholder:font-[500] placeholder:text-[#666666] md:h-[120px] md:placeholder:text-[16px]"
                      />
                      <span className="pointer-events-none absolute left-[27px] top-[18px] transition-all duration-75 peer-[&:not(:placeholder-shown)]:scale-95 peer-[&:not(:placeholder-shown)]:opacity-0">
                        <MessageIcon />
                      </span>
                    </div>

                    <div className="mt-[40px] flex w-full justify-center lg:mt-[0px] lg:justify-start">
                      <div className="inline-block rounded-[17px] border-[5px] border-transparent transition-colors duration-300 hover:border-[#F37023]/40">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-[48px] rounded-[12px] px-[32px] disabled:opacity-50 lg:h-[55px] lg:px-[60px]"
                          style={{
                            background:
                              "linear-gradient(237deg, #FBAD16 1.16%, #F38B23 55.56%, #F37023 109.96%)",
                          }}
                        >
                          <span className="whitespace-nowrap font-plusJakarta text-[16px] font-[600] leading-[1.7] text-[#FEFEFE] lg:text-[18px]">
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Input({ placeholder, icon, ...props }) {
  return (
    <div className="relative flex w-full">
      <input
        placeholder={placeholder}
        className="peer h-[52px] w-full rounded-[12px] border border-[#3333331A]/10 bg-[#F6F8FD] py-[14px] pl-[59px] pr-[20px] text-[16px] leading-[1.7] tracking-[-0.64px] text-[#242323] outline-none placeholder:font-plusJakarta placeholder:text-[14px] placeholder:font-[500] placeholder:text-[#666666] md:h-[56px] md:placeholder:text-[16px]"
        {...props}
      />
      <span className="pointer-events-none absolute left-[27px] top-1/2 -translate-y-1/2 transition-all duration-75 peer-[&:not(:placeholder-shown)]:scale-95 peer-[&:not(:placeholder-shown)]:opacity-0">
        {icon}
      </span>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5 10.5C15.5 8.567 13.933 7 12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 12.433 10.067 14 12 14C13.933 14 15.5 12.433 15.5 10.5Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReasonIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M12 11H16M12 16H16M8 11H8.01M8 16H8.01M9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V3C8 2.44772 8.44772 2 9 2Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.74038 14.3685L6.69351 12.9816C7.24445 12.5904 7.80305 12.3282 8.44034 12.1585C9.17201 11.9636 9.5 11.5644 9.5 10.711C9.5 8.54629 14.5 8.31595 14.5 10.711C14.5 11.5644 14.828 11.9636 15.5597 12.1585C16.202 12.3295 16.7599 12.5934 17.3065 12.9816L19.2596 14.3685C20.1434 14.9961 20.5547 15.2995 20.7842 15.7819C21 16.2358 21 16.768 21 17.8324C21 19.7461 21 20.703 20.4642 21.3164C19.8152 22.0593 18.128 21.9955 17.0917 21.9955H6.90833C5.87197 21.9955 4.21909 22.0986 3.5358 21.3164C3 20.703 3 19.7461 3 17.8324C3 16.768 3 16.2358 3.21584 15.7819C3.44526 15.2995 3.85662 14.9961 4.74038 14.3685Z"
        stroke="#666666"
        strokeWidth="1.5"
      />
      <path
        d="M14 17C14 18.1046 13.1046 19 12 19C10.8954 19 10 18.1046 10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17Z"
        stroke="#666666"
        strokeWidth="1.5"
      />
      <path
        d="M6.96014 3.69772C5.6417 4.07415 4.69384 4.54112 3.82645 5.10455C2.45318 5.9966 1.86443 7.60404 2.02607 9.15513C2.09439 9.81068 2.62064 10.1241 3.23089 9.95455C3.69451 9.82571 4.15888 9.7003 4.61961 9.56364C5.96706 9.16397 6.28399 8.67812 6.47124 7.29885L6.96014 3.69772ZM6.96014 3.69772C10.2186 2.76743 13.7814 2.76743 17.0399 3.69772M17.0399 3.69772C18.3583 4.07415 19.3062 4.54112 20.1735 5.10455C21.5468 5.9966 22.1356 7.60404 21.9739 9.15513C21.9056 9.81068 21.3794 10.1241 20.7691 9.95455C20.3055 9.82571 19.8411 9.7003 19.3804 9.56364C18.0329 9.16397 17.716 8.67812 17.5288 7.29885L17.0399 3.69772Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0053 12H12.0143M16.0008 12H16.0098M8.00977 12H8.01874"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
