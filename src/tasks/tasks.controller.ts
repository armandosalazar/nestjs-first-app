import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks(): any {
    return this.tasksServices.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  createTask(@Body() task): Task {
    return this.tasksServices.createTask(task.title, task.description);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() status): Task {
    return this.tasksServices.updateTaskStatus(id, status.status);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task): Task {
    return this.tasksServices.updateTask(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksServices.deleteTask(id);
  }
}
