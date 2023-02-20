import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialState, StateType } from "./rootReducer";

export const likeAction = createAction<StateType["like"]>("feedback/like");
export const dislikeAction = createAction("feedback/dislike");

/**
 * @todo
 * read initial state from localStorage
 */
export const rootReducer = createReducer<StateType>(initialState, (builder) => {
  builder
    .addCase(likeAction, (state, action) => {
      state.like = action.payload;
    })
    .addCase(dislikeAction, (state, action) => {
      state.dislike = action.payload;
    });
});
