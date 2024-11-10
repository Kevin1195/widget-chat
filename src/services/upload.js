import axiosUpload from "@/config/axiosUpload";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosUpload.post("/upload", formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const uploadAudio = async (data) => {
  try {
    const response = await axiosUpload.post("/upload", data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
