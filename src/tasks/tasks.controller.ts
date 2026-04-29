import { Controller, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";


@Controller("tasks")
export class TasksController {
    
  constructor(private readonly tasksService: TasksService
) {}

  @Post()
  async createTask(@Body() body: any): Promise<any> {
    console.log("🚀 ~ TasksController ~ createTask ~ body:", body);

    // Replace 'any' with CreateTaskDto when available
    return await this.tasksService.createTask(body);
  }
}
