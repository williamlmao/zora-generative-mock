import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { GeneratorContext, Item } from "../../contexts/GeneratorContext";
export const ItemCard = ({ item, index }: { item: Item; index: number }) => {
  const { deleteItem } = useContext(GeneratorContext);
  const [hideItem, setHideItem] = useState(false);
  return (
    <AnimatePresence>
      {!hideItem && (
        <motion.div
          className="flex flex-col items-center justify-center p-2 bg-base-200 rounded-md w-full min-w-[300px] h-full hover:cursor-pointer group relative"
          onClick={() => {
            setHideItem(true);
            //delay 0.5s
            setTimeout(() => {
              deleteItem(index);
            }, 230);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 0.96 }}
        >
          <div className="hidden group-hover:block absolute top-2 right-2">
            <BsTrash className="text-secondary text-lg" />
          </div>
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
      )}
    </AnimatePresence>
  );
};
