import { useContext } from "react";
import { Button } from "react-daisyui";
import { useForm } from "react-hook-form";
import { TraitsContext } from "../../contexts/TraitsContext";
import { Modal } from "../Modal";

export const TraitCategoryModal = ({
  modalVisible,
  setModalVisible,
  editCategory,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  editCategory?: string;
}) => {
  const { register, getValues } = useForm({
    defaultValues: { category: editCategory },
  });
  const { handleNewCategory, renameCategory, deleteCategory } =
    useContext(TraitsContext);
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <form className="flex flex-col">
        <div className=" mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">
            {editCategory ? `Rename ${editCategory}` : "Category Name"}
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
          {editCategory ? (
            <Button
              type="button"
              onClick={() => {
                deleteCategory(editCategory);
                setModalVisible(false);
              }}
              color="secondary"
            >
              Delete
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={() => {
              if (editCategory) {
                renameCategory(editCategory, getValues("category") || "");
              } else {
                handleNewCategory(getValues("category") || "");
              }
              setModalVisible(false);
            }}
          >
            {editCategory ? `Save` : "Add Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
