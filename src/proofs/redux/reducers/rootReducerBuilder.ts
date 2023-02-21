import { createAction, createReducer } from "@reduxjs/toolkit";
import { dislikeThunk, likeThunk } from "../thunks/likeThunks";
import { DISLIKE_VALUES, LIKE_VALUES, StateType } from "./rootReducer";

export const likeAction = createAction<StateType["like"]>("feedback/like");
export const dislikeAction = createAction("feedback/dislike");

/**
 * @todo
 * read initial state from localStorage
 */

//Guards:
const isLike = (s: string): s is StateType["like"] => {
  return LIKE_VALUES.includes(s as StateType["like"]);
};

const isDisLike = (s: string): s is StateType["dislike"] => {
  return DISLIKE_VALUES.includes(s as StateType["dislike"]);
};

const initialState = (): StateType => {
  const like = localStorage.getItem("like");
  const dislike = localStorage.getItem("dislike");
  return {
    like: isLike(like) ? like : "NOT_LIKED",
    dislike: isDisLike(dislike) ? dislike : "NOT_DISLIKED",
  };
};

export const rootReducer = createReducer<StateType>(initialState, (builder) => {
  builder
    .addCase(likeAction, (state, action) => {
      state.like = action.payload;
    })
    .addCase(dislikeAction, (state, action) => {
      state.dislike = action.payload;
    })
    .addCase(likeThunk.fulfilled, (state, action) => {
      state.like = action.payload;
    })
    .addCase(dislikeThunk.fulfilled, (state, action) => {
      state.dislike = action.payload;
    });
});
