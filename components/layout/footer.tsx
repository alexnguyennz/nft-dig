import { Link, Tooltip } from "@chakra-ui/react";
import { IconBrandTwitterFilled } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className={"mt-16 flex justify-center"}>
      <Tooltip label="Twitter" openDelay={750} placement={"top"} hasArrow>
        <Link
          href={"https://twitter.com/nftdigapp"}
          isExternal
          aria-label={"Twitter page"}
        >
          <IconBrandTwitterFilled
            className={
              "twitter inline h-8 w-8 opacity-80 transition hover:opacity-100"
            }
          />
        </Link>
      </Tooltip>
    </div>
  );
}
