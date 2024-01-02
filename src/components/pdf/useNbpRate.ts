import { useEffect, useMemo } from "react";
import { fetchApi } from "../../proofs/http-client/fetchAPI";
import { useFetch } from "../../proofs/http-client/httpClientUtils";
import { dateFormat, getDayBefore } from "./invoice";

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

/**
 * @todo handle when there's no data (i.e. for 30.12.2023 there was no data for EUR when fetched on 1.1.2024)
 * Requested URL: http://api.nbp.pl/api/exchangerates/rates/A/eur/2023-12-31/?format=json
 * Status Code: 404 Not Found - Brak danych
 */

export const useNbpRate = (code: CurrencyType, date: string) => {
  const dayBefore = getDayBefore(new Date(date)).toLocaleDateString('zh-Hans-CN',{
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, '-')
  
  const fetch = useMemo(() => fetchApi(`http://api.nbp.pl/api/exchangerates/rates/A/${code.toLowerCase()}/${dayBefore}/?format=json`), [code, dayBefore]);
  
  const { loading, data, error, refetch } = useFetch<NbpRateResponse>(
    fetch,
  );

  useEffect(() => {
    refetch();
  }, [dayBefore, code])

  return {
    loading,
    data,
    error,
  };
};
