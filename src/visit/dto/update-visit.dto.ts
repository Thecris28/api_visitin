import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitDto } from './create-visit.dto';
import { UpdateVisitDetailsDto } from './update-visit-details.dto';
import { CreateVisitDetailsDto } from './create-visit-details.dto';
import { IsOptional } from 'class-validator';

export class UpdateVisitDto extends PartialType(CreateVisitDto) {

    @IsOptional()
    visitDetails: { visitor: { name: string, birthdate: string, phone: string, email: string }, visit_reason: string, observations: string };
    
}