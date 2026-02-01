import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('vehicle_telemetry_history')
@Index(['vehicleId', 'timestamp'])
export class VehicleTelemetryHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vehicleId: string;

    @Column('decimal', { precision: 10, scale: 3 })
    kwhDeliveredDc: number;

    @Column('decimal', { precision: 5, scale: 2 })
    soc: number;

    @Column('decimal', { precision: 5, scale: 2 })
    batteryTemp: number;

    @Column({ type: 'timestamptz' })
    timestamp: Date;
}

