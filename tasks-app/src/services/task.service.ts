import { Task } from "../store/task/task.type";
import { getDefaultHeaders } from "./utils.service";

class TaskService {
  async createTask(task: Task): Promise<any> {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/task`, {
      method: "POST",
      body: JSON.stringify({
        title: task.title,
        type: task.type,
        description: task.description,
        complete: task.complete,
      }),
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async deleteTask(task: Task): Promise<any> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/task/delete/${task.id}`,
      {
        method: "PUT",
        headers: getDefaultHeaders(),
      }
    );
    return await response.json();
  }

  async completeTask(task: Task): Promise<any> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/task/complete/${task.id}`,
      {
        method: "PUT",
        headers: getDefaultHeaders(),
      }
    );
    return await response.json();
  }

  async updateTask(task: Task, id: number): Promise<any> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/task/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: task.title,
          type: task.type,
          description: task.description,
          complete: task.complete,
        }),
        headers: getDefaultHeaders(),
      }
    );
    return await response.json();
  }

  async getTasks(): Promise<any> {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/task`, {
      method: "GET",
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }
}

const taskService = new TaskService();

export default taskService;
