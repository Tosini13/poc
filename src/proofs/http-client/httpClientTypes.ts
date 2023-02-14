export type ErrorResponseType = {
  message: string;
};

export type CustomResponseType<DataType> = {
  data?: DataType;
  error?: ErrorResponseType;
};
