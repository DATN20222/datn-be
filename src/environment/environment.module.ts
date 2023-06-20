import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { Environment, EnvironmentSchema } from './entities/environment.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Environment.name,
        schema: EnvironmentSchema,
      },
    ]),
    
  ],
  controllers: [EnvironmentController],
  providers: [EnvironmentService]
})
export class EnvironmentModule {}
