// src/utils/urlFormatting.js
export const formatForUrl = (text) => {
  return text
    .toLowerCase()
    .replace(/[,\s&]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const formatFromUrl = (text) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
