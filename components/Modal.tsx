import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "react-daisyui";
import { IoIosClose } from "react-icons/io";

export const Modal = ({
  modalVisible,
  setModalVisible,
  children,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  children: React.ReactNode;
}) => {
  const modalMotion = {
    initial: {
      opacity: 0,
      scale: 0.75,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeOut",
        duration: 0.24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      transition: {
        ease: "easeIn",
        duration: 0.15,
      },
    },
  };

  return (
    <AnimatePresence>
      {modalVisible && (
        <Dialog
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          as="div"
          className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto backdrop-blur-sm "
        >
          <motion.div
            variants={modalMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-base-200 p-12 relative rounded-xl flex flex-1 flex-col m-24"
          >
            <Dialog.Description className="text-xl sm:text-4xl text-center mb-4"></Dialog.Description>
            <div className="w-full h-full relative">{children}</div>
            <Button
              shape="circle"
              size="xs"
              className="absolute top-2 right-2"
              onClick={() => setModalVisible(false)}
            >
              <IoIosClose className="text-lg" />
            </Button>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
