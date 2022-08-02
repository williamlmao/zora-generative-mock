import Link from "next/link";
import { useContext } from "react";
import { Button } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { StepContext } from "../../contexts/StepContext";

export const CollectionDetailsForm = ({}: {}) => {
  const { updateStepStatus } = useContext(StepContext);
  const { register, handleSubmit } = useForm();
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        localStorage.setItem("collectionDetails", JSON.stringify(data));
      })}
      className="flex flex-col flex-col-reverse md:flex-row h-full gap-12 "
    >
      <div className="flex flex-col w-full md:w-1/2">
        <div className=" mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Name</div>
          <input
            {...(register("name"), { required: true, minLength: 3 })}
            placeholder="Zorbs"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Symbol</div>
          <input
            {...(register("symbol"), { required: true, maxLength: 4 })}
            placeholder="$ZRB"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">
            Description
          </div>
          <textarea
            {...(register("symbol"), { required: true })}
            placeholder="This is a project that means a lot to me. Soon, it can be yours too."
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <div className="font-medium text-secondary ml-2 mb-2">Royalty</div>
          <input
            type="number"
            {...(register("royalty"), { required: true })}
            placeholder="5%"
            className="bg-base-200 rounded-md p-2 w-full"
          />
        </div>
        <Link href="/create/generative/traits">
          <Button
            type="submit"
            color="primary"
            className="w-full normal-case"
            onClick={() => {
              updateStepStatus(0, "completed");
              updateStepStatus(1, "available");
            }}
          >
            Next Step
          </Button>
        </Link>
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
