export enum TaskType {
  WORK = "Work",
  HOME = "Home",
  OTHER = "Other",
}

export interface Task {
  id?: string;
  title: string;
  type: TaskType | string;
  description: string;
  complete: boolean | undefined;
  active?: boolean | undefined;
}

export interface TaskState {
  tasks: Task[];
  isFetching: boolean;
  message: Message | null;
  showMessage?: boolean;
  error?: string | null;
  taskEdit?: null;
  done?: boolean | undefined;
}

export interface Message {
  header: string;
  text?: string;
  type: "success" | "warning" | "error" | "info";
}
