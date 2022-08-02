import { NextSeo } from "next-seo";
import { ReactElement, useContext, useEffect } from "react";
import { Button, Steps } from "react-daisyui";
import { useForm } from "react-hook-form";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import { useDropzone } from "react-dropzone";
import type { NextPageWithLayout } from "../../_app";
import Link from "next/link";
import { StepContext } from "../../../contexts/StepContext";
import { CollectionDetailsForm } from "../../../components/collectiondetails/CollectionDetailsForm";

const Page: NextPageWithLayout = () => {
  const { updateStepStatus } = useContext(StepContext);

  useEffect(() => {
    updateStepStatus(0, "available");
  }, []);

  return (
    <div className="w-full">
      <NextSeo
        title="Collection Details • ZORA Generative"
        description="Enter your generative collection details."
      />
      <CollectionDetailsForm />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Collection Details">{page}</GenerativeLayout>;
};

export default Page;
