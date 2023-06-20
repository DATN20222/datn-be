import { Environment } from 'src/environment/entities/environment.entity';

export class UpdateEventCameraDto {
  event!: Environment;
}

export class UpdateCountCameraDto {
  count: number;
}
