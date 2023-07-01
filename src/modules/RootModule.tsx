import { Link, Outlet } from "react-router-dom";
/**
 * Real compontn is in MainLayout
 */
type RootModulePropsType = {};

const RootModule: React.FC<RootModulePropsType> = () => {
  return (
    <>
      <header style={{ display: "flex" }}>
        <h1>This is my React app! Root</h1>
        <nav>
          <Link to={"/http-client/fetch-api"}>Fetch API</Link>
          {/* <a href="/http-client/fetch-api">Axios</a> */}
          <Link to="/http-client/axios">Axios</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/pdf"}>PDF</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootModule;
