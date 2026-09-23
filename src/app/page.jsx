import EasytoGetStarted from "./(Home)/components/EasytoGetStarted/EasytoGetStarted";
import Hero from "./(Home)/components/Hero/Hero";
import OurServices from "./(Home)/components/OurServices/OurServices";
import OurServicesMobile from "./(Home)/components/OurServices/OurServicesMobile";
import ReadytoSimplify from "./(Home)/components/ReadytoSimplify";
import TrustedRecognized from "./(Home)/components/TrustedRecognized/TrustedRecognized";
import WhyChoose from "./(Home)/components/WhyChoose/WhyChoose";
import { $fetch } from "@/lib/fetcher";
import {
  GALLERY_API,
  PROFESSIONAL_CREDENTIALS_API,
  PARTNERS_API,
  SERVICES_API,
  WE_HANDLE_API,
  INDIVIDUALTAXRETURN_API,
  COMMONADDONS_API,
} from "@/utils/api";
import { mapServicesData } from "@/utils/serviceMapper";

export default async function Page() {
  const [
    gallery,
    professionalCredentials,
    partners,
    servicesData,
    weHandle,
    individualTax,
    addons,
  ] = await Promise.all([
    $fetch(GALLERY_API),
    $fetch(PROFESSIONAL_CREDENTIALS_API),
    $fetch(PARTNERS_API),
    $fetch(SERVICES_API),
    $fetch(WE_HANDLE_API),
    $fetch(INDIVIDUALTAXRETURN_API),
    $fetch(COMMONADDONS_API),
  ]);

  const services = mapServicesData(
    servicesData.data,
    weHandle.data,
    individualTax.data,
    addons.data,
  );
  return (
    <div>
      <div className="bg-white">
        <div>
          <Hero />
        </div>
        <div
          className="relative z-30 mt-[-26px] rounded-t-[40px] lm:rounded-t-[60px] lg:mt-0 lg:rounded-t-[80px]"
          style={{ boxShadow: "0 -10px 10px rgba(0,0,0,0.08)" }}
        >
          <WhyChoose />
        </div>
        <div className="hidden lg:block">
          <OurServices services={services} />
        </div>
        <div className="block lg:hidden">
          <OurServicesMobile services={services} />
        </div>
        <div>
          <TrustedRecognized gallery={gallery.data} />
        </div>
        <div className="relative bottom-[-78px]">
          <EasytoGetStarted
            professionalCredentials={professionalCredentials.data}
            partners={partners.data}
          />
        </div>
        <div className="relative z-20 lg:bottom-[-35px] xl:bottom-[-50px] 2xl:bottom-[-68px]">
          <ReadytoSimplify />
        </div>
      </div>
    </div>
  );
}
