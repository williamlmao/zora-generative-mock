import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import { Stepper } from "../components/Stepper";
import { StepContext } from "../contexts/StepContext";
import { PrimaryLayout } from "./PrimaryLayout";

type Props = {
  title: string;
  children: React.ReactNode;
};

const pageTransitionMotion = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const GenerativeLayout: FC<Props> = ({ title, children }) => {
  const router = useRouter();
  const { reset } = useContext(StepContext);
  return (
    <PrimaryLayout>
      <div className="flex flex-col w-full relative">
        <Stepper />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="w-full p-4 sm:p-8"
            variants={pageTransitionMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            key={router.pathname}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-medium mb-4">{title}</h1>
              <button
                onClick={() => {
                  reset();
                }}
                className="hover:underline absolute top-4 right-4"
              >
                Reset All
              </button>
            </div>

            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </PrimaryLayout>
  );
};
