import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import { RuleBuilder } from "../../../components/rules/RuleBuilder";
import { RulesContextProvider } from "../../../contexts/RulesContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <NextSeo
        title="Generative Rules • ZORA Generative"
        description="Set your generative rules"
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
