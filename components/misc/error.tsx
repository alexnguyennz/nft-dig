import Image from "next/image";
export default function NoNFTs({ msg }: { msg: string }) {
  return (
    <div className={"flex flex-col gap-5"}>
      <h2 className="text-center text-3xl font-medium">{msg}</h2>
      <Image
        src="/img/sad-chocobo-sm.png"
        alt="sad chocobo"
        className="mx-auto"
        width={261}
        height={225}
        priority
      />
    </div>
  );
}
