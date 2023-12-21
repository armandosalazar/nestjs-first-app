import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DbService) {}

  public getAllTasks(): Task[] {
    return this.dbService.getDatabase().get('tasks').value();
  }

  public getTaskById(id: string): Task {
    return this.dbService.getDatabase().get('tasks').find({ id }).value();
  }

  createTask(title: string, description: string): Task {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.TODO,
    };

    const result = this.dbService.getDatabase().get('tasks').push(task).write();

    console.log('createTask', result);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  updateTask(id: string, task: Task): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    return taskToUpdate;
  }

  deleteTask(id: string): void {
    console.log('deleteTask', id);
  }
}
