import React from "react";
import { useLoaderData } from "react-router-dom";
import { FetchApiResponseType } from "./fetchAPI";
import { FetchReturnType } from "./httpClientTypes";

export const withRouterLoader =
  (Component: React.ComponentType<FetchApiResponseType>) => (props: any) => {
    const response = useLoaderData() as FetchReturnType<FetchApiResponseType>;
    return <Component {...props} {...response} />;
  };
