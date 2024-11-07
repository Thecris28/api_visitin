import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';
import { VisitDetails } from './entities/visit-details.entity';

@Module({
  controllers: [VisitController],
  providers: [VisitService],
  imports: [
    TypeOrmModule.forFeature([
      Visit,
      VisitDetails
    ]),
  ],
})
export class VisitModule {}
