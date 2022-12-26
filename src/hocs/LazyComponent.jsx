import React, { Suspense } from "react";
import Loader from "../components/ui/Loader";

const LazyShortReviewCard = React.lazy(() =>
  import("../components/ShortReviewCard")
);

export default function LazyComponent(props) {
  return (
    <Suspense fallback={<Loader />}>
      <LazyShortReviewCard {...props} />
    </Suspense>
  );
}
