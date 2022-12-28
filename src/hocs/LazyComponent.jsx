import React, { Suspense } from "react";
import Loader from "../components/ui/Loader";

const LazyShortReviewCard = React.lazy(() =>
  import("../components/ShortReviewCard")
);
export const LasyCommentSection = React.lazy(() =>
  import("../components/CommentsSection")
);

export function LasyCommentSectionComponent(props) {
  return (
    <Suspense fallback={<Loader />}>
      <LasyCommentSection {...props} />
    </Suspense>
  );
}
export default function LazyShortReviewCardComponent(props) {
  return (
    <Suspense fallback={<Loader />}>
      <LazyShortReviewCard {...props} />
    </Suspense>
  );
}
