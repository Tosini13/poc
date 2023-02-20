import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middlewares/loggerAction";
import { initialState, rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = (initialState?: any) => {
  const middlewares = [thunkMiddleware, loggerMiddleware];
  const enhancerMiddleware = applyMiddleware<any>(...middlewares);
  const enhancers = [enhancerMiddleware, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...(enhancers as any[]));

  const store = createStore(rootReducer, initialState, composedEnhancers);

  // if (process.env.NODE_ENV !== "production" && module.hot) {
  //   module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  // }

  return store;
};

export const store = configureStore(initialState);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
