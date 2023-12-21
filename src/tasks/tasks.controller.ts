import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SuccessResponse, TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  public getAllTasks(): Task[] {
    return this.tasksServices.getAllTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  public createTask(@Body() task: Task): SuccessResponse {
    return this.tasksServices.createTask(task.title, task.description);
  }

  @Patch('/:id')
  public updateTaskStatus(
    @Param('id') id: string,
    @Query() query: { status: TaskStatus },
  ): Task {
    console.log(query.status, id);
    return this.tasksServices.updateTaskStatus(id, query.status);
  }

  @Put('/:id')
  public updateTask(@Param('id') id: string, @Body() task: Task): Task {
    return this.tasksServices.updateTask(id, task);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): Task | SuccessResponse {
    return this.tasksServices.deleteTask(id);
  }
}
