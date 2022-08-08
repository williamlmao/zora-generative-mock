import { NextSeo } from "next-seo";
import { ReactElement, useContext, useEffect } from "react";
import { TraitsBuilder } from "../../../components/traits/TraitsBuilder";
import { StepContext } from "../../../contexts/StepContext";
import { TraitsContextProvider } from "../../../contexts/TraitsContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
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
