import { motion } from "framer-motion";
import Link from "next/link";
import type { Step } from "../../contexts/StepContext";
import { Zorb } from "../Zorb";

export const StepDisplay = ({
  step,
  active,
}: {
  step: Step;
  active: boolean;
}) => {
  const renderZorb = () => {
    if (step.status === "completed") {
      return (
        <motion.div>
          <Zorb color="darkgreen" />
        </motion.div>
      );
    }
    if (step.status === "inprogress") {
      return (
        <motion.div className="w-[30px] h-[30px]">
          <Zorb color="yellow" />
        </motion.div>
      );
    }
    return <div className="bg-base-200 rounded-full h-[30px] w-[30px]"></div>;
  };

  return (
    // "javascript:void(0)" disables the link
    <Link
      href={
        step.status === "completed" || step.status === "inprogress"
          ? step.path
          : "javascript:void(0)"
      }
    >
      <motion.div
        className={`p-2 m-2 sm:p-4 sm:m-4 flex flex-col items-center justify-center ${
          step.status === "completed" || step.status === "inprogress"
            ? "hover:cursor-pointer"
            : "hover:cursor-not-allowed"
        }`}
        whileHover={{ scale: 1.1 }}
      >
        {renderZorb()}
        <div
          className={`mt-2 pb-2 text-xs sm:text-base ${
            active ? "border-b-2" : ""
          }`}
        >
          {step.label}
        </div>
      </motion.div>
    </Link>
  );
};
