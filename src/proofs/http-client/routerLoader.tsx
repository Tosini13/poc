import React from "react";
import { useLoaderData } from "react-router-dom";
import { FetchReturnType } from "./httpClientTypes";
import { FetchApiResponseType } from "./types";

export const withRouterLoader =
  (Component: React.ComponentType<FetchApiResponseType>) => (props: any) => {
    const response = useLoaderData() as FetchReturnType<FetchApiResponseType>;
    return <Component {...props} {...response} />;
  };
