import { NextSeo } from "next-seo";
import { useContext } from "react";
import { GeneratorContext } from "../../contexts/GeneratorContext";
import { Button, Range } from "react-daisyui";
import { ItemGrid } from "./ItemGrid";
import { useRouter } from "next/router";
import Link from "next/link";
import { StepContext } from "../../contexts/StepContext";

export const Generator = () => {
  const { items, collectionSize, setCollectionSize, generate } =
    useContext(GeneratorContext);
  const { updateStepStatus } = useContext(StepContext);
  const { push } = useRouter();
  return (
    <div className="w-full">
      <NextSeo
        title="Generate Collection • ZORA Generative"
        description="Generate your collection at last"
      />
      <div className="my-12">
        <div className="text-2xl mb-6">Select Collection Size</div>
        <Range
          min={0}
          max={500}
          value={collectionSize}
          onChange={(e) => {
            setCollectionSize(Number(e.target.value));
          }}
        />
        <div className="flex justify-between items-center mt-4">
          <div className="">0</div>
          <Link href="/create/generative/generate#collection">
            <Button
              className="normal-case"
              color="primary"
              onClick={() => {
                generate();
                updateStepStatus(3, "completed");
              }}
            >
              <div className="font-medium text-2xl">
                Generate <span className="font-bold">{collectionSize}</span>{" "}
                items
              </div>
            </Button>
          </Link>

          <div className="">500</div>
        </div>
      </div>
      <div className="" id="collection">
        <ItemGrid />
      </div>
    </div>
  );
};
