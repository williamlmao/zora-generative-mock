import Link from "next/link";
import { Zorb } from "../Zorb";
import { motion } from "framer-motion";
import { useContext } from "react";
import { StepContext } from "../../contexts/StepContext";
import { useRouter } from "next/router";
export const Step = ({
  path,
  label,
  complete,
  canVisit,
  active,
}: {
  path: string;
  label: string;
  complete: boolean;
  canVisit: boolean;
  active: boolean;
}) => {
  if (canVisit) {
    return (
      <Link href={path}>
        <motion.div
          className="p-2 m-2 sm:p-4 sm:m-4 flex flex-col items-center justify-center hover:cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          {complete ? (
            <Zorb /> // TODO: Replace with different colored Zorbs
          ) : (
            <div className="bg-base-200 rounded-full h-[30px] w-[30px]"></div>
          )}
          <div
            className={`mt-2 pb-2 text-xs sm:text-base ${
              active ? "border-b-2" : ""
            }`}
          >
            {label}
          </div>
        </motion.div>
      </Link>
    );
  }

  // Returns unclickable grey step
  return (
    <div className="p-2 m-2 sm:p-4 sm:m-4 flex flex-col items-center justify-center hover:cursor-not-allowed">
      <div className="bg-base-200 rounded-full h-[30px] w-[30px]"></div>
      <div
        className={`mt-2 pb-2 text-xs sm:text-base break-words ${
          active ? "border-b-2" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
};
