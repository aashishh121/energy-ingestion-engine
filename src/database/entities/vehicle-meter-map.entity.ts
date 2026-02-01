import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('vehicle_meter_map')
@Index(['vehicleId', 'meterId'], { unique: true })
export class VehicleMeterMap {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'vehicle_id' })
    vehicleId: string;

    @Column({ name: 'meter_id' })
    meterId: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'assigned_at' })
    assignedAt: Date;
}
