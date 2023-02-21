import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateType } from "../reducers/rootReducer";

const saveToLocalStorage = async (name: string, data: string) => {
  return await new Promise((resolve) => {
    return setTimeout(() => {
      localStorage.setItem(name, data);
      return resolve(1);
    }, 500);
  });
};

export const likeThunk = createAsyncThunk(
  "like",
  async (value: StateType["like"]) => {
    try {
      await saveToLocalStorage("like", value);
      return value;
    } catch (e) {
      return value === "LIKED" ? "LIKED" : "NOT_LIKED";
    }
  }
);

export const dislikeThunk = createAsyncThunk(
  "dislike",
  async (value: StateType["dislike"]) => {
    try {
      await saveToLocalStorage("dislike", value);
      return value;
    } catch (e) {
      console.error("e !log!", e);
      return value === "DISLIKED" ? "DISLIKED" : "NOT_DISLIKED";
    }
  }
);
