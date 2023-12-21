import { Injectable, OnModuleInit } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { Task } from 'src/tasks/task.entity';

class Schema {
  tasks: Task[];
}

@Injectable()
export class DbService implements OnModuleInit {
  private db: lowdb.LowdbAsync<any>;

  onModuleInit() {
    this.initDatabase();
  }

  private async initDatabase(): Promise<void> {
    const adapter = new FileAsync<Schema>('db.json');
    this.db = await lowdb(adapter);
    if (!(await this.db.get('tasks').value())) {
      this.db.set('tasks', []).write();
    }
  }

  public getDatabase(): lowdb.LowdbAsync<any> {
    return this.db;
  }
}
