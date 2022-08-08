import { useContext, useState } from "react";
import { Button } from "react-daisyui";
import { TraitsContext } from "../../contexts/TraitsContext";
import type { Trait } from "./traits.types";
import { TraitValueCard } from "./TraitValueCard";
import { TraitValueModal } from "./TraitValueModal";
import { MdModeEdit } from "react-icons/md";
import { TraitCategoryModal } from "./TraitCategoryModal";

export const TraitCategorySection = ({
  category,
  traits,
}: {
  category: string;
  traits: Trait[];
}) => {
  const { handleNewTraitValue, deleteTraitValue } = useContext(TraitsContext);
  const [traitModalVisible, setTraitModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  return (
    <div className="my-6 ">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-semibold flex gap-2 items-center">
          {category} ({traits.length})
          <MdModeEdit
            className="text-gray-400 hover:text-primary cursor-pointer"
            onClick={() => {
              setCategoryModalVisible(true);
            }}
          />
        </div>
        <Button size="sm" onClick={() => setTraitModalVisible(true)}>
          +
        </Button>
      </div>
      <TraitValueModal
        category={category}
        modalVisible={traitModalVisible}
        setModalVisible={setTraitModalVisible}
        handleNewTraitValue={handleNewTraitValue}
        title={`Add new ${category}`}
      />
      <TraitCategoryModal
        modalVisible={categoryModalVisible}
        setModalVisible={setCategoryModalVisible}
        editCategory={category}
      />
      <div className="border-2 p-4 rounded-md flex flex-wrap max-h-[600px] overflow-y-auto">
        {traits.map((trait) => {
          return (
            <TraitValueCard
              trait={trait}
              key={trait.value}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
};
