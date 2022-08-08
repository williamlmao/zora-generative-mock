import { motion } from "framer-motion";
import { useContext } from "react";
import { Button, Tooltip } from "react-daisyui";
import { FaRegSave } from "react-icons/fa";
import { GeneratorContext } from "../../contexts/GeneratorContext";
import { ItemCard } from "./ItemCard";

export const ItemGrid = () => {
  const { items } = useContext(GeneratorContext);
  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const card = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };
  if (items.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-medium mb-4">
          Your Collection ({items.length})
        </div>
        <div className="flex gap-2">
          <Tooltip message="This button doesn't do anything.">
            <Button className="normal-case" color="secondary" size="sm">
              +
            </Button>
          </Tooltip>
          <Tooltip message="This button doesn't do anything.">
            <Button className="normal-case" color="primary" size="sm">
              <FaRegSave />
            </Button>
          </Tooltip>
        </div>
      </div>
      <motion.div
        className="flex items-stretch flex-wrap gap-6"
        variants={staggerChildren}
        initial="hidden"
        animate="show"
      >
        {items.map((item, index) => {
          return (
            <motion.div variants={card} key={item.id} className="flex-1">
              <ItemCard item={item} index={index} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
