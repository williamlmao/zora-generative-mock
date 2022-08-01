import Image from "next/image";

type Trait = {
  value: string;
  weight: number;
};

export const TraitValueCard = ({ trait }: { trait: Trait }) => {
  return (
    <div
      className="m-2 bg-base-100 p-4 rounded-md text-center flex flex-col justify-between min-w-[150px]"
      key={trait.value}
    >
      <div>{trait.value}</div>
      <div>{trait.weight}</div>
      <Image src="/thumbnailplaceholder.png" height="100" width="100" />
    </div>
  );
};
