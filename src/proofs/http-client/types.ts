import { CustomResponseType } from "./httpClientTypes";

export type PublicApiType = {
  API: string;
  Auth: string;
  Category: string;
  Cors: string;
  Description: string;
  HTTPS: boolean;
  Link: string;
};
type PublicApisResponseType = {
  count: number;
  entries: Array<PublicApiType>;
};

export type FetchApiResponseType = CustomResponseType<PublicApisResponseType>;
