import { NextSeo } from "next-seo";
import Link from "next/link";
import { ReactElement, useContext, useEffect } from "react";
import { Button } from "react-daisyui";
import { TraitsBuilder } from "../../../components/traits/TraitsBuilder";
import { StepContext } from "../../../contexts/StepContext";
import { TraitsContextProvider } from "../../../contexts/TraitsContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  const { updateStepStatus } = useContext(StepContext);

  useEffect(() => {
    updateStepStatus(1, "available");
  }, []);

  return (
    <div className="w-full">
      <NextSeo
        title="Trait Upload • ZORA Generative"
        description="Add your traits"
      />
      <TraitsContextProvider>
        <TraitsBuilder />
      </TraitsContextProvider>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Trait Upload">{page}</GenerativeLayout>;
};

export default Page;
