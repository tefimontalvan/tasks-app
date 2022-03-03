import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "./task.type";

const initialState: TaskState = {
  tasks: [],
  isFetching: false,
  showMessage: false,
  message: null,
};

export default createSlice({
  name: "task",
  initialState,
  reducers: {
    alltasksRequest: (state) => ({
      ...state,
      isFetching: true,
    }),
    createTask: (state, { payload }) => ({
      ...state,
      isFetching: false,
      tasks: [...state.tasks, payload],
    }),
    getTasks: (state, { payload }) => ({
      isFetching: false,
      tasks: payload,
      message: null,
    }),
    deleteTask: (state, { payload }) => ({
      ...state,
      isFetching: false,
      tasks: state.tasks.filter((task) => task.id !== payload.id),
    }),
    completeTask: (state, { payload }) => ({
      ...state,
      isFetching: false,
      tasks: state.tasks.map((task) =>
        task.id === payload.id
          ? (task = { ...task, complete: !task.complete })
          : task
      ),
    }),
    updateTask: (state, { payload }) => ({
      ...state,
      isFetching: false,
      tasks: state.tasks.map((task) =>
        task.id === payload.id ? (task = payload) : task
      ),
    }),
    stageError: (state, { payload }) => ({
      ...state,
      isFetching: false,
      error: payload,
    }),
    setMessage: (state, { payload }) => ({
      ...state,
      message: payload,
      isFetching: false,
    }),
  },
});
