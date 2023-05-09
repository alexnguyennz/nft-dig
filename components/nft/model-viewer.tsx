import { useToast } from "@chakra-ui/react";
import { IconMaximize } from "@tabler/icons-react";
import Script from "next/script";

export default function ModelViewer({ src }: { src: string }) {
  const toast = useToast();
  function fullScreen() {
    const elem = document.querySelector("model-viewer");

    if (!document.fullscreenElement && elem) {
      elem.requestFullscreen().catch((err) => {
        toast({
          title: "Error attempting to enter fullscreen mode..",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <>
      <Script type="module" src="/js/model-viewer.min.js" />
      <div className="relative h-auto w-full">
        <model-viewer
          src={src}
          alt={"NFT 3D model"}
          camera-controls
          shadow-intensity="1"
        />
        <div className="absolute right-1 top-1">
          <button onClick={fullScreen}>
            <IconMaximize className={"h-8 w-8 transition hover:scale-110"} />
          </button>
        </div>
      </div>
    </>
  );
}
