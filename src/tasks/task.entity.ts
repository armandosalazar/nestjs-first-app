export enum TaskStatus {
  TODO = 'To do',
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
