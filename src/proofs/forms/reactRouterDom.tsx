import React from "react";
import { useFetcher } from "react-router-dom";

export const withLikeFetcher =
  <ComponentPropsType extends {}>(
    Component: React.ComponentType<ComponentPropsType>
  ) =>
  (props: ComponentPropsType) => {
    const fetcher = useFetcher();
    const liked = fetcher.formData?.get("liked") === "liked";
    return <Component {...props} liked={liked} />;
  };
