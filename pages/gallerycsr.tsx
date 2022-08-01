import type { ReactElement } from "react";
import { Alert } from "react-daisyui";
import { GenerativeLayout } from "../layouts/GenerativeLayout";
import { InfiniteGrid } from "../modules/gallery/components/InfiniteGrid";
import { useInfiniteGallery } from "../modules/gallery/hooks/useInfiniteGallery";

const Page = () => {
  const { pictures, hasNextPage, fetchNextPage } = useInfiniteGallery();

  return (
    <div className="w-full text-left">
      <Alert status="warning" className="mb-4">
        This is a client-side rendered gallery with infinite scroll and stagger
        animations with Framer Motion. Click into a photo to see an example of a
        modal.
      </Alert>
      <InfiniteGrid
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        pictures={pictures}
      />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <GenerativeLayout
      title="Gallery (Client Side Rendered)"
      description="A gallery of photos which are client side rendered. Used for comparison with the SSR gallery."
    >
      {page}
    </GenerativeLayout>
  );
};

export default Page;
