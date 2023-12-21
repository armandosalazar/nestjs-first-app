import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DbService],
})
export class TasksModule {}
