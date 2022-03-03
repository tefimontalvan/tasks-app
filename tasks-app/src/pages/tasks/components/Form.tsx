import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React from "react";
import { TaskType } from "../../../store/task/task.type";
import "./styles.css";
import { Task } from "../../../store/task/task.type";

interface FormProps {
  titleName: string;
  submitForm: any;
  buttonName: string;
  onChangeForm: (e: any) => void;
  currentTask: Task;
}

const Form: React.FC<FormProps> = ({
  titleName,
  submitForm,
  onChangeForm,
  buttonName,
  currentTask,
}) => {
  return (
    <div className="customForm__form">
      <h1>{titleName}</h1>
      <form onSubmit={submitForm}>
        <TextField
          name="title"
          className="textField__input"
          value={currentTask.title}
          label="Task name"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="description"
          className="textField__input"
          value={currentTask.description}
          label="Task description"
          variant="outlined"
          onChange={onChangeForm}
        />
        <FormControl className="customForm__form-control" component="fieldset">
          <FormLabel className="customForm__form-label" component="legend">
            {" "}
            Task type{" "}
          </FormLabel>
          <RadioGroup
            name="type"
            aria-label="Task type"
            value={currentTask.type}
            onChange={onChangeForm}
            className="radioGroup"
          >
            <FormControlLabel
              value={TaskType.HOME}
              control={<Radio />}
              label="Home"
            />
            <FormControlLabel
              value={TaskType.WORK}
              control={<Radio />}
              label="Work"
            />
            <FormControlLabel
              value={TaskType.OTHER}
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <CardActions className="formComponent__buttons-group">
          <Button type="submit" variant="contained" size="large">
            {buttonName}
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default Form;
