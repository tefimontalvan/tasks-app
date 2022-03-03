import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { Task } from "../../../store/task/task.type";
import "./styles.css";

interface ItemProps {
  task: Task;
  removeTask: (task: Task) => void;
  taskHasDone: (task: Task) => void;
  canEditTask: (task: Task) => void;
}

const Item: React.FC<ItemProps> = ({
  task,
  removeTask,
  taskHasDone,
  canEditTask,
}) => {
  return (
    <div className="container">
      <div className="content">
        <h3
          className={
            task.complete && task.complete
              ? "title__h3"
              : "title__h3_incomplete"
          }
        >
          {task.title}
        </h3>
        <div className="item--type">Type: {task.type}</div>
        <p className="item--description">Description: {task.description}</p>
        <CardActions className="itemComponent__buttons-group">
          <Button
            onClick={
              task.complete ? () => taskHasDone(task) : () => canEditTask(task)
            }
            variant="contained"
          >
            <EditIcon className="itemColor" />
          </Button>

          <Button
            onClick={() => taskHasDone(task)}
            variant="contained"
            color={task.complete ? "secondary" : "primary"}
          >
            <CheckIcon style={{ color: "white" }} />
          </Button>

          <Button
            onClick={() => removeTask(task)}
            variant="contained"
            color="secondary"
          >
            <CloseIcon className="itemColor" />
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Item;
