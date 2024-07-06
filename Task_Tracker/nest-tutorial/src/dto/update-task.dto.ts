// src/tasks/dto/update-task.dto.ts

import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
