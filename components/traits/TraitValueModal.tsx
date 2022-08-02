import { Button } from "react-daisyui";
import { useDropzone } from "react-dropzone";
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
  setModalVisible: Function;
  category: string;
  handleNewTraitValue: (category: string, trait: Trait) => void;
  trait?: Trait;
}) => {
  const { register, getValues } = useForm({
    defaultValues: { value: trait?.value, weight: trait?.weight },
  });
  const { getRootProps, getInputProps } = useDropzone();
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
        <section className="w-full">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="w-full h-full p-12 border-4 border-dashed bg-base-100 text-center flex flex-col items-center justify-center"
          >
            <input {...getInputProps()} />
            <p className="font-semibold">Drag and drop your artwork</p>
            <p className="text-sm text-gray-400">Image/Audio/Video supported</p>
          </div>
        </section>
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
            onClick={(e) => {
              e.stopPropagation();
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
