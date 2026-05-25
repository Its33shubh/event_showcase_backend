import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];

  return `bhavnagar-events/${publicId}`;
};

export default cloudinary;