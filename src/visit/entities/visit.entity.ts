import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VisitDetails } from "./visit-details.entity";


export class Location {
    @Column()
    address: string;
  
    @Column()
    city: string;
  }

@Entity('visit')
export class Visit {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    user_id: string;

    @Column()
    visitor_rut: string;

    @Column()
    status: string;

    @Column(() => Location)
    location: Location;

    @Column('date')
    date: string;

    @Column('time')
    time: string;

    @OneToOne(() => VisitDetails, (visitDetails) => visitDetails.visit, { cascade: true })
    visitDetails: VisitDetails;
}

