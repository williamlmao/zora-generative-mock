import { NextSeo } from "next-seo";
import { ReactElement, useContext, useEffect } from "react";
import { CollectionDetailsForm } from "../../../components/collectiondetails/CollectionDetailsForm";
import { StepContext } from "../../../contexts/StepContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  const { updateStepStatus } = useContext(StepContext);

  useEffect(() => {
    const collectionDetails = JSON.parse(
      localStorage.getItem("collectionDetails") || "{}"
    );

    const collectionDetailsInProgress =
      Object.values(collectionDetails).some((value) => value === "") ||
      Object.values(collectionDetails).length === 0;
    if (collectionDetailsInProgress) {
      updateStepStatus(0, "inprogress");
    } else {
      updateStepStatus(0, "completed");
    }
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
