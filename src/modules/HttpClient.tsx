import React from "react";
import { fetchApi } from "../proofs/http-client/fetchAPI";
import { useFetch } from "../proofs/http-client/httpClientUtils";

type HttpClientPropsType = {};

const HttpClient: React.FC<HttpClientPropsType> = () => {
  const { loading, data, error, refetch } = useFetch(fetchApi);

  if (loading) {
    return <p>...Loading</p>;
  }

  if (error) {
    return (
      <>
        <p>There was an error: {error.message}</p>
        <button onClick={refetch}>REFETCH</button>
      </>
    );
  }

  return (
    <>
      <button onClick={refetch}>REFETCH</button>
      <table data-test-id="http_client">
        <tr>
          <th>API</th>
          <th>Auth</th>
          <th>Category</th>
          <th>Cors</th>
          <th>Description</th>
          <th>HTTPS</th>
          <th>Link</th>
        </tr>
        {data?.entries.map((api) => (
          <tr>
            <td>{api.API}</td>
            <td>{api.Auth}</td>
            <td>{api.Category}</td>
            <td>{api.Cors}</td>
            <td>{api.Description}</td>
            <td>{api.HTTPS}</td>
            <td>{api.Link}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default HttpClient;
