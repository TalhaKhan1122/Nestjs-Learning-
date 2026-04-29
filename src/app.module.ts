import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskSchema } from "./schemas/task.schema";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/nest";

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
