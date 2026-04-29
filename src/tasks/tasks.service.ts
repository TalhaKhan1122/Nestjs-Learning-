import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TaskSchema } from "src/schemas/task.schema";

@Injectable()
export class TasksService {
  constructor(@InjectModel("Task") private readonly taskSchema: Model<any>) {}

  async createTask(body: any): Promise<string> {
    const task = new this.taskSchema(body);
    await task.save();
    return `Task created: ${task.title}`;
    // Replace 'any' with CreateTaskDto when available
  }
}
