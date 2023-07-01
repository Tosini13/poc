import { fetchApi } from "../../proofs/http-client/fetchAPI";
import { useFetch } from "../../proofs/http-client/httpClientUtils";

type CurrencyType = "PLN" | "USD" | "EUR";
type NbpTableType = "A" | "B" | "C";

type NbpRateResponse = {
  table: NbpTableType;
  currency: string;
  code: CurrencyType;
  rates: Array<{
    no: string;
    effectiveDate: string;
    mid: number;
  }>;
};

export const useNbpRate = (code: CurrencyType) => {
  const { loading, data, error } = useFetch<NbpRateResponse>(
    fetchApi(`http://api.nbp.pl/api/exchangerates/rates/A/${code}?format=json`)
  );

  return {
    loading,
    data,
    error,
  };
};
