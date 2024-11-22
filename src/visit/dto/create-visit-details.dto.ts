import { Type } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class VisitorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}

export class CreateVisitDetailsDto {
  @ValidateNested({ each: true })
  @Type(() => VisitorDto)
  visitor: VisitorDto;

  @IsString()
  @IsOptional()
  visit_reason?: string;

  @IsString()
  observations: string;
}
