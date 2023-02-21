import { Reducer } from "react";

export const LIKE_VALUES = ["LIKED", "NOT_LIKED"] as const;
export const DISLIKE_VALUES = ["DISLIKED", "NOT_DISLIKED"] as const;

export type StateType = {
  like: typeof LIKE_VALUES[number];
  dislike: typeof DISLIKE_VALUES[number];
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
