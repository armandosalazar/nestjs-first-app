import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

export type Response = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DbService) {}

  public getAllTasks(): Task[] {
    try {
      return this.dbService.getDatabase().get('tasks').value();
    } catch (error) {
      console.log(error);
      new Error('Error retrieving tasks');
    }
  }

  public getTaskById(id: string): Task {
    try {
      return this.dbService.getDatabase().get('tasks').find({ id }).value();
    } catch (error) {
      console.log(error);
      new Error('Error retrieving task');
    }
  }

  public createTask(title: string, description: string): Task {
    try {
      const task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.TODO,
      };

      this.dbService.getDatabase().get('tasks').push(task).write();

      return task;
    } catch (error) {
      console.log(error);
      new Error('Error creating task');
    }
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    try {
      const task: Task = this.dbService
        .getDatabase()
        .get('tasks')
        .find({ id })
        .value();

      task.status = status;

      this.dbService.getDatabase().write();

      return task;
    } catch (error) {
      console.log(error);
      new Error('Error updating task status');
    }
  }

  public updateTask(id: string, task: Task): Task {
    try {
      const _task = this.dbService
        .getDatabase()
        .get('tasks')
        .find({ id })
        .value();

      _task.title = task.title;
      _task.description = task.description;
      _task.status = task.status;

      this.dbService.getDatabase().write();

      return _task;
    } catch (error) {
      console.log(error);
      new Error('Error updating task');
    }
  }

  public deleteTask(id: string): Task {
    try {
      const task = this.dbService
        .getDatabase()
        .get('tasks')
        .find({ id })
        .value();

      this.dbService.getDatabase().get('tasks').remove({ id }).write();

      return task;
    } catch (error) {
      console.log(error);
      new Error('Error deleting task');
    }
  }
}
