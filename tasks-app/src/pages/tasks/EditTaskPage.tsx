import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import { TitlesLabel } from "../../utils/componentsInfo";
import { getDefaultHeaders } from "../../services/utils.service";
import { canEditTaskAction } from "../../store/task/task.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const EditTaskPage: any = (props: any) => {
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

  const dispatch = useDispatch();
  const history = useHistory();

  const requestData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/task/` + props.match.params.id,
      {
        method: "GET",
        headers: getDefaultHeaders(),
      }
    );
    const getTaskCurrent = await response.json();
    setCurrentTask(getTaskCurrent);
  };

  useEffect(() => {
    requestData();
  }, []);

  const editTask = (e: any) => {
    e.preventDefault();
    dispatch(canEditTaskAction(currentTask, currentTask.id));
    history.push("/");
  };

  const onChangeForm = (e: any) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="to-do-list__container">
      <Form
        titleName={TitlesLabel.EDIT_TASK_PAGE_TITLE}
        submitForm={editTask}
        onChangeForm={onChangeForm}
        currentTask={currentTask}
        buttonName="EDIT TASK"
      />
    </div>
  );
};

export default EditTaskPage;
