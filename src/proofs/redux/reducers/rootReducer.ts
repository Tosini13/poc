import { Reducer } from "react";

export type StateType = {
  like: "LIKED" | "NOT_LIKED";
  dislike: "DISLIKED" | "NOT_DISLIKED";
};

export type ActionsType =
  | {
      type: "LIKE_IT";
      payload: StateType["like"];
    }
  | {
      type: "DISLIKE_IT";
      payload: StateType["dislike"];
    };

export const initialState: StateType = {
  like: "NOT_LIKED",
  dislike: "NOT_DISLIKED",
};

export const rootReducer: Reducer<StateType, ActionsType> = (state, action) => {
  switch (action.type) {
    case "LIKE_IT": {
      return {
        ...state,
        like: action.payload,
      };
    }
    case "DISLIKE_IT": {
      return {
        ...state,
        dislike: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
