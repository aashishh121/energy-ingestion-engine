import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('vehicle_live_state')
export class VehicleLiveState {
    @PrimaryColumn()
    vehicleId: string;

    @Column('decimal', { precision: 5, scale: 2 })
    soc: number;

    @Column('decimal', { precision: 5, scale: 2 })
    batteryTemp: number;

    @Column('decimal', { precision: 10, scale: 3 })
    lastKwhDeliveredDc: number;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}

