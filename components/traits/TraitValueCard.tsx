import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "react-daisyui";
import { IoIosClose } from "react-icons/io";

type Trait = {
  value: string;
  weight: number;
};

export const TraitValueCard = ({
  trait,
  category,
  deleteTraitValue,
}: {
  trait: Trait;
  category: string;
  deleteTraitValue: (category: string, value: Trait) => void;
}) => {
  return (
    <motion.div
      className="m-2 bg-base-100 p-4 rounded-md text-center flex flex-col justify-between min-w-[150px] hover:cursor-pointer"
      key={trait.value}
      whileHover={{ scale: 1.08 }}
      whileTap={{ translateY: 15 }}
    >
      <motion.div
        whileHover={{ scale: 1.5 }}
        className="absolute top-2 right-2"
        onClick={() => {
          deleteTraitValue(category, trait);
        }}
      >
        <IoIosClose className="text-base" />
      </motion.div>

      <div>{trait.value}</div>
      <div>{trait.weight}</div>
      <Image src="/thumbnailplaceholder.png" height="100" width="100" />
    </motion.div>
  );
};
