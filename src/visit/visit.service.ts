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
        visitor: { name: visitor.name, birthdate: visitor.birthdate, phone: visitor.phone, email: visitor.email },
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

  async update(id: string, updateVisitDto: UpdateVisitDto) {

    const visitOld = await this.visitRepository.findOne({
      where: { id },
      relations: ['visitDetails'],
    });

    console.log(visitOld);

    const { visitDetails, ...rest } = updateVisitDto;

    const { visitor, visit_reason, observations } = visitDetails;

   
    const visit = await this.visitRepository.preload({
      id: id,
      ...rest,
      visitDetails:{ ...visitOld.visitDetails, visitor: { name: visitor.name, birthdate: visitor.birthdate, phone: visitor.phone, email: visitor.email }, visit_reason: visit_reason, observations: observations }
    });



    if (!visit) {
      throw new BadRequestException('Visit not found');
    }

    try {
      return await this.visitRepository.save(visit);
    } catch (error) {
      this.handleErros(error);
    }
    
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
