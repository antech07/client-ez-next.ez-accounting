import React from "react";
import Hero from "@/app/about/components/Hero";
import Highlights from "@/app/about/components/Highlights";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <>
      <Hero />
      <Highlights />
    </>
  );
}
