import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { StepContext } from "../../contexts/StepContext";
import { CustomConnectButton } from "../CustomConnectButton";

export const CollectionDetailsForm = ({}: {}) => {
  const { updateStepStatus } = useContext(StepContext);
  const { address } = useAccount();
  const [collectionDetails, setCollectionDetails] = useState({});
  useEffect(() => {
    setCollectionDetails(
      JSON.parse(localStorage.getItem("collectionDetails") || "{}")
    );
  }, []);
  const { register, getValues } = useForm({
    defaultValues: {
      name: collectionDetails?.name,
      description: collectionDetails?.description,
      royalty: collectionDetails?.royalty,
      symbol: collectionDetails?.symbol,
    },
  });
  const { getRootProps, getInputProps } = useDropzone();
  console.log("collectionDetails", collectionDetails);
  return (
    <form className="flex flex-col flex-col-reverse md:flex-row h-full gap-12 ">
      <div className="flex flex-col w-full md:w-1/2">
        <div className=" mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Name</div>
          <input
            {...register("name")}
            onChange={() => {
              setCollectionDetails({
                ...collectionDetails,
                name: getValues("name"),
              });
            }}
            value={collectionDetails.name}
            placeholder="Zorbs"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Symbol</div>
          <input
            {...register("symbol")}
            placeholder="$ZRB"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">
            Description
          </div>
          <textarea
            {...register("description")}
            placeholder="This is a project that means a lot to me. Soon, it can be yours too."
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Royalty</div>
          <input
            type="number"
            {...register("royalty")}
            placeholder="5%"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        {address ? (
          <Link href="/create/generative/traits">
            <Button
              type="submit"
              color="primary"
              className="w-full normal-case"
              onClick={() => {
                updateStepStatus(0, "completed");
                updateStepStatus(1, "available");
                localStorage.setItem(
                  "collectionDetails",
                  JSON.stringify(getValues())
                );
              }}
            >
              Next Step
            </Button>
          </Link>
        ) : (
          <Link href="/create/generative/traits">
            <Button
              type="submit"
              color="primary"
              className="w-full normal-case"
              onClick={() => {
                updateStepStatus(0, "completed");
                updateStepStatus(1, "available");
                localStorage.setItem(
                  "collectionDetails",
                  JSON.stringify(getValues())
                );
              }}
            >
              Next Step
            </Button>
          </Link>
          // <CustomConnectButton />
        )}

        <p className="text-xs text-gray-500 text-center my-4">
          5% of all primary sales go to zora.eth.
        </p>
      </div>

      <section className="w-full md:w-1/2">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="w-full h-full p-12 border-4 border-dashed bg-base-100 text-center flex flex-col items-center justify-center"
        >
          <input {...getInputProps()} />
          <p className="font-semibold">Drag and drop your artwork</p>
          <p className="text-sm text-gray-400">Image/Audio/Video supported</p>
        </div>
      </section>
    </form>
  );
};
