import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getTasks(userId: string): Promise<Task[]> {
    const tasks=await this.taskModel.find({ user_id: userId }).exec();
    return tasks;
  }

  async addTask(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = new this.taskModel({
      user_id: userId,
      ...createTaskDto
    });
    return await newTask.save();
  }

  async toggleTask(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user_id: userId }).exec();
    if (!task) {
      throw new Error('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return task.save();
  }
}
