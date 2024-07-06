import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from "@nestjs/config";
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),JwtModule.register({}),MongooseModule.forRoot("mongodb+srv://geetha:geetha@cluster0.ddht7ed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"), AuthModule,TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
