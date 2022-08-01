import { Button } from "react-daisyui";
import Image from "next/image";
import { Modal } from "../Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TraitValueCard } from "./TraitValueCard";
import { TraitValueModal } from "./TraitValueModal";

type Trait = {
  value: string;
  weight: number;
};

export const TraitCategoryTable = ({
  category,
  traits,
  handleNewTraitValue,
  deleteTraitValue,
}: {
  category: string;
  traits: Trait[];
  handleNewTraitValue: (category: string, value: Trait) => void;
  deleteTraitValue: (category: string, value: Trait) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { register, getValues } = useForm();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-semibold">
          {category} ({traits.length})
        </div>
        <Button size="sm" onClick={() => setModalVisible(true)}>
          +
        </Button>
      </div>
      <TraitValueModal
        category={category}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleNewTraitValue={handleNewTraitValue}
      />
      <div className="bg-base-200 p-4 rounded-md flex flex-wrap">
        {traits.map((trait) => {
          return (
            <TraitValueCard
              trait={trait}
              key={trait.value}
              category={category}
              deleteTraitValue={deleteTraitValue}
            />
          );
        })}
      </div>
    </div>
  );
};
