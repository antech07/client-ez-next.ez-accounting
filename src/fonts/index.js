import { Fustat, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const fustat = Fustat({
  subsets: ["latin"],
  variable: "--font-fustat",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Collect all font variables
const fontList = [plusJakarta, fustat, dmSans];

export const fontVariables = fontList.map((font) => font.variable).join(" ");
