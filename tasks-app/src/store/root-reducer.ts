import { combineReducers } from "redux";
import taskSlice from "./task/taskSlice";

const appReducer = combineReducers({
  tasks: taskSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
