import { Type } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class VisitorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  birthdate: string;
}

export class CreateVisitDetailsDto {
  @ValidateNested({ each: true })
  @Type(() => VisitorDto)
  visitor: VisitorDto;

  @IsString()
  visit_reason: string;

  @IsString()
  observations: string;
}
