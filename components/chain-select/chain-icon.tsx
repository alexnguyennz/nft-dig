import Image from "next/image";

export function ChainIcon({ value, label }: { value: string; label?: string }) {
  return (
    <div className="flex justify-center gap-2">
      <Image
        src={`/icons/${value}.${
          value !== "arbitrum" && value !== "palm" ? "svg" : "png"
        }`}
        alt={`current chain icon`}
        width={0}
        height={0}
        style={{ width: "24px", height: "24px" }}
      />
      <span>{label}</span>
    </div>
  );
}
