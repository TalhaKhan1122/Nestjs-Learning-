import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: any): Promise<any> {
    console.log("🚀 ~ TasksController ~ createTask ~ body:", body);

    // Replace 'any' with CreateTaskDto when available
    return await this.tasksService.createTask(body);
  }
  @Patch("/:id")
  async updateTask(@Param("id") id: string, @Body() body: any): Promise<any> {
    return await this.tasksService.updateTask(id, body);
  }

  @Get()
  async getAllTasks(): Promise<any> {
    return await this.tasksService.getAllTasks();
  }

  @Get("/:id")
  async getTaskById(@Param("id") id: string): Promise<any> {
    return await this.tasksService.getTaskById(id);
  }

  @Delete("/:id")
  async deleteTaskById(@Param("id") id: string): Promise<any> {
    return await this.tasksService.deleteTaskById(id);
  }

  @Patch("/:id/complete")
  async markTaskAsComplete(@Param("id") id: string): Promise<any> {
    return await this.tasksService.markTaskAsComplete(id);
  }

  @Get()
  async getTaskWithQuery(@Query() query: any): Promise<any> {
    console.log("🚀 ~ TasksController ~ getTaskWithQuery ~ query:", query)
    return await this.tasksService.getTaskWithQuery(query);
  
  }
}
