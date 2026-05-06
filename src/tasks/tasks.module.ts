import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskSchema } from "./tasks.schema";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
  imports: [MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }])],
})
export class TasksModule {}
