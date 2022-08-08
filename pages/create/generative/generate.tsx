import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import { Generator } from "../../../components/generate/Generator";
import { GeneratorContextProvider } from "../../../contexts/GeneratorContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <NextSeo
        title="Generate Collection • ZORA Generative"
        description="Generate your collection at last"
      />
      <GeneratorContextProvider>
        <Generator />
      </GeneratorContextProvider>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Generator">{page}</GenerativeLayout>;
};

export default Page;
