import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://tk42100678_db_user:FML3Y313Cez5HL8G@cluster0.4l0aakx.mongodb.net/";

@Module({
  imports: [MongooseModule.forRoot(mongoUri), TasksModule, UsersModule],
})
export class AppModule {}
