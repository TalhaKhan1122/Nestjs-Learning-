import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

const mongoUri = process.env.MONGO_URI;
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>("MONGO_URI");

        if (!uri) {
          throw new Error("MONGO_URI is not defined in .env");
        }

        return { uri };
      },
    }),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
