import { Button } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal";
import type { Trait } from "./traits.types";

export const TraitValueModal = ({
  title,
  modalVisible,
  setModalVisible,
  category,
  handleNewTraitValue,
  trait,
}: {
  title: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  category: string;
  handleNewTraitValue: (category: string, trait: Trait) => void;
  trait?: Trait;
}) => {
  const { register, getValues } = useForm({
    defaultValues: { value: trait?.value, weight: trait?.weight },
  });

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <form className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="">
          <div className="font-medium text-secondary ml-2 mb-2">
            Trait Value
          </div>
          <input
            {...register("value")}
            value={trait?.value}
            placeholder="Opal Wave Texture"
            className="bg-base-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="">
          <div className="font-medium text-secondary ml-2 mb-2">Weight</div>
          <input
            {...register("weight")}
            placeholder="1.2"
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
              handleNewTraitValue(category, getValues() as Trait);
              setModalVisible(false);
            }}
          >
            Add Trait
          </Button>
        </div>
      </form>
    </Modal>
  );
};
