import React from "react";
import FreeApisTable from "../components/FreeApisTable";
import { fetchApi } from "../proofs/http-client/fetchAPI";
import { useFetch } from "../proofs/http-client/httpClientUtils";

type HttpClientPropsType = {};

const HttpClient: React.FC<HttpClientPropsType> = () => {
  const { loading, data, error, refetch } = useFetch(fetchApi);

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      <button onClick={refetch}>REFETCH</button>
      <FreeApisTable data={data} error={error} />
    </div>
  );
};

export default HttpClient;
