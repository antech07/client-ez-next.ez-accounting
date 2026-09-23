import { Env } from "./env";

export const PROJECT_API = Env.backend_url + "ez-accounting/";

export const GALLERY_API = PROJECT_API + "gallery";
export const PROFESSIONAL_CREDENTIALS_API = PROJECT_API + "professionalCredentials";
export const PARTNERS_API = PROJECT_API + "partners";
export const SOCIAL_LINKS_API = PROJECT_API + "socialLinks";
export const CONTACT_REQUEST_API = Env.backend_url + "insertFormData/ez-accounting/contactrequest";
export const SERVICES_API = PROJECT_API + "services?all=true";
export const WE_HANDLE_API = PROJECT_API + "weHandle?all=true";
export const INDIVIDUALTAXRETURN_API = PROJECT_API + "individualTaxReturn?all=true";
export const COMMONADDONS_API = PROJECT_API + "commonAddOns?all=true";
export const TAXFILLING_REQUEST_API =
  Env.backend_url + "insertFormData/ez-accounting/taxfillingrequest";
