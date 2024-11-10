import axiosUpload from "@/config/axiosUpload";

export const getSitting = async () => {
  try {
    const response = await axiosUpload.get("settings");
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
