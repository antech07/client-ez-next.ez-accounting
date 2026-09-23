import Image from "next/image";
import Marquee from "react-fast-marquee";

import { $fetch } from "@/lib/fetcher";
import { getImageUrl } from "@/utils/getImageUrl";
import { PROFESSIONAL_CREDENTIALS_API, PARTNERS_API } from "@/utils/api";
import Credential from "@/app/(Home)/components/EasytoGetStarted/Credential";
import OurStandards from "@/app/(Home)/components/EasytoGetStarted/OurStandards";

export default async function Hero() {
  const professionalCredentials = await $fetch(PROFESSIONAL_CREDENTIALS_API);
  const partners = await $fetch(PARTNERS_API);
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
            About Ez
            <br className="md:hidden" /> Accounting
          </h1>

          <div className="ml-[40px] mt-1 h-[6px] w-[150px] bg-[#F36C24] md:ml-[95px] md:mt-4 md:w-[391px]" />
        </div>
      </div>

      {/* ================= OVERLAPPING CONTENT CONTAINER ================= */}
      <div className="relative z-10 mt-[-40px] w-full md:mt-[-60px]">
        {/* White Backdrop to overlap the hero image */}
        <div className="absolute inset-x-0 top-0 z-0 h-[100px] rounded-t-[30px] bg-[#FEFEFE] md:rounded-t-[80px]" />

        {/* Background Image - visible throughout but subtle */}
        <div
          className="bg:cover absolute inset-0 z-10 bg-bottom bg-no-repeat opacity-30 md:bg-contain"
          style={{ backgroundImage: "url(/assets/home/share/ChooseBg2.png)" }}
        />

        {/* Main Content Layer */}
        <div className="relative z-20">
          <div className="mx-auto max-w-7xl bg-transparent px-6 py-[50px] md:px-0 md:py-[100px] 2xl:w-[1280px]">
            {/* ====== TOP SECTION (LEFT IMAGE + RIGHT CONTENT) ====== */}
            <div className="grid items-start md:px-10 lg:grid-cols-[311px_575px] lg:gap-[20px] xl:grid-cols-[411px_680px] xl:gap-[64px] 2xl:grid-cols-[411px_805px] 2xl:gap-[64px] 2xl:px-0 3xl:grid-cols-[411px_805px] 3xl:gap-[64px]">
              {/* Left Image */}
              <div className="relative aspect-square h-auto w-[100%] md:h-[480px] md:w-[100%]">
                <Image
                  src="/assets/home/hero/aboutimg.png"
                  alt="About Image"
                  fill
                  priority
                  quality={100}
                  className="h-[250px] rounded-[30px] object-cover md:h-[400px] md:rounded-[30px]"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-col gap-14">
                {/* Top Rounded Blue Box */}
                <div className="mt-12 rounded-[30px] bg-[#E6ECF9] p-9">
                  <h2 className="mb-6 font-fustat text-[40px] font-bold text-[#11122C]">
                    What Makes Us Different?
                  </h2>

                  <p className="mb-6 text-[17px] font-normal leading-relaxed text-[#4D4D4D]">
                    EZ Accounting is one of the leading accounting and tax advisory firms based in
                    Point Cook, south-east Melbourne. With years of experience in the accounting and
                    taxation industry, we have rapidly emerged as the ‘one-stop’ service provider to
                    the growing client base in Melbourne.
                  </p>

                  <p className="text-[17px] font-normal leading-relaxed text-[#4D4D4D]">
                    All our working professionals are accounting experts and hold years of expertise
                    in managing complex and profound projects in the finest of ways. While
                    traditional accounting, taxation & compliance services are our core, we make
                    real difference in providing value adding consulting and advisory services.
                  </p>
                </div>

                {/* Bottom Stats Cards */}
                <div className="grid grid-cols-3 gap-8">
                  {/* Card 1 */}
                  {/* <div className="border-b border-[#11122C] pb-4">
                    <h3 className="font-dmSans text-[35px] font-medium text-[#11122C] md:text-[45px]">
                      36M
                    </h3>
                    <p className="mt-2 text-[14px] text-[#555] md:text-[16px]">
                      Total world-wide users
                    </p>
                  </div> */}

                  {/* Card 2 */}
                  {/* <div className="border-b border-[#11122C] pb-4">
                    <h3 className="font-dmSans text-[35px] font-medium text-[#11122C] md:text-[45px]">
                      15+
                    </h3>
                    <p className="mt-2 text-[14px] text-[#555] md:text-[16px]">
                      Years of Experience
                    </p>
                  </div> */}

                  {/* Card 3 */}
                  {/* <div className="border-b border-[#11122C] pb-4">
                    <h3 className="font-dmSans text-[35px] font-medium text-[#11122C] md:text-[45px]">
                      100%
                    </h3>
                    <p className="mt-2 text-[14px] text-[#555] md:text-[16px]">
                      Audit Ready Compliance Rate
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* ====== CREDENTIALS SECTION (LEFT TEXT + RIGHT CARDS) ====== */}

            <Credential professionalCredentials={professionalCredentials.data} />
          </div>

          {/* ====== TRUSTED PARTNERS SECTION ====== */}
          <div className="w-full pb-10">
            <OurStandards partners={partners.data} />
          </div>
        </div>
      </div>
    </section>
  );
}
