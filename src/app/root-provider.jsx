"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import BookAMeeting from "./(Home)/components/BookAMeeting/BookAMeeting";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const RootWrapper = ({ children }) => {
  const pathname = usePathname();

  const hideBookMeeting = pathname === "/contact";

  return (
    <div className="relative">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: 99999,
        }}
      />
      {/* Navbar  */}
      <div className="absolute left-0 top-0 z-[9999] mx-auto w-full">
        <Navbar />
      </div>

      {/* Page content (Navbar height compensate) */}
      <main className="relative z-0">{children}</main>
      {/* Book a Meeting (hidden only on /contact) */}
      {!hideBookMeeting && <BookAMeeting />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootWrapper;
