import { NextSeo } from "next-seo";
import { ReactElement, useContext } from "react";
import { Button, Steps } from "react-daisyui";
import { useForm } from "react-hook-form";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import { useDropzone } from "react-dropzone";
import type { NextPageWithLayout } from "../../_app";
import Link from "next/link";
import { StepContext } from "../../../contexts/StepContext";

type File = {
  path: string;
  size: number;
};

const Page: NextPageWithLayout = () => {
  const { lastCompletedStep, setLastCompletedStep } = useContext(StepContext);
  const { register, handleSubmit } = useForm();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <div className="w-full">
      <NextSeo
        title="Collection Details • ZORA Generative"
        description="Enter your generative collection details."
      />

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
                if (lastCompletedStep < 0) {
                  setLastCompletedStep(0);
                }
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
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Collection Details">{page}</GenerativeLayout>;
};

export default Page;
