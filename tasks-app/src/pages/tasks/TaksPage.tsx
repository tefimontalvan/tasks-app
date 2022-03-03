import React, { useEffect, useState } from "react";
import { Message, Task } from "../../store/task/task.type";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import {
  createTask,
  getTasks,
  removeTaskAction,
  taskHasDoneAction,
} from "../../store/task/task.action";
import { RootState } from "../../store/root-reducer";
import { connect } from "react-redux";
import Form from "./components/Form";
import "./components/styles.css";
import Swal from "sweetalert2";
import CustomBackdrop from "./components/CustomBackdrop";
import Item from "./components/Item";
import { TitlesLabel } from "../../utils/componentsInfo";

type TaskProps = LinkDispatchProps & LinkStateProps;

const TaksPage: React.FC<TaskProps> = ({
  tasks,
  isFetching,
  error,
  message,
  createTask,
  getTasks,
  removeTaskAction,
  taskHasDoneAction,
}) => {
  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (message) {
      Swal.fire(message.header, message.text, message.type);
    }
  }, [message]);

  async function submitForm() {
    await createTask(currentTask);
    setCurrentTask({
      id: 0,
      title: "",
      description: "",
      type: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
      complete: false,
    });
  }

  const removeTask = (task: Task) => {
    //preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una carta que se elimina no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#48b29d",
      cancelButtonColor: "#ef6756",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        removeTaskAction(task);
      }
    });
  };

  const taskHasDone = (task: Task) => {
    taskHasDoneAction(task);
  };

  const history = useHistory();
  const canEditTask = (task: Task) => {
    history.push("/task/" + task.id);
  };

  const [currentTask, setCurrentTask] = useState<any>({
    id: 0,
    title: "",
    description: "",
    type: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
    complete: false,
  });

  const onChangeForm = (e: any) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="to-do-list__container">
      <Form
        titleName={TitlesLabel.TASK_PAGE_TITLE}
        submitForm={submitForm}
        onChangeForm={onChangeForm}
        currentTask={currentTask}
        buttonName="ADD TASK"
      />

      <div className="to-do-list__tasks-wrapper">
        {tasks &&
          tasks.map((t: Task) => (
            <Item
              key={t.id}
              task={t}
              removeTask={removeTask}
              taskHasDone={taskHasDone}
              canEditTask={canEditTask}
            />
          ))}
      </div>
      <CustomBackdrop isFetching={isFetching} />
    </div>
  );
};

interface LinkDispatchProps {
  createTask: (task: Task) => void;
  getTasks: () => void;
  removeTaskAction: (task: Task) => void;
  taskHasDoneAction: (task: Task) => void;
}

interface LinkStateProps {
  tasks: Task[];
  isFetching: boolean;
  error?: string | null;
  message: Message | null;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  const { tasks, isFetching, error, message } = state.tasks;

  return {
    tasks,
    isFetching,
    error,
    message,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, any>
): LinkDispatchProps => ({
  createTask: bindActionCreators(createTask, dispatch),
  getTasks: bindActionCreators(getTasks, dispatch),
  removeTaskAction: bindActionCreators(removeTaskAction, dispatch),
  taskHasDoneAction: bindActionCreators(taskHasDoneAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaksPage);
