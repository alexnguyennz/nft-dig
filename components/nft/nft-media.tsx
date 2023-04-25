import { useEffect, useState } from "react";
import NextLink from "next/link";

import { useColorModeValue, Image, Link } from "@chakra-ui/react";
import { IconExternalLink, IconPdf, IconVideo } from "@tabler/icons-react";

import LoadingSpinner from "@/components/misc/loading-spinner";

import generateNftUrl from "@/src/utils/generateNftUrl";
import ModelViewer from "./model-viewer";
import { type NFT } from "@/src/types";

import parse from "html-react-parser";

interface NFTImageProps {
  nft: NFT;
  chain: string;
  size?: string;
  fullSize?: boolean;
}

export default function NftMedia({
  nft,
  chain,
  size,
  fullSize,
}: NFTImageProps) {
  const [image, setImage] = useState("");
  const [nftContentType, setNftContentType] = useState("");

  const audioBg = useColorModeValue("audio", "audio-dark");

  useEffect(() => {
    if (nft.appMetadata?.image) {
      // display base64 images directly
      if (nft.appMetadata.image.startsWith("data:image")) {
        setImage(nft.appMetadata.image);
      } else {
        try {
          const { image, contentType } = generateNftUrl(
            nft.appMetadata.image,
            nft.appMetadata.content_type,
            nft.appMetadata.content_length,
            size,
            fullSize
          );

          setImage(image);
          setNftContentType(contentType);
        } catch (err) {
          console.log("Error occurred generating URL", err);
        }
      }
    }
  }, [nft, size, fullSize]);

  if (!nft.appMetadata?.image) {
    return (
      <NextLink href={`/${chain}/${nft.token_address}/${nft.token_id}`}>
        <Image
          src={"/img/no-image-card.png"}
          alt={"No image found"}
          width={"250"}
          height={"250"}
          className={"mx-auto"}
        />
      </NextLink>
    );
  }

  switch (nftContentType) {
    case "video/mp4":
    case "video/webm":
      return (
        <video width="100%" controls muted loop>
          <source src={`${image}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );

    case "video/quicktime":
      return (
        <Link
          href={nft.appMetadata.image}
          isExternal
          className={"pdf flex items-center justify-center"}
        >
          <IconVideo className={"h-40 w-40"} />
          <IconExternalLink />
        </Link>
      );
    case "model/gltf-binary":
      return <ModelViewer src={image} />;
    case "audio/mp3":
    case "audio/wave":
    case "audio/wav":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/webm":
      return (
        <audio
          className={`audio-control-panel w-full ${audioBg}`}
          src={image}
          controls
        />
      );
    case "text/html":
      return (
        <iframe
          src={nft.appMetadata.animation_url || nft.appMetadata.image}
        ></iframe>
      );
    case "svg":
      return (
        <div className={"nft-svg-html"}>{parse(nft.appMetadata.image)}</div>
      );
    case "application/pdf":
      return (
        <Link
          href={nft.appMetadata.image}
          isExternal
          className={"pdf flex items-center justify-center"}
        >
          <IconPdf className={"h-40 w-40"} />
          <IconExternalLink />
        </Link>
      );
    default:
      return (
        <NextLink href={`/${chain}/${nft.token_address}/${nft.token_id}`}>
          <Image
            src={image}
            alt={nft.appMetadata.image}
            fallback={<LoadingSpinner />}
            fallbackSrc={"/img/no-image-card.png"}
            className="mx-auto w-full cursor-pointer"
          />
        </NextLink>
      );
  }
}
