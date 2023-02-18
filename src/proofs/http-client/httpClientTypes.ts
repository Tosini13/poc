export type ErrorResponseType = {
  message: string;
};

export type CustomResponseType<DataType> = {
  data?: DataType;
  error?: ErrorResponseType;
};

export type FetchReturnType<GenericDataType> =
  CustomResponseType<GenericDataType> & {
    loading: boolean;
    refetch: () => Promise<void>;
  };
