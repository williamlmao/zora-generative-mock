import { GeneratorContext, Item } from "../../contexts/GeneratorContext";
import Image from "next/image";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
export const ItemCard = ({ item, index }: { item: Item; index: number }) => {
  const { deleteItem } = useContext(GeneratorContext);

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center justify-center p-2 bg-base-200 rounded-md w-[300px] h-full"
        onClick={() => {
          deleteItem(index);
        }}
        whileHover={{ scale: 1.0 }}
        whileTap={{ height: 0, opacity: 0 }}
      >
        <div className="font-bold text-secondary">{item.id}</div>

        <Image
          src="/thumbnailplaceholder.png"
          layout="fixed"
          height="200"
          width="200"
          alt="placeholder"
        />
        <div className="h-1/2 font-medium mt-2 divide-y-2">
          {Object.entries(item.traits).map((trait, index) => {
            return (
              <div key={index + trait[0]}>
                {trait[0]}: {trait[1]}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
