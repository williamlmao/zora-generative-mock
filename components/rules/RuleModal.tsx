import { Button } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal";
import type { Trait } from "./traits.types";

export const TraitValueModal = ({}: {}) => {
  const { register, getValues } = useForm({
    defaultValues: { value: trait?.value, weight: trait?.weight },
  });
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <form className="flex flex-col gap-4">
        <Select>
          <option value="Background">Background</option>
          <option value="test">Test</option>
          <option value="test">Test</option>
        </Select>
        <Select>
          <option value="Red">Red</option>
          <option value="test">Test</option>
          <option value="test">Test</option>
        </Select>
        <Select>
          <option value="Only occurs with">Only occurs with</option>
          <option value="Does not occur with">Does not occur with</option>
        </Select>
      </form>
    </Modal>
  );
};
