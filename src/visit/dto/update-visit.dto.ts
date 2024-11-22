import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitDto } from './create-visit.dto';
import { IsOptional } from 'class-validator';

export class UpdateVisitDto extends PartialType(CreateVisitDto) {

    @IsOptional()
    visitDetails: { visitor: { name: string, birthdate: string, phone: string, email: string }, visit_reason: string, observations: string };
    
}