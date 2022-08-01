import { NextSeo } from "next-seo";
import { ReactElement, useContext, useState } from "react";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import { Button } from "react-daisyui";
import Link from "next/link";
import type { NextPageWithLayout } from "../../_app";
import { StepContext } from "../../../contexts/StepContext";
import mockTraitData from "../../../mockdata/alan-ki-aankhen-traits.json";
import { TraitCategoryTable } from "../../../components/traits/TraitCategoryTable";
import { Modal } from "../../../components/Modal";
import { useForm } from "react-hook-form";

export interface Trait {
  value: string;
  weight: number;
}

interface TraitDataInterface {
  [key: string]: Trait[];
}

const Page: NextPageWithLayout = () => {
  const { setLastCompletedStep } = useContext(StepContext);
  const [traitData, setTraitData] = useState<TraitDataInterface>({});
  const { register, getValues } = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewCategory = (category: string) => {
    setTraitData((prevState) => {
      return {
        ...prevState,
        [category]: [],
      };
    });
  };

  const handleNewTraitValue = (category: string, value: Trait) => {
    setTraitData((prevState) => {
      return {
        ...prevState,
        [category]: [...prevState[category], value],
      };
    });
  };

  return (
    <div className="w-full">
      <NextSeo
        title="Trait Upload • ZORA Generative"
        description="Add your traits"
      />
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => {
            setTraitData(mockTraitData.traits);
          }}
        >
          Bulk Upload
        </Button>
        <Button onClick={() => setModalVisible(true)}>New Category</Button>
      </div>
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
      {Object.keys(traitData).map((category: any) => {
        return (
          <div key={category}>
            <TraitCategoryTable
              category={category}
              traits={traitData[category]}
              handleNewTraitValue={handleNewTraitValue}
            />
          </div>
        );
      })}
      <Link href="/create/generative/rules">
        <Button
          type="submit"
          onClick={() => {
            setLastCompletedStep(1);
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Trait Upload">{page}</GenerativeLayout>;
};

export default Page;
