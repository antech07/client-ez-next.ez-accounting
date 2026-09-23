import { getImageUrl } from "./getImageUrl";

export const mapServicesData = (services, weHandle, individualTaxReturn, commonAddOns) => {
  return services.map((service) => {
    const serviceId = service._id;

    return {
      id: serviceId,
      title: service.title,
      description: service.subtitle,
      image: getImageUrl(service.image),
      icon: getImageUrl(service.icon),
      weHandle: weHandle
        .filter((item) => item.services === serviceId && item.isActive)
        .map((item) => item.point),
      pricingTitle: "Individual Tax Returns",
      pricingNote: "All fees exclude GST. Final pricing depends on complexity.",
      pricing: individualTaxReturn
        .filter((item) => item.services === serviceId && item.isActive)
        .map((item) => ({
          service: item.serviceName,
          fee: item.fee.startsWith("$") ? item.fee : `${item.fee}`,
          details: item.details,
        })),
      addOns: commonAddOns
        .filter((item) => item.services === serviceId && item.isActive)
        .map((item) => ({
          service: item.serviceName,
          fee: item.fee.startsWith("$") ? item.fee : `${item.fee}`,
          details: item.details,
        })),
    };
  });
};
