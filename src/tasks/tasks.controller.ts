import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksServices.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  createTask(@Body() task) {
    console.log(task);
    return this.tasksServices.createTask(task.title, task.description);
  }
}
