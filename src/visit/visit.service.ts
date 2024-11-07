import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';
import { Repository } from 'typeorm';
import { VisitDetails } from './entities/visit-details.entity';

@Injectable()
export class VisitService {

  private readonly logger = new Logger('VisitService');

  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,

    @InjectRepository(VisitDetails)
    private readonly visitDetailsRepository: Repository<VisitDetails>,
  ) {}

  async create(createVisitDto: CreateVisitDto) {
    try {

      const { user_id, visitor_rut, status, location, date, time, visitDetails} = createVisitDto;
      console.log(location);
      console.log(visitDetails);
      console.log(createVisitDto);
      const { visitor, visit_reason, observations } = visitDetails;

      const visitEntity = this.visitDetailsRepository.create({
        visitor: { name: visitor.name, birthdate: visitor.birthdate},
        visit_reason: visit_reason,
        observations: observations
      });

      const visit = this.visitRepository.create({
        user_id: user_id,
        visitor_rut: visitor_rut,
        status: status,
        location: location,
        date: date,
        time: time,
        visitDetails: visitEntity
      });
      await this.visitRepository.save(visit);

      return visit;
      

      
    } catch (error) {
      this.handleErros(error);
    }
  }

  findAll() {
    return `This action returns all visit`;
  }

  async findByUserId(user_id: string): Promise<Visit[]> {
    return this.visitRepository.find({
      where: { user_id },
      relations: ['visitDetails'],  
    });
  }

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return `This action updates a #${id} visit`;
  }

  remove(id: number) {
    return `This action removes a #${id} visit`;
  }

  private handleErros(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error)
    throw new BadRequestException('An unexpected error occurred');

    // this.logger.error(error);
  }
}
