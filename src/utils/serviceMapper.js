import { getImageUrl } from "./getImageUrl";

const belongsToService = (item, serviceId) => {
  const references = Array.isArray(item?.services) ? item.services : [item?.services];
  return references.some((reference) => {
    const referenceId = typeof reference === "object" ? reference?._id : reference;
    return referenceId && String(referenceId) === String(serviceId);
  });
};

export const mapServicesData = (
  services = [],
  weHandle = [],
  individualTaxReturn = [],
  commonAddOns = [],
) => {
  return services.map((service) => {
    const serviceId = service._id;

    return {
      id: serviceId,
      title: service.title,
      description: service.subtitle,
      image: getImageUrl(service.image),
      icon: getImageUrl(service.icon),
      weHandle: weHandle
        .filter((item) => belongsToService(item, serviceId) && item.isActive !== false)
        .map((item) => item.point),
      pricingTitle: "Individual Tax Returns",
      pricingNote: "All fees exclude GST. Final pricing depends on complexity.",
      pricing: individualTaxReturn
        .filter((item) => belongsToService(item, serviceId) && item.isActive !== false)
        .map((item) => ({
          service: item.serviceName,
          fee: item.fee || "",
          details: item.details,
        })),
      addOns: commonAddOns
        .filter((item) => belongsToService(item, serviceId) && item.isActive !== false)
        .map((item) => ({
          service: item.serviceName,
          fee: item.fee || "",
          details: item.details,
        })),
    };
  });
};
