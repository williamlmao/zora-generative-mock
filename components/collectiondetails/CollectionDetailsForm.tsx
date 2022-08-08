import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { StepContext } from "../../contexts/StepContext";
import { CustomConnectButton } from "../CustomConnectButton";
import { PageControls } from "../PageControls";

export const CollectionDetailsForm = ({}: {}) => {
  const { steps, stepIndex, updateStepStatus } = useContext(StepContext);
  const router = useRouter();
  const { address } = useAccount();
  const [showConnectWallet, setShowConnectWallet] = useState(!address);

  const { register, handleSubmit, setValue } = useForm();
  const { getRootProps, getInputProps } = useDropzone();

  const onSubmit = (data: any) => {
    console.log("on submit running", data);
    updateStepStatus(0, "completed");
    localStorage.setItem("collectionDetails", JSON.stringify(data));
    router.push(steps[stepIndex + 1].path);
  };

  useEffect(() => {
    const storedDetails = JSON.parse(
      localStorage.getItem("collectionDetails") || "{}"
    );
    if (address) {
      setShowConnectWallet(true);
    }
    if (storedDetails) {
      setValue("name", storedDetails.name);
      setValue("description", storedDetails.description);
      setValue("symbol", storedDetails.symbol);
      setValue("royalty", storedDetails.royalty);
    }
  }, [steps]);

  return (
    <form
      className="flex flex-col flex-col-reverse md:flex-row h-full gap-12 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full md:w-1/2">
        <div className=" mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Name</div>
          <input
            {...register("name")}
            placeholder="Zorbs"
            className="bg-base-200 rounded-md p-2 w-full"
            autoComplete="off"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Symbol</div>
          <input
            {...register("symbol")}
            placeholder="$ZRB"
            className="bg-base-200 rounded-md p-2 w-full"
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Royalty</div>
          <input
            type="number"
            {...register("royalty")}
            placeholder="5%"
            className="bg-base-200 rounded-md p-2 w-full"
            autoComplete="off"
          />
        </div>
        <div className={`${address ? "block" : "hidden"}`}>
          <PageControls nextDisabled={false} />
        </div>
        <div className={`${address ? "hidden" : "block"}`}>
          <CustomConnectButton />
        </div>

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
          <p className="font-semibold">Drag and drop your cover artwork</p>
          <p className="text-sm text-gray-400">
            This demo does not actually handle files. This dropzone is a lie.
          </p>
        </div>
      </section>
    </form>
  );
};
