import { NavLink, Outlet } from "react-router-dom";
import Like from "../components/Like";
// import {
//   dislikeAction,
//   likeAction,
// } from "../proofs/redux/reducers/RootReducerBuilder";
import { useAppDispatch, useAppSelector } from "../proofs/redux/toolkit/store";

type MainLayoutPropsType = {};

const MainLayout: React.FC<MainLayoutPropsType> = ({}) => {
  const selector = useAppSelector((state) => ({
    like: state.like,
    dislike: state.dislike,
  }));

  const dispatch = useAppDispatch();

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
          <NavLink to={"/pdf"}>PDF</NavLink>
        </nav>
        {/* <Like
          liked={selector.like === "LIKED"}
          disliked={selector.dislike === "DISLIKED"}
          handleLike={() =>
            dispatch(
              likeAction(selector.like === "LIKED" ? "NOT_LIKED" : "LIKED")
            )
          }
          handleDislike={() =>
            dispatch({
              type: dislikeAction.toString(),
              payload:
                selector.dislike === "DISLIKED" ? "NOT_DISLIKED" : "DISLIKED",
            })
          }
        /> */}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
