export const $fetch = async (url, options) => {
  try {
    const res = await fetch(url, {
      next: { revalidate: 360 },
    });
    return res.json();
  } catch (error) {
    console.log("🚀 $fetch error:", error);
    return {
      message: error?.message,
      data: [],
    };
  }
};
