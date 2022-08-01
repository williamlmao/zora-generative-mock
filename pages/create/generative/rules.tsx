import { NextSeo } from "next-seo";
import type { ReactElement } from "react";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  // If the previous page has not been completed, then redirect to the start of the flow.
  return (
    <div className="w-full">
      <NextSeo
        title="Generative Rules • ZORA Generative"
        description="Set your generative rules"
      />
      <h1 className="text-3xl font-medium">Rules</h1>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Rules">{page}</GenerativeLayout>;
};

export default Page;
