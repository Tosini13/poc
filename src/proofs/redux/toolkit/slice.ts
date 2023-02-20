import { createSlice } from "@reduxjs/toolkit";
import { initialState, StateType } from "../reducers/rootReducer";
import { createStore } from "redux";

const like = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
    like(state) {
      state.like = state.like === "LIKED" ? "NOT_LIKED" : "LIKED";
    },
    dislike: {
      reducer: (state, action) => {
        state.dislike = action.payload;
      },
      prepare: (value: StateType["dislike"]) => ({
        payload: value,
        meta: null,
        error: null,
      }),
    },
  },
});

export const actions = like.actions;

export const store = createStore(like.reducer);
