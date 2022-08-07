import Link from "next/link";
import { useContext, useState } from "react";
import { Button, Tooltip } from "react-daisyui";
import { IoIosInformation } from "react-icons/io";
import { StepContext } from "../../contexts/StepContext";
import { TraitsContext } from "../../contexts/TraitsContext";
import mockTraitData from "../../mockdata/alan-ki-aankhen-traits.json";
import { PageControls } from "../PageControls";
import { TraitCategoryModal } from "./TraitCategoryModal";
import { TraitCategorySection } from "./TraitCategorySection";

export const TraitsBuilder = () => {
  const { updateStepStatus } = useContext(StepContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { setTraitData, traitData } = useContext(TraitsContext);
  return (
    <div>
      <div className="flex gap-4 justify-end items-center">
        <Tooltip message="The chance of occurrence of an item is its rarity weight divided by the total rarity weight (sum of all the individual weights within a category) times 100.">
          <IoIosInformation className="text-4xl text-gray-400 rounded-full border-2" />
        </Tooltip>
        <Button
          onClick={() => {
            setTraitData(mockTraitData.traits);
          }}
        >
          Bulk Upload
        </Button>
        <Button onClick={() => setModalVisible(true)}>New Category</Button>
      </div>
      <TraitCategoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {Object.keys(traitData).length > 0 ? (
        <div>
          {Object.keys(traitData).map((category: any) => {
            return (
              <div key={category}>
                <TraitCategorySection
                  category={category}
                  traits={traitData[category]}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-base-200 h-[300px] flex items-center justify-center rounded-md my-12">
          Add some traits!
        </div>
      )}
      <div className="flex gap-4">
        <PageControls nextDisabled={Object.keys(traitData).length === 0} />
      </div>
    </div>
  );
};
