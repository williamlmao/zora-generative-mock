import { useContext, useState } from "react";
import { Button } from "react-daisyui";
import { TraitsContext } from "../../contexts/TraitsContext";
import type { Trait } from "./traits.types";
import { TraitValueCard } from "./TraitValueCard";
import { TraitValueModal } from "./TraitValueModal";

export const TraitCategorySection = ({
  category,
  traits,
}: {
  category: string;
  traits: Trait[];
}) => {
  const { handleNewTraitValue, deleteTraitValue } = useContext(TraitsContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="my-6 ">
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
        title={`Add new ${category}`}
      />
      <div className="bg-base-200 p-4 rounded-md flex flex-wrap max-h-[600px] overflow-y-auto">
        {traits.map((trait) => {
          return (
            <TraitValueCard
              trait={trait}
              key={trait.value}
              category={category}
              deleteTraitValue={deleteTraitValue}
              handleNewTraitValue={handleNewTraitValue} //todo: Add a traits provider and stop propdrilling
            />
          );
        })}
      </div>
    </div>
  );
};
