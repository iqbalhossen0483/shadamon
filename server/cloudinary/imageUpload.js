import cloudinary from "./cloudinary.confiq";

export async function imageUpload(image, folder, height, width) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: folder,
      use_filename: true,
      transformation: [{ height: height, width: width }],
    });
    return { error: null, result };
  } catch (err) {
    return {
      error: err.message || "An error occured when uploading image",
      result: undefined,
    };
  }
}
