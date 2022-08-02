import { NextSeo } from "next-seo";
import Link from "next/link";
import { ReactElement, useContext } from "react";
import { Button } from "react-daisyui";
import { TraitsBuilder } from "../../../components/traits/TraitsBuilder";
import { StepContext } from "../../../contexts/StepContext";
import { TraitsContextProvider } from "../../../contexts/TraitsContext";
import { GenerativeLayout } from "../../../layouts/GenerativeLayout";
import type { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = () => {
  const { setLastCompletedStep } = useContext(StepContext);

  return (
    <div className="w-full">
      <NextSeo
        title="Trait Upload • ZORA Generative"
        description="Add your traits"
      />
      <TraitsContextProvider>
        <TraitsBuilder />
      </TraitsContextProvider>
      <Link href="/create/generative/rules">
        <Button
          type="submit"
          onClick={() => {
            setLastCompletedStep(1);
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <GenerativeLayout title="Trait Upload">{page}</GenerativeLayout>;
};

export default Page;
