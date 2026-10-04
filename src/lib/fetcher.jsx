export const $fetch = async (url, options) => {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      ...options,
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("🚀 $fetch error:", error);
    return {
      message: error?.message,
      data: [],
    };
  }
};
