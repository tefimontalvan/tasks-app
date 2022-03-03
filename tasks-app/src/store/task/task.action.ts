import { Task } from "./task.type";
import taskSlice from "./taskSlice";
import { Dispatch } from "redux";
import { RootState } from "../root-reducer";
import taskService from "../../services/task.service";

enum Action {
  LIST = 1,
  CREATE,
  DELETE,
  COMPLETE,
  EDIT,
}

function handleServerResponse(
  action: Action,
  response: any,
  dispatch: (TasksActions: { payload: any; type: string }) => void
): boolean {
  if (response.error || ("" + response.statusCode)[0] === "5") {
    dispatch(
      taskSlice.actions.stageError({
        error: response.message || response.error,
      })
    );
    return false;
  }
  switch (action) {
    case Action.CREATE:
      dispatch(taskSlice.actions.createTask(response));
      break;
    case Action.LIST:
      dispatch(taskSlice.actions.getTasks(response));
      break;
    case Action.DELETE:
      dispatch(taskSlice.actions.deleteTask(response));
      break;
    case Action.EDIT:
      dispatch(taskSlice.actions.updateTask(response));
      break;
    case Action.COMPLETE:
      dispatch(taskSlice.actions.completeTask(response));
      break;
    default:
      console.error("action not handled??", action);
  }
  return true;
}

function handleRejected(
  e: string,
  dispatch: (StageActions: { payload: any; type: string }) => void
) {
  // e.g. server is down
  dispatch(
    taskSlice.actions.stageError({ error: "Error al conectar con servidor" })
  );
}

export const createTask = (task: Task) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(taskSlice.actions.alltasksRequest());
    if (getState().tasks.tasks.find((t) => t.title === task.title)) {
      dispatch(
        taskSlice.actions.setMessage({
          header: "Error al crear la tarea",
          text: "Nombre de tarea existente. Ingrese otro.",
          type: "error",
        })
      );
    } else {
      const response = await taskService.createTask(task).catch((e) => {
        handleRejected(e, dispatch);
      });
      if (!response) return;
      handleServerResponse(Action.CREATE, response, dispatch);
      dispatch(
        taskSlice.actions.setMessage({
          header: "Tarea creada con éxito",
          text: "Se ha creado la tarea correctamente",
          type: "success",
        })
      );
    }
  };
};

export const getTasks = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(taskSlice.actions.alltasksRequest());
    const response = await taskService.getTasks().catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.LIST, response, dispatch);
  };
};

export const removeTaskAction = (task: Task) => {
  return async (dispatch: Dispatch) => {
    dispatch(taskSlice.actions.alltasksRequest());
    const response = await taskService.deleteTask(task).catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.DELETE, response, dispatch);
    dispatch(
      taskSlice.actions.setMessage({
        header: "Tarea eliminada exitosamente",
        text: "Se ha eliminado la tarea correctamente",
        type: "success",
      })
    );
  };
};

export const taskHasDoneAction = (task: Task) => {
  return async (dispatch: Dispatch) => {
    dispatch(taskSlice.actions.alltasksRequest());
    const response = await taskService.completeTask(task).catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.COMPLETE, response, dispatch);
  };
};

export const canEditTaskAction = (task: Task, id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(taskSlice.actions.alltasksRequest());
    const response = await taskService.updateTask(task, id).catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.EDIT, response, dispatch);
    dispatch(
      taskSlice.actions.setMessage({
        header: "Tarea editada exitosamente",
        text: "Se ha editado la tarea correctamente",
        type: "success",
      })
    );
  };
};
