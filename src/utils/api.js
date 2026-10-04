import { Env } from "./env";

const withTrailingSlash = (url = "") => `${url.replace(/\/+$/, "")}/`;

export const PROJECT_API = withTrailingSlash(Env.backend_url);

export const GALLERY_API = PROJECT_API + "gallery";
export const PROFESSIONAL_CREDENTIALS_API = PROJECT_API + "professionalCredentials";
export const PARTNERS_API = PROJECT_API + "partners";
export const SOCIAL_LINKS_API = PROJECT_API + "socialLinks";
export const CONTACT_REQUEST_API = PROJECT_API + "contact-request";
export const SERVICES_API = PROJECT_API + "services";
export const WE_HANDLE_API = PROJECT_API + "weBundle";
export const INDIVIDUALTAXRETURN_API = PROJECT_API + "individualTaxReturn";
export const COMMONADDONS_API = PROJECT_API + "commonAddOns";
export const TAXFILLING_REQUEST_API = PROJECT_API + "tax-filing-request";

export const PRICING_API = PROJECT_API + "pricing";
export const PRICINGPOINT_API = PROJECT_API + "pricingPost";
