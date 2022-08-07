import { NextSeo } from "next-seo";
import { ReactElement, useContext } from "react";
import { RuleBuilder } from "../../../components/rules/RuleBuilder";
import { RulesContextProvider } from "../../../contexts/RulesContext";
import { StepContext } from "../../../contexts/StepContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  // If the previous page has not been completed, then redirect to the start of the flow.
  return (
    <div className="w-full">
      <NextSeo
        title="Generate Collection • ZORA Generative"
        description="Generate your collection at last"
      />
      <RulesContextProvider>
        <RuleBuilder />
      </RulesContextProvider>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Rule Builder">{page}</GenerativeLayout>;
};

export default Page;
