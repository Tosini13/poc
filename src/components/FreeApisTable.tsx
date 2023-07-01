import { FetchApiResponseType } from "../proofs/http-client/types";

type FreeApisTablePropsType = FetchApiResponseType;

const FreeApisTable: React.FC<FreeApisTablePropsType> = ({ data, error }) => {
  if (error) {
    return (
      <>
        <p>There was an error: {error.message}</p>
      </>
    );
  }

  return (
    <div data-test-id="free_apis_table">
      <table data-test-id="http_client">
        <thead>
          <tr>
            <th>API</th>
            <th>Auth</th>
            <th>Category</th>
            <th>Cors</th>
            <th>Description</th>
            <th>HTTPS</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data?.entries.map((api) => (
            <tr key={`${api.API}${api.Link}`}>
              <td>{api.API}</td>
              <td>{api.Auth}</td>
              <td>{api.Category}</td>
              <td>{api.Cors}</td>
              <td>{api.Description}</td>
              <td>{api.HTTPS}</td>
              <td>{api.Link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreeApisTable;
