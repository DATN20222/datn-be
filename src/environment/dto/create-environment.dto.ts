export class CreateEnvironmentDto {

  timeStamp!: Date;

  temperature!: number;

  humidity!: number;

  ppm!: number;

  count: number;

  cameraId: string;
}
