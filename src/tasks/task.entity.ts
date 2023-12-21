export enum TaskStatus {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
