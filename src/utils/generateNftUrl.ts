import { Resize } from "@cloudinary/url-gen/actions/resize";
import {
  cloudinary,
  generateImageKitImage,
  generateCloudinaryGifVideo,
} from "./image-providers";

const CLOUDINARY_LIMIT = 10000000;
const IMAGEKIT_LIMIT = 40000000;

/**
 * Generate client-ready transformed images/video links using Cloudinary/ImageKit
 * If the images or videos are below defined limits,
 * @param image NFT's image URL
 * @param contentType
 * @param contentLength
 * @param size height and width to apply to image transformations via Cloudinary/ImageKit
 * @param fullSize set to larger size for processing GIFs on main NFT page
 */
export default function generateNftUrl(
  image: string,
  contentType: string,
  contentLength: number,
  size = "750",
  fullSize = false
) {
  if (contentType === "image/gif") {
    if (Number(contentLength) < CLOUDINARY_LIMIT && !fullSize) {
      image = generateCloudinaryGifVideo(image, size);

      contentType = "video/mp4"; // Cloudinary outputs GIFs as video/mp4
    } else if (Number(contentLength) < IMAGEKIT_LIMIT) {
      image = generateImageKitImage(image, size);

      contentType = "image/gif";
    }
    // only process videos below 10MB otherwise show them directly
  } else if (contentType === "video/mp4" || contentType === "video/webm") {
    if (Number(contentLength) < CLOUDINARY_LIMIT) {
      const stripped = image.replace(/^.*:\/\//i, "");

      const cloudinaryImage = cloudinary.video(
        `remote_https_media/${stripped}`
      );
      cloudinaryImage.resize(Resize.fit().width(size));

      image = cloudinaryImage.toURL();

      /*
      Alternative method - slower as the video needs to be refetched
      const cloudinaryVideo = cloudinary
        .video(image)
        .setDeliveryType("fetch")
        .resize(fill(size));

      image = cloudinaryVideo.toURL();
      */
    }
  } else if (
    contentType !== "model/gltf-binary" &&
    contentType !== "text/html"
  ) {
    if (Number(contentLength) < IMAGEKIT_LIMIT) {
      image = generateImageKitImage(image, size);
    }
  }

  return {
    image,
    contentType,
  };
}
