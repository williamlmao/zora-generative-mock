import { NextSeo } from "next-seo";
import Link from "next/link";
import type { ReactElement } from "react";
import { Button } from "react-daisyui";
import { PrimaryLayout } from "../layouts/PrimaryLayout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <NextSeo title="ZORA Creator" description="Create on Zora" />
      <div className="text-center max-w-[740px]">
        <h1 className="text-4xl sm:text-[65px] text-black font-bold">
          Bring your imagination.
        </h1>
        <p className="my-4 sm:text-[65px] text-[#808080] font-bold">
          {`We'll cover the rest.`}
        </p>
        <p className="my-4 text-xl">
          Our creator toolkit makes it easy to create an NFT collection, with
          tooling that scales with your creative ambitions.
        </p>
      </div>
      <Link href="/create/generative/collectiondetails">
        <Button color="primary" className="rounded-md py-4 normal-case">
          Create a collection
        </Button>
      </Link>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Page;
