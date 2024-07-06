import { Controller, Get, Post, Patch, Body, Param, Headers, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtGuard)
  @Get('getTasks')
  async getTasks(@Req() req: any) {
    const userId = req.user._id;
    if(!userId){
      return "UserId not found";
    }
    return this.tasksService.getTasks(userId); // Fetch tasks logic in service
  }

  @UseGuards(JwtGuard)
  @Post('addTask')
  async addTask(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user._id;
    return this.tasksService.addTask(createTaskDto, userId); // Add task logic in service
  }

  @UseGuards(JwtGuard)
  @Patch('tasks/:id')
  async toggleTask(@Req() req: any, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const userId = req.user._id;
    return this.tasksService.toggleTask(id, updateTaskDto, userId); // Toggle task logic in service
  }
}
