import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

export type SuccessResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  error?: any;
};

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DbService) {}

  public getAllTasks(): Task[] {
    return this.dbService.getDatabase().get('tasks').value();
  }

  public getTaskById(id: string): Task {
    return this.dbService.getDatabase().get('tasks').find({ id }).value();
  }

  public createTask(
    title: string,
    description: string,
  ): SuccessResponse | ErrorResponse {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.TODO,
    };

    try {
      this.dbService.getDatabase().get('tasks').push(task).write();
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error creating task', error };
    }

    return { success: true, message: 'Task created successfully', data: task };
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskToUpdate = this.dbService
      .getDatabase()
      .get('tasks')
      .find({ id })
      .value();

    taskToUpdate.status = status;

    this.dbService.getDatabase().write();

    return taskToUpdate;
  }

  public updateTask(id: string, task: Task): Task {
    const taskToUpdate = this.dbService
      .getDatabase()
      .get('tasks')
      .find({ id })
      .value();

    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    taskToUpdate.status = task.status;

    this.dbService.getDatabase().write();

    return taskToUpdate;
  }

  public deleteTask(id: string): Task | ErrorResponse {
    const taskToDelete = this.dbService
      .getDatabase()
      .get('tasks')
      .find({ id })
      .value();

    if (!taskToDelete) {
      return {
        success: false,
        message: 'Task not found',
      };
    }

    this.dbService.getDatabase().get('tasks').remove({ id }).write();

    return taskToDelete;
  }
}
