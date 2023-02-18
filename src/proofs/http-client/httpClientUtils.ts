import React from "react";
import type { CustomResponseType, FetchReturnType } from "./httpClientTypes";

export const useFetch = <GenericDataType>(
  clientFetch: () => Promise<CustomResponseType<GenericDataType>>
): FetchReturnType<GenericDataType> => {
  const [loading, setLoading] = React.useState<boolean>();
  const [data, setData] = React.useState<
    CustomResponseType<GenericDataType>["data"] | undefined
  >();
  const [error, setError] = React.useState<
    CustomResponseType<GenericDataType>["error"] | undefined
  >();

  const fetch = React.useCallback(async () => {
    setLoading(true);
    clientFetch().then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    loading,
    refetch: fetch,
  };
};
