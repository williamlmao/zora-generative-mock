import { useContext } from "react";
import { Button } from "react-daisyui";
import { useForm } from "react-hook-form";
import { TraitsContext } from "../../contexts/TraitsContext";
import { Modal } from "../Modal";

export const TraitCategoryModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const { register, getValues } = useForm();
  const { handleNewCategory } = useContext(TraitsContext);
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <form className="flex flex-col">
        <div className=" mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">
            Category Name
          </div>
          <input
            {...register("category")}
            placeholder="Clothing"
            className="bg-base-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="self-end flex gap-4">
          <Button
            type="button"
            onClick={() => {
              setModalVisible(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              handleNewCategory(getValues("category"));
              setModalVisible(false);
            }}
          >
            Add Category
          </Button>
        </div>
      </form>
    </Modal>
  );
};
