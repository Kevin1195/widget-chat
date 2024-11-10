export const generateVideoThumbnail = (file, captureTimeInSeconds = 2) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("video/")) {
        reject(new Error("Invalid file type. Please select a video file."));
        return;
      }
  
      const videoURL = URL.createObjectURL(file);
      const video = document.createElement("video");
  
      video.src = videoURL;
  
      video.onloadeddata = () => {
        // Kiểm tra nếu thời gian yêu cầu lớn hơn tổng thời gian video
        if (captureTimeInSeconds > video.duration) {
          reject(new Error("Capture time exceeds video duration."));
          URL.revokeObjectURL(videoURL);
          return;
        }
  
        video.currentTime = captureTimeInSeconds; // Đặt thời gian để chọn khung hình
  
        video.onseeked = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
  
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
  
          // Chọn khung hình tại thời điểm được chỉ định
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          // Chuyển khung hình thành hình ảnh
          const thumbnailURL = canvas.toDataURL("image/png");
  
          // Dọn dẹp URL sau khi dùng
          URL.revokeObjectURL(videoURL);
  
          resolve(thumbnailURL);
        };
  
        video.onerror = (error) => {
          URL.revokeObjectURL(videoURL);
          reject(error);
        };
      };
    });
  };
  