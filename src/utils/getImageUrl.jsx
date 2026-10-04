import { Env } from "./env";

export const getImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  if (/^(https?:|blob:|data:)/i.test(url)) return url;

  const base = (Env.spaces_url || "").replace(/\/+$/, "");
  const path = url.replace(/^\/+/, "").replace(/^uploads\//i, "");
  return base ? `${base}/${path}` : `/${path}`;
};
