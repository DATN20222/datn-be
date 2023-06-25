import { Information } from '../entities/information.entity';

export class InformationDto {
  timeStamp!: Date;
  vector: string;
  image: string;
  ppm: number;
  temperature: number;
  humidity: number;
  type: number;
  code: number;
  userId: number;
  position: string;
}
