import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import FreeApisTable from "../components/FreeApisTable";
import HttpClient from "../modules/HttpClient";
import { fetchApi } from "../proofs/http-client/fetchAPI";
import { useFetch } from "../proofs/http-client/httpClientUtils";
import { withRouterLoader } from "../proofs/http-client/routerLoader";
import GlobalLoading from "./GlobalLoading";
import MainLayout from "./MainLayout";

const FetchByRouter = withRouterLoader(FreeApisTable);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <GlobalLoading />
            <MainLayout />
          </>
        }
      >
        <Route path="http-client">
          <Route
            path="fetch-by-router"
            loader={async () => fetchApi()}
            errorElement={<p>There was an error</p>}
            element={<FetchByRouter />}
          />
          <Route path="fetch-api" element={<HttpClient />} />
          <Route path="axios" element={<p>Axios</p>} />
        </Route>
        <Route path="contact" element={<p>Contact</p>} />
      </Route>
    </>
  )
);

type RoutesPropsType = {};

const Routes: React.FC<RoutesPropsType> = ({}) => {
  return <RouterProvider router={router} />;
};

export default Routes;
