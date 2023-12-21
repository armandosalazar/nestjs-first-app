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
import { TasksService, Response } from './tasks.service';
import { Task, TaskStatus } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  public getAllTasks(): Response {
    try {
      const tasks: Task[] = this.tasksServices.getAllTasks();

      return {
        success: true,
        message: 'Tasks retrieved successfully',
        data: tasks,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error retrieving tasks',
        error,
      };
    }
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Response {
    try {
      const task: Task = this.tasksServices.getTaskById(id);

      if (!task) {
        return {
          success: true,
          message: 'Task not found',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Task found successfully',
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error retrieving task',
        error,
      };
    }
  }

  @Post()
  public createTask(@Body() task: Task): Response {
    try {
      const _task: Task = this.tasksServices.createTask(
        task.title,
        task.description,
      );

      return {
        success: true,
        message: 'Task created successfully',
        data: _task,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating task',
        error,
      };
    }
  }

  @Patch('/:id')
  public updateTaskStatus(
    @Param('id') id: string,
    @Query() query: { status: TaskStatus },
  ): Response {
    try {
      const task: Task = this.tasksServices.updateTaskStatus(id, query.status);

      if (!task) {
        return {
          success: true,
          message: 'Task not found',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Task updated successfully',
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error updating task status',
        error,
      };
    }
  }

  @Put('/:id')
  public updateTask(@Param('id') id: string, @Body() task: Task): Response {
    try {
      const _task: Task = this.tasksServices.updateTask(id, task);

      return {
        success: true,
        message: 'Task updated successfully',
        data: _task,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error updating task',
        error,
      };
    }
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): Response {
    try {
      const task: Task = this.tasksServices.deleteTask(id);

      if (!task) {
        return {
          success: true,
          message: 'Task not found',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Task deleted successfully',
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting task',
        error,
      };
    }
  }
}
