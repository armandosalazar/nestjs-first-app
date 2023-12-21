import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

class Schema {
  tasks: Task[];
}

@Injectable()
export class TasksService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase(): Promise<void> {
    const adapter = new FileAsync<Schema>('db.json');
    this.db = await lowdb(adapter);
    if (!(await this.db.get('tasks').value())) {
      this.db.set('tasks', []).write();
    }
  }

  getAllTasks(): any {
    const tasks: Task[] = this.db.get('tasks').value();
    return tasks;
  }

  getTaskById(id: string): Task {
    return null;
  }

  createTask(title: string, description: string): Task {
    const task = {
      id: '1',
      title,
      description,
      status: TaskStatus.TODO,
    };

    const tasks = this.db.get('tasks');

    tasks.push(task).write();

    return null;
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
