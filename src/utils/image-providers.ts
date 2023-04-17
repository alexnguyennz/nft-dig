import ImageKit from "imagekit-javascript";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { defaultImage } from "@cloudinary/transformation-builder-sdk/actions/delivery";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_API_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_API_URL!,
});

const DEFAULT_IMAGEKIT_IMG = "no-image.png";
export function generateImageKitImage(image: string, size: string) {
  return imagekit.url({
    src: `${process.env.NEXT_PUBLIC_IMAGEKIT_API_URL}/${image}`,
    transformation: [
      {
        width: size,
        defaultImage: DEFAULT_IMAGEKIT_IMG,
      },
    ],
  });
}

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY,
  },
  url: {
    secure: true,
  },
});

export function generateCloudinaryGifVideo(image: string, size: string) {
  const cloudinaryImage = cloudinary
    .image(image)
    .setDeliveryType("fetch")
    .resize(fill(size))
    .format("mp4")
    .delivery(defaultImage("no-video_yz9wbr.png"));
  return cloudinaryImage.toURL();
}
