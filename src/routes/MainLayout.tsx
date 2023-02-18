import { NavLink, Outlet } from "react-router-dom";

type MainLayoutPropsType = {};

const MainLayout: React.FC<MainLayoutPropsType> = ({}) => {
  return (
    <>
      <header style={{ display: "flex" }}>
        <h1>This is my React app! Root</h1>
        <nav style={{ display: "flex", gap: "12px", height: "fit-content" }}>
          <NavLink to={"/"}>Back Home</NavLink>
          <NavLink to={"/http-client/fetch-by-router"}>Fetch By Router</NavLink>
          <NavLink to={"/http-client/fetch-api"}>Fetch API</NavLink>
          <NavLink to="/http-client/axios">Axios</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
