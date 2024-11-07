
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Visit } from './visit.entity';


export class Visitor {
    @Column()
    name: string;
  
    @Column('date')
    birthdate: string;
  }

@Entity('visit_details')
export class VisitDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(() => Visitor)
  visitor: Visitor;

  @Column()
  visit_reason: string;

  @Column({ nullable: true })
  observations: string;

  @OneToOne(() => Visit, (visit) => visit.visitDetails)
  @JoinColumn()  // Se usa JoinColumn solo en uno de los lados de la relación
  visit: Visit;
}
