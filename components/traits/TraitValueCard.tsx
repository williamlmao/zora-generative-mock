import Image from "next/image";
import { motion } from "framer-motion";
import { Tooltip } from "react-daisyui";
import { IoIosClose, IoIosStats } from "react-icons/io";
import type { Trait } from "./traits.types";
import { useContext, useState } from "react";
import { TraitValueModal } from "./TraitValueModal";
import { TraitsContext } from "../../contexts/TraitsContext";

export const TraitValueCard = ({
  trait,
  category,
}: {
  trait: Trait;
  category: string;
}) => {
  const { handleNewTraitValue, deleteTraitValue } = useContext(TraitsContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TraitValueModal
        title={`Edit ${trait.value}`}
        category={category}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleNewTraitValue={handleNewTraitValue}
        trait={trait}
      />
      <motion.div
        className="m-2 bg-base-300 p-4 rounded-md text-center flex flex-col justify-between min-w-[150px] hover:cursor-pointer items-center"
        key={trait.value}
        whileHover={{ scale: 1.08 }}
        whileTap={{ translateY: 15 }}
        onClick={() => setModalVisible(true)}
      >
        <motion.div
          whileHover={{ scale: 1.5 }}
          className="absolute top-2 right-2"
          onClick={() => {
            deleteTraitValue(category, trait);
          }}
        >
          <IoIosClose className="text-base border-2 rounded-full" />
        </motion.div>
        <div className="text-lg font-medium">{trait.value}</div>
        <Tooltip
          position="bottom"
          message="Weight of the trait. The higher the number, the more times this trait will occur."
        >
          <div className="flex gap-1 items-center justify-center mb-1">
            <IoIosStats /> {trait.weight}
          </div>
        </Tooltip>

        <Image
          src="/thumbnailplaceholder.png"
          layout="fixed"
          height="100"
          width="100"
          alt="placeholder"
        />
      </motion.div>
    </>
  );
};
