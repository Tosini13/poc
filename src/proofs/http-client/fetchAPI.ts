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

export async function fetchApi(): Promise<FetchApiResponseType> {
  return await fetch("https://api.publicapis.org/entries")
    .then((data) => data.json())
    .then((data) => {
      return { data };
    })
    .catch((e) => {
      return {
        error: {
          message: e.message,
        },
      };
    })
    .finally(() => console.log("finally"));
}
