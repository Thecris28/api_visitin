import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateVisitDetailsDto } from "./create-visit-details.dto";

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    city: string;
  }

export class CreateVisitDto {
  
    @IsUUID()
    user_id: string;
  
    @IsString()
    visitor_rut: string;

    @IsString()
    @IsNotEmpty()
    status: string;
  
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
  
    @IsDateString()
    date: string;
  
    @IsString()
    time: string;
  
    @ValidateNested({ each: true })
    @Type(() => CreateVisitDetailsDto)
    visitDetails: CreateVisitDetailsDto;
  }

