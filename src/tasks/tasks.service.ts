import { Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel("Task") private readonly taskSchema: Model<any>) {}

  async createTask(body: any): Promise<string> {
    try {
      const task = new this.taskSchema(body);
      await task.save();
      return `Task created: ${task.title}`;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
    // Replace 'any' with CreateTaskDto when available
  }
  async updateTask(id: string, body: any): Promise<string> {
    try {
      const { ...updateData } = body;
      const updatedTask = await this.taskSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!updatedTask) {
        throw new Error(`Task with id ${id} not found`);
      } else {
        return `Task updated: ${updatedTask.title}`;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  async getAllTasks(): Promise<any> {
    return await this.taskSchema.find();
  }
  async getTaskById(id: string): Promise<any> {
    try {
      const task = await this.taskSchema.findById(id);
      console.log("🚀 ~ TasksService ~ getTaskById ~ task:", task);
      if (!task) {
        throw new Error(`Task with id ${id} not found`);
      }
      return task;
    } catch (error) {
      console.error("Error retrieving task:", error);
      throw error;
    }
  }
  async deleteTaskById(id: string): Promise<string> {
    try {
      const deletedTask = await this.taskSchema.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new Error(`Task with id ${id} not found`);
      }
      return `Task deleted: ${deletedTask.title}`;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
  async markTaskAsComplete(id: string): Promise<string> {
    try {
      const updatedTask = await this.taskSchema.findByIdAndUpdate(
        id,
        { completed: true },
        { new: true }
      );
      if (!updatedTask) {
        throw new Error(`Task with id ${id} not found`);
      }
      return `Task marked as complete: ${updatedTask.title}`;
    } catch (error) {
      console.error("Error marking task as complete:", error);
      throw error;
    }
  }

  async getTaskWithQuery(query: any): Promise<any> {
    try {
      const { page, limit } = query;
      const tasks = await this.taskSchema
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      return tasks;
    } catch (error) {
      console.error("Error retrieving tasks with query:", error);
      throw error;
    }
  }
}
