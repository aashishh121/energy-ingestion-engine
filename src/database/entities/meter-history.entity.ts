import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('meter_telemetry_history')
@Index(['meterId', 'timestamp'])
export class MeterTelemetryHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    meterId: string;

    @Column('decimal', { precision: 10, scale: 3 })
    kwhConsumedAc: number;

    @Column('decimal', { precision: 6, scale: 2 })
    voltage: number;

    @Column({ type: 'timestamptz' })
    timestamp: Date;
}

